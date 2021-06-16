<?php
namespace App;

/* This class is handling all the requests in the fornt end*/

class homeController{

    function __construct() {
        // Verify CSFR
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if(! app('csfr')->verifyToken(SECRET_KEY) ){
                header('HTTP/1.0 403 Forbidden');
                exit();
            }
        }

        if(isset($_GET['view-as'])){
            if($_SESSION['user']['user_type'] == 1){
                $_SESSION['view-as'] = app('auth')->get_user_by_id($_GET['view-as']);
            }else{
                $url =  "//".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
                header('Location: '.strtok($url, '?'));
            }
        }
    }

    // main index function to  load homepage
    public function index(){
        if (isset(SETTINGS['single_room_mode'])  && SETTINGS['single_room_mode'] == 1) {
            if (!isset(SETTINGS['default_room_slug'])) {
                app('db')->orderBy("id","Asc");
                $default_room = app('db')->getOne('chat_rooms');
                if ($default_room) {
                    $default_room = $default_room['slug'];
                    $this->chat_room($default_room);
                }else{
                    $data = index_helper();
                    echo app('twig')->render('index.html', $data);
                }
            }else{
                $default_room = SETTINGS['default_room_slug'];
                $this->chat_room($default_room);
            }
        }else{
            $data = index_helper();
            echo app('twig')->render('index.html', $data);
        }
    }

    // load chat room pages for a given slug
    public function chat_room($chatroomslug, $activechat=false){
        app('db')->where ('slug', $chatroomslug);
        if ($chat_room = app('db')->getOne('chat_rooms')) {

            if (app('auth')->isAuthenticated() == true) {
                // Get room's default group
                app('db')->where ('slug', 'general');
                app('db')->where ('chat_room', $chat_room['id']);
                $chat_group = app('db')->getOne('chat_groups');

                // Check if user already in this group else add
                app('db')->where ('user', app('auth')->user()['id']);
                app('db')->where ('chat_group', $chat_group['id']);
                $exist_user = app('db')->getOne('group_users');
                if ($chat_group) {
                    $data = array();
                    $join_chat = true;
                    if(!$exist_user){
                        if (app('request')->method=='POST') {
                            $post_data = app('request')->body;

                            if ($chat_room['is_protected']){
                                if (array_key_exists("pin", $post_data)){
                                    if ($chat_room['password'] != $post_data['pin']){
                                        app('msg')->error("Wrong PIN");
                                        $join_chat = false;
                                    }
                                }else{
                                    app('msg')->error("PIN missing");
                                    $join_chat = false;
                                }
                            }
                            if ($join_chat){
                                $insert_data = Array (
                                    "user" => app('auth')->user()['id'],
                                    "chat_group" => $chat_group['id'],
                                    "user_type" => 2,
                                    "status" => 1,
                                    "created_at" => app('db')->now(),
                                    "updated_at" => app('db')->now()
                                );
                                app('db')->insert ('group_users', $insert_data);
                            }

                        }
                    }

                    // get current room total user count
                    app('db')->join("chat_groups cg", "cg.id=gu.chat_group", "LEFT");
                    app('db')->where ('cg.chat_room', $chat_room['id']);
                    app('db')->where ('cg.slug', 'general');
                    app('db')->get('group_users gu', null, 'gu.*');
                    $chat_room['user_count'] = app('db')->count;

                    $data['chat_room'] = $chat_room;

                    $active_room = true;
                    if($chat_room['status'] == 2){
                        if(app('auth')->user()['user_type'] != 1){
                            $active_room = false;
                        }
                    }

                    $allowed_user = false;
                    if($chat_room['allowed_users'] && !empty($chat_room['allowed_users'])){
                        if(!in_array(app('auth')->user()['user_type'], json_decode($chat_room['allowed_users']))){
                            $allowed_user = false;
                        }else{
                            $allowed_user = true;
                        }
                    }elseif(app('auth')->user()['user_type'] == 1){
                        $allowed_user = true;
                    }else{
                        $allowed_user = false;
                    }

                    $data['active_room'] = $active_room;
                    if ($active_room){
                        if($allowed_user){
                            if ($join_chat) {
                                // get group user data
                                app('db')->where ('user', app('auth')->user()['id']);
                                app('db')->where ('chat_group', $chat_group['id']);
                                $group_user = app('db')->getOne('group_users');
                                if ($group_user) {
                                    if($group_user['status'] == 3){
                                        $data['kicked_user'] = true;
                                        echo app('twig')->render('join_chatroom.html', $data);
                                    }else{
                                        $data['chat_group'] = $chat_group;
                                        $data['timezone_list'] = $this->get_timezone_list();

                                        // Chat Room list
                                        $data['chat_rooms'] = app('chat')->getChatRooms();
                                        //Chat Room List End

                                        if (in_array(app('auth')->user()['user_type'], array(1,2,4))) {
                                            if (app('auth')->user()['user_type'] == 2) {
                                                app('db')->where ('created_by', app('auth')->user()['id']);
                                            }
                                            $my_rooms_list = app('db')->get('chat_rooms');
                                            $my_rooms = array();
                                            foreach ($my_rooms_list as $my_room) {
                                                if($my_room['allowed_users'] && !empty($my_room['allowed_users'])){
                                                    if(in_array(app('auth')->user()['user_type'], json_decode($my_room['allowed_users']))){
                                                        app('db')->join("chat_groups cg", "cg.id=gu.chat_group", "LEFT");
                                                        app('db')->where ('cg.chat_room', $my_room['id']);
                                                        app('db')->where ('cg.slug', 'general');
                                                        app('db')->get('group_users gu', null, 'gu.*');
                                                        $my_room['users_count'] = app('db')->count;
                                                    }
                                                }
                                                array_push($my_rooms, $my_room);
                                            }
                                            $data['my_rooms'] = $my_rooms;

                                        }

                                        if ($activechat) {
                                            app('db')->where ('user_name', $activechat);
                                            if ($activechat = app('db')->getOne('users')) {
                                                app('db')->where ('user', $activechat['id']);
                                                app('db')->where ('chat_group', $chat_group['id']);
                                                $active_group_user = app('db')->getOne('group_users');
                                                if ($active_group_user && $active_group_user['id'] != app('auth')->user()['id']) {
                                                    $data['activechat'] = $activechat['id'];
                                                }else{
                                                    header("HTTP/1.0 404 Not Found");
                                                    exit();
                                                }
                                            }else{
                                                header("HTTP/1.0 404 Not Found");
                                                exit();
                                            }
                                        }

                                        app('db')->where ('user_id', app('auth')->user()['id']);
                                        $data['user_push_devices'] = app('db')->get('push_devices');

                                        $data['chat_btn_count'] = app('chat')->getChatButtonCount();
                                        $data['lang_list'] = app('db')->get('languages');
                                        include(BASE_PATH.'utils'.DS.'countries.php');
                                        $data['country_list'] = $countries;
                                        $data['radios'] = app('db')->get('radio_stations');
                                        if(isset($_GET['view-as'])){
                                            $data['view_as_user'] = $_SESSION['view-as'];
                                        }
                                        echo app('twig')->render('chat_room.html', $data);
                                    }
                                }else{
                                    echo app('twig')->render('join_chatroom.html', $data);
                                }
                            }else{
                                echo app('twig')->render('join_chatroom.html', $data);
                            }
                        }else{
                            $data['access_denied'] = true;
                            echo app('twig')->render('join_chatroom.html', $data);
                        }
                    }else{
                        echo app('twig')->render('join_chatroom.html', $data);
                    }
                }else{
                    header("HTTP/1.0 404 Not Found");
                }
            }else {
                $data = array();
                $data['chat_room'] = $chat_room;
                $data['next_url'] = URL.$chatroomslug;

                if (isset(SETTINGS['guest_mode']) && SETTINGS['guest_mode'] == 1) {
                    $data['guest_data'] = app('auth')->nextGuestUser();
                    include(BASE_PATH.'utils'.DS.'countries.php');
                    $data['country_list'] = $countries;
                    $data['timezone_list'] = $this->get_timezone_list();
                }
                if (isset(SETTINGS['enable_social_login']) && SETTINGS['enable_social_login'] == 1) {
                    $data['hybridauth_providers'] = hybridauth(get_social_config())->getProviders();
                }
                echo app('twig')->render('login.html', $data);
            }
        }else{
            header("HTTP/1.0 404 Not Found");
        }


    }

    // load login page
    public function login(){



        if (app('request')->method=='POST') {
            $post_data = app('request')->body;
            if ($post_data && array_key_exists("email", $post_data) && array_key_exists("password", $post_data)) {
                $login = app('auth')->authenticate($post_data['email'], $post_data['password']);
                if($login){
                    if (isset($_GET['next'])) {
                        if (filter_var($_GET['next'], FILTER_VALIDATE_URL) != false) {
                            header("Location: " . $_GET['next']);
                        }else {
                            header("Location: " . route('index'));
                        }
                    }else{
                        header("Location: " . route('index'));
                    }
                }else{
                    $data = array();
                    $data['title'] = 'Sign In - ' . SETTINGS['site_name'];
                    if (isset(SETTINGS['guest_mode'])  && SETTINGS['guest_mode'] == 1) {
                        $data['guest_data'] = app('auth')->nextGuestUser();
                        include(BASE_PATH.'utils'.DS.'countries.php');
                        $data['country_list'] = $countries;
                        $data['timezone_list'] = $this->get_timezone_list();
                    }
                    if (isset(SETTINGS['enable_social_login']) && SETTINGS['enable_social_login'] == 1) {
                        $data['hybridauth_providers'] = hybridauth(get_social_config())->getProviders();
                    }
                    echo app('twig')->render('login.html', $data);
                }
            }
        }else{
            if (app('auth')->isAuthenticated()) {
                if (isset($_GET['next'])) {
                    header("Location: " . $_GET['next']);
                }else{
                    if (isset($_SERVER['HTTP_REFERER'])) {
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    }else{
                        header("Location: " . route('index'));
                    }
                }
            }else{
                $data = array();
                $data['title'] = 'Sign In - ' . SETTINGS['site_name'];
                if (isset($_GET['next']) && (filter_var($_GET['next'], FILTER_VALIDATE_URL) != false)) {
                    $data['next_url'] = $_GET['next'];
                }
                if (isset(SETTINGS['guest_mode'])  && SETTINGS['guest_mode'] == 1) {
                    $data['guest_data'] = app('auth')->nextGuestUser();
                    include(BASE_PATH.'utils'.DS.'countries.php');
                    $data['country_list'] = $countries;
                    $data['timezone_list'] = $this->get_timezone_list();
                }


                if (isset(SETTINGS['enable_social_login']) && SETTINGS['enable_social_login'] == 1) {
                    $data['hybridauth_providers'] = hybridauth(get_social_config())->getProviders();
                }

                echo app('twig')->render('login.html', $data);
            }

        }
    }


    // load login page
    public function guest_login(){
        if (app('request')->method=='POST') {
            $post_data = app('request')->body;
            if ($post_data && array_key_exists("guest_name", $post_data) && array_key_exists("guest_username", $post_data)) {

                if (isset(SETTINGS['guest_name_edit']) && SETTINGS['guest_name_edit'] == 1 && isset(SETTINGS['display_name_format']) && SETTINGS['display_name_format'] == 'username') {
                    $guest_username = str_replace(' ', '', $post_data['guest_name']);
                    $guest_username = __('Guest-').$guest_username;
                }else{
                    $guest_username = $post_data['guest_username'];
                }

                if (isset($post_data['sex'])) {
                    $sex=$post_data['sex'];
                }else{
                    $sex=NULL;
                }
                if (isset($post_data['dob'])) {
                    $dob=$post_data['dob'];
                }else{
                    $dob=NULL;
                }
                if (isset($post_data['country'])) {
                    $country=$post_data['country'];
                }else{
                    $country='';
                }
                if (isset($post_data['timezone'])) {
                    $timezone=$post_data['timezone'];
                }else{
                    $timezone='';
                }
                $login = app('auth')->guest_authenticate(
                    'Guest-'.$post_data['guest_name'],
                    $guest_username,
                    $sex,
                    $dob,
                    $country,
                    $timezone
                );
                if($login){
                    if (isset($_GET['next'])) {
                        if (filter_var($_GET['next'], FILTER_VALIDATE_URL) != false) {
                            header("Location: " . $_GET['next']);
                        }else {
                            header("Location: " . route('index'));
                        }
                    }else{
                        header("Location: " . route('index'));
                    }
                }else{
                    $data = array();
                    if (isset(SETTINGS['guest_mode'])  && SETTINGS['guest_mode'] == 1) {
                        $data['guest_data'] = app('auth')->nextGuestUser();
                    }
                    echo app('twig')->render('login.html', $data);
                }
            }
        }else{
            if (app('auth')->isAuthenticated()) {
                if (isset($_GET['next'])) {
                    header("Location: " . $_GET['next']);
                }else{
                    if (isset($_SERVER['HTTP_REFERER'])) {
                        header('Location: ' . $_SERVER['HTTP_REFERER']);
                    }else{
                        header("Location: " . route('index'));
                    }
                }
            }else{
                $data = array();
                $data['title'] = 'Sign In - ' . SETTINGS['site_name'];
                if (isset($_GET['next']) && (filter_var($_GET['next'], FILTER_VALIDATE_URL) != false)) {
                    $data['next_url'] = $_GET['next'];
                }
                if (isset(SETTINGS['guest_mode'])  && SETTINGS['guest_mode'] == 1) {
                    $data['guest_data'] = app('auth')->nextGuestUser();
                    include(BASE_PATH.'utils'.DS.'countries.php');
                    $data['country_list'] = $countries;
                    $data['timezone_list'] = $this->get_timezone_list();
                }
                echo app('twig')->render('login.html', $data);
            }

        }
    }


    // log out and destroy sessions
    public function logout(){
        session_destroy();
        if (isset($_SERVER['HTTP_REFERER'])) {
            header('Location: ' . $_SERVER['HTTP_REFERER']);
        }else{
            header("Location: " . route('index'));
        }

    }

    // load register page
    public function register(){
        $member_register = true;
        if(isset(SETTINGS['member_registration']) && SETTINGS['member_registration'] == 0){
            $member_register = false;
        }
        if($member_register){
            if (app('request')->method=='POST') {
                $data = array();
                $data['title'] = 'Sign Up - ' . SETTINGS['site_name'];
                $data = $post_data = app('request')->body;
                include(BASE_PATH.'utils'.DS.'countries.php');
                $data['country_list'] = $countries;
                $data['timezone_list'] = $this->get_timezone_list();
                if ($post_data && array_key_exists("email", $post_data) && array_key_exists("user_name", $post_data)
                    && array_key_exists("first_name", $post_data) && array_key_exists("last_name", $post_data)
                    && array_key_exists("password", $post_data)) {
                        if (isset($post_data['sex'])) {
                            $sex=$post_data['sex'];
                        }else{
                            $sex=NULL;
                        }
                        if (isset($post_data['dob'])) {
                            $dob=$post_data['dob'];
                        }else{
                            $dob=NULL;
                        }
                        if (isset($post_data['country'])) {
                            $country=$post_data['country'];
                        }else{
                            $country='';
                        }
                        if (isset($post_data['timezone'])) {
                            $timezone=$post_data['timezone'];
                        }else{
                            $timezone='';
                        }
                    $registration = app('auth')->registerNewUser(
                        $post_data['user_name'],
                        $post_data['first_name'],
                        $post_data['last_name'],
                        $post_data['email'],
                        $post_data['password'],
                        $post_data['password_repeat'],
                        $sex,
                        $dob,
                        $country,
                        $timezone
                    );
                    if($registration){
                        $login = app('auth')->authenticate($post_data['email'], $post_data['password']);
                        if($login){
                           header("Location: " . route('index'));
                        }
                    }else{
                        echo app('twig')->render('register.html', $data);
                    }
                }else{
                    echo app('twig')->render('register.html', $data);
                }
            }else{
                $data = array();
                $data['title'] = 'Sign Up - ' . SETTINGS['site_name'];
                include(BASE_PATH.'utils'.DS.'countries.php');
                $data['country_list'] = $countries;
                $data['timezone_list'] = $this->get_timezone_list();
                echo app('twig')->render('register.html', $data);
            }
        }else{
            $data = array();
            if (isset(SETTINGS['guest_mode']) && SETTINGS['guest_mode'] == 1) {
                $data['guest_data'] = app('auth')->nextGuestUser();
            }
            echo app('twig')->render('login.html', $data);
        }
    }

    // load forget password page
    public function forgot_password(){
        if (app('request')->method=='POST') {
            $data = array();
            $data['title'] = 'Forget Password - ' . SETTINGS['site_name'];
            $post_data = app('request')->body;
            if ($post_data && array_key_exists("email", $post_data)) {
                app('auth')->sendResetPasswordLink($post_data['email']);
            }
            echo app('twig')->render('forgot_password.html', $data);
        }else{
            $data = array();
            $data['title'] = 'Forget Password - ' . SETTINGS['site_name'];
            echo app('twig')->render('forgot_password.html', $data);
        }
    }

    // load reset password page
    public function reset_password(){
        if (app('request')->method=='POST') {
            $data = array();
            $data['title'] = 'Reset Password - ' . SETTINGS['site_name'];
            $post_data = app('request')->body;
            if ($post_data && array_key_exists("password", $post_data) && array_key_exists("reset_key", $post_data)){
                $reset_key = app('purify')->xss_clean($_GET['reset_key']);
                $validate_data = clean_and_validate("password", $post_data['password']);
                $password = $validate_data[0];
                $valid = true;
                $message = '<ul>';
                if(!$validate_data[1][0]){
                    $valid = false;
                    foreach ($validate_data[1][1]['password'] as $each_error) {
                        $message .= "<li>".$each_error."</li>";
                    }
                }
                $message .= "</ul>";

                if($valid){
                    $reset = app('auth')->resetPassword($reset_key,$password);
                    if ($reset[0]) {
                        app('msg')->success($reset[1]);
                        header("Location: " . route('login'));
                    }else{
                        app('msg')->error($reset[1]);
                        if (isset($_GET['reset_key'])) {
                            $value = app('purify')->xss_clean($_GET['reset_key']);
                            $data['reset_key'] = $value;
                        }
                        echo app('twig')->render('reset_password.html', $data);
                    }
                }else {
                    app('msg')->error($message);
                    echo app('twig')->render('reset_password.html', $data);
                }
            }
        }else{
            $data = array();
            $data['title'] = 'Reset Password - ' . SETTINGS['site_name'];
            if (isset($_GET['reset_key'])) {
                $value = app('purify')->xss_clean($_GET['reset_key']);
                $data['reset_key'] = $value;
            }
            echo app('twig')->render('reset_password.html', $data);
        }
    }

    public function get_timezone_list($selected_timezone=False){
        $opt = '';
        $regions = array('Africa', 'America', 'Antarctica', 'Arctic', 'Asia', 'Atlantic', 'Australia', 'Europe', 'Indian', 'Pacific');
        $tzs = timezone_identifiers_list();
        $optgroup = '';
        sort($tzs);
        $timestamp = time();
        if (!$selected_timezone) {
            $selected_timezone = SETTINGS['timezone'];
            if(app('auth')->user() && app('auth')->user()['timezone']){
                $selected_timezone = app('auth')->user()['timezone'];
            }
        }

        foreach ($tzs as $tz) {
            $z = explode('/', $tz, 2);
            date_default_timezone_set($tz); //for each timezone offset
            $diff_from_GMT = 'GMT ' . date('P', $timestamp);
            if (count($z) != 2 || !in_array($z[0], $regions)){
                continue;
            }
            if ($optgroup != $z[0]) {
                if ($optgroup !== ''){
                    $opt .= '</optgroup>';
                }
                $optgroup = $z[0];
                $opt .= '<optgroup label="' . htmlentities($z[0]) . '">';
            }

            $selected = "";
            if($selected_timezone == htmlentities($tz)){
                $selected = "selected";
            }
            $opt .= '<option value="' . htmlentities($tz) . '" '. $selected .' >'  . htmlentities(str_replace('_', ' ', $tz)). " - " .$diff_from_GMT . '</option>';
        }
        if ($optgroup !== ''){
            $opt .= '</optgroup>';
        }
        // change back system timezone
        date_default_timezone_set(SETTINGS['timezone']);
        return $opt;

    }

    // load customized color css file
    public function color_css(){
        header("Content-Type: text/css");
        if (isset(SETTINGS['theme'])) {
            echo app('twig')->render('css/theme-'.SETTINGS['theme'].'.css');
        }
    }

    // load chatnet js file
    public function chatnet_js(){
        $data = array();

        header("Content-Type: text/javascript");
        echo app('twig')->render('js/chatnet.js', $data);
    }

    // load index js file
    public function index_js(){
        header("Content-Type: text/javascript");
        echo app('twig')->render('js/index.js');
    }

    // load index js file
    public function scripts_js(){
        header("Content-Type: text/javascript");
        echo app('twig')->render('js/scripts.js');
    }

    // set language
    public function setlang($reqlang){
        app('db')->where('code',app('purify')->xss_clean($reqlang));
        $reqlang = app('db')->getOne('languages');
        $reqlang_json = json_encode($reqlang, true);
        if ($reqlang) {
            setcookie('lang', $reqlang_json, time() + (86400 * 100), "/");
        }
        if(isset($_SERVER['HTTP_REFERER'])){
            header('Location: ' .  $_SERVER['HTTP_REFERER']);
        }else{
            header('Location: ' .  route('index'));
        }

    }

    // terms and conditions page
    public function terms(){
        if (SETTINGS['enable_terms']) {
            $data = array();
            $data['title'] = 'Terms & Conditions - ' . SETTINGS['site_name'];
            $data['lang_list'] = app('db')->get('languages');
            echo app('twig')->render('terms.html', $data);
        }else{
            header("HTTP/1.0 404 Not Found");
        }
    }

    // privacy policy page
    public function privacy(){
        if (SETTINGS['enable_privacy']) {
            $data = array();
            $data['title'] = 'Privacy Policy - ' . SETTINGS['site_name'];
            $data['lang_list'] = app('db')->get('languages');
            echo app('twig')->render('privacy.html', $data);
        }else{
            header("HTTP/1.0 404 Not Found");
        }
    }

    // privacy policy page
    public function about(){
        if (SETTINGS['enable_about']) {
            $data = array();
            $data['title'] = 'About Us - ' . SETTINGS['site_name'];
            $data['lang_list'] = app('db')->get('languages');
            echo app('twig')->render('about.html', $data);
        }else{
            header("HTTP/1.0 404 Not Found");
        }
    }

    // privacy policy page
    public function contact(){
        if (isset(SETTINGS['enable_contact']) && SETTINGS['enable_contact']) {
            $data = array();
            $data['title'] = 'Contact Us - ' . SETTINGS['site_name'];
            $data['lang_list'] = app('db')->get('languages');
            if (app('request')->method=='POST') {
                $post_data = app('request')->body;
                $contact_email = app('purify')->xss_clean($post_data['contact_email']);
                $contact_name = app('purify')->xss_clean($post_data['contact_name']);
                $contact_message = app('purify')->xss_clean($post_data['contact_message']);
                if (!empty($contact_email) && !empty($contact_name) && !empty($contact_message)) {

                    if (filter_var($contact_email, FILTER_VALIDATE_EMAIL)) {
                        $email_data['contact_email'] = $contact_email;
                        $email_data['contact_name'] = $contact_name;
                        $email_data['contact_message'] = $contact_message;
                        $body = app('twig')->render('emails/contact.html', $email_data);
                        if (isset(SETTINGS['contact_us_email'])) {
                            if (isset(SETTINGS['contact_us_email'])) {
                                $site_name = SETTINGS['site_name'];
                            }else{
                                $site_name = '';
                            }
                            send_mail(SETTINGS['contact_us_email'], $site_name.' - New Contact Message', $body);
                            app('msg')->success("Contact Message Has Been Sent");
                        }else{
                            app('msg')->error('Sorry, No way to contact.');
                        }

                    }else{
                        app('msg')->error('Email is invalid!');
                    }
                }else{
                    app('msg')->error(("All Feilds Are Required"));
                }
            }
            echo app('twig')->render('contact.html', $data);
        }else{
            header("HTTP/1.0 404 Not Found");
        }
    }


    // load index js file
    public function firebase_messaging_sw(){
        if (isset(SETTINGS['push_notifications']) && SETTINGS['push_notifications']==true) {
            header("Content-Type: text/javascript");
            echo app('twig')->render('js/firebase-messaging-sw.js');
        }
    }

    // PWA Manifest
    public function manifest(){
        $data = array();
        if (!empty(SETTINGS['pwa_default_room_slug'])) {
            $data['start_url'] = URL . SETTINGS['pwa_default_room_slug'];
        }else{
            $data['start_url'] = URL;
        }
        if (!empty(SETTINGS['pwa_background_color'])) {
            $data['pwa_background_color'] = SETTINGS['pwa_background_color'];
        }else{
            $data['pwa_background_color'] = "#ffffff";
        }
        if (!empty(SETTINGS['pwa_theme_color'])) {
            $data['pwa_theme_color'] = SETTINGS['pwa_theme_color'];
        }else{
            $data['pwa_theme_color'] = "transparent";;
        }
        if (!empty(SETTINGS['pwa_icon'])) {
            $data['pwa_icon'] = URL."media/settings/".SETTINGS['pwa_icon'];
        }else{
            $data['pwa_icon'] = URL."static/img/chatnet_app_192.png";
        }

        header("Content-Type: application/json");
        echo app('twig')->render('manifest.json',$data);
    }

    public function offline(){
        echo app('twig')->render('offline.html');
    }

    public function pwabuilder_sw(){
        header("Content-Type: text/JavaScript");
        echo app('twig')->render('js/pwabuilder-sw.js');
    }



    public function hybridauth_callback(){
        try {
            $storage = app('hybridauth_session');

            if (isset($_GET['provider'])) {
                $storage->set('provider', $_GET['provider']);
            }
            if ($provider = $storage->get('provider')) {

                $adapter = hybridauth(get_social_config())->authenticate($provider);

                try {
                    $user_profile = $adapter->getUserProfile();
                } catch (Exception $e) {
                    $user_profile = false;
                }

                $storage->set('provider', null);

                if ($user_profile && $user_profile->email) {

                    app('db')->where('email', $user_profile->email);
                    if ($user = app('db')->getOne('users')) {
                        $login = app('auth')->authenticate($user_profile->email, null, true);
                        if($login){
                            if (isset($_GET['next'])) {
                                if (filter_var($_GET['next'], FILTER_VALIDATE_URL) != false) {
                                    header("Location: " . $_GET['next']);
                                }else {
                                    header("Location: " . route('index'));
                                }
                            }else{
                                header("Location: " . route('index'));
                            }
                        }else{
                            app('msg')->error(__('Social Login Failed'));
                            header("Location: " . route('login'));
                        }
                    }else{
                        if ($user_profile->gender) {
                            if ($user_profile->gender == 'male') {
                                $sex = 1;
                            }else if ($user_profile->gender == 'female') {
                                $sex = 2;
                            }else{
                                $sex = null;
                            }
                        }else{
                            $sex = null;
                        }
                        $random_pw = randomPassword();
                        $registration = app('auth')->registerNewUser(
                            strstr($user_profile->email, '@', true) . '_' . rand(9,99),
                            $user_profile->firstName,
                            $user_profile->lastName,
                            $user_profile->email,
                            $random_pw,
                            $random_pw,
                            $sex,
                            null,
                            null,
                            null
                        );
                        $registration = true;
                        if($registration){
                            if ($user_profile->photoURL) {
                                $avatar_name = uniqid(rand(), true).'.jpg';
                                $image_file = download_image($user_profile->photoURL, 'media/avatars/'.$avatar_name);
                                if ($image_file) {
                                    $social_avatar = Array ( 'avatar' => $avatar_name);
                                    app('db')->where('email', $user_profile->email);
                                    app('db')->update ('users', $social_avatar);
                                }
                            }
                            $login = app('auth')->authenticate($user_profile->email, $random_pw);
                            if($login){
                               header("Location: " . route('index'));
                            }
                        }else{
                            app('msg')->error(__('Social Login Registration Failed'));
                            header("Location: " . route('login'));
                        }
                    }
                }else{
                    app('msg')->error(__('Required Details Not Provided by the Social Network'));
                    header("Location: " . route('login'));
                }
            }else{
                app('msg')->error(__('Unsupported Soical Network'));
                header("Location: " . route('login'));
            }
            if (isset($_GET['logout'])) {
                $adapter = hybridauth(get_social_config())->getAdapter($_GET['logout']);
                $adapter->disconnect();
            }

        } catch (Exception $e) {
            app('msg')->error(__('Social Login Failed'));
            header("Location: " . route('login'));
        }
    }

}
