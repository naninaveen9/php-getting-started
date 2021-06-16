<?php
/* This files includes all helper and utilities function used by various other major functions in the system */

// this function will be used to output jason responses with correct headers
function json_response($data=null, $status=200){
    header_remove();
    header("Content-Type: application/json");
    header('Status: ' . $status);
    $json = json_encode($data);
    if ($json === false) {
        $json = json_encode(["jsonError" => json_last_error_msg()]);
        if ($json === false) {
            $json = '{"jsonError":"unknown"}';
        }
        http_response_code(500);
    }
    echo $json;
}

// Image upload function used in profile and settings sections
function image($files, $name=false, $path="", $height=false, $width=false){
    $image = new Image($files);
    // Config
    if ($name) {
        $image->setName($name);
    }
    $image->setSize(0, SETTINGS['post_max_size']);
    $image->setDimension(10000,10000);
    $image->setMime(array('jpeg', 'gif', 'png', 'jpg'));
    $image->setLocation('media/' . $path);
    //Upload
    if($image){
      $upload = $image->upload();
      if($upload){
            // Crop
            if ($height || $width) {
                if ($height == false) {
                    $height = $image->getHeight();
                }
                if ($width == false) {
                    $width = $image->getWidth();
                }

                $image = new ImageResize($upload->getFullPath());
                $image->crop($width, $height);
                $image->save($upload->getFullPath());

            }
        return array(true,$upload->getName().'.'.$upload->getMime());
      }else{
          echo "string1";
        app('msg')->error($image->getError());
        return array(false, $image->getError());
      }
  }else{
       echo "string1";
      return array(false, "No Image Found!");
  }
}

// Image upload function used in chat dropzone
function chat_image_upload($file){
    $image = new Image($file);
    $image->setSize(0, SETTINGS['post_max_size']);
    $image->setDimension(10000,10000);
    $image->setMime(array('jpeg', 'gif', 'png', 'jpg'));
    $image->setLocation('media/chats/images/large');
    //Upload
    if($image){
        $upload = $image->upload();
        if($upload){
            // Crop
            $image = new ImageResize($upload->getFullPath());
            $image->resizeToWidth(600);
            $upload->setName(uniqid()."_".$image->getDestWidth()."x".$image->getDestHeight());
            $image->save($upload->getFullPath());

            // save medium image
            $medium_image = "media/chats/images/medium/".$upload->getName() .".". $upload->getMime();
            if(copy($upload->getFullPath(), $medium_image)){
                $medium_image_crop = new ImageResize($medium_image);
                $medium_image_crop->crop(300, 300);
                $medium_image_crop->save($medium_image);
            }

            // save thumb image
            $thumb_image = "media/chats/images/thumb/".$upload->getName() .".". $upload->getMime();
            if(copy($upload->getFullPath(), $thumb_image)){
                $thumb_image_crop = new ImageResize($thumb_image);
                $thumb_image_crop->crop(150, 150);
                $thumb_image_crop->save($thumb_image);
            }
            return $upload->getName().'.'.$upload->getMime();
        }else{
            //$image->getError()
            return false;
        }
    }
}

// Send mail function to send reset password links and other emails
function send_mail($to, $subject, $body){
    try {
        //Recipients
        app('mail')->addAddress($to);
        // Content
        app('mail')->isHTML(true);
        app('mail')->Subject = $subject;
        app('mail')->Body = $body;
        app('mail')->send();
        return true;
    } catch (Exception $e) {
        app('msg')->error(app('mail')->ErrorInfo);
    }
}


// Crean input $_POST data and validate according to given rules
function clean_and_validate($key, $value){
    $value_and_rules = clean_get_validation_rules($key, $value);
    $value = $value_and_rules[0];
    $rules = $value_and_rules[1];

    $validator = new Valitron\Validator([$key => $value]);
    if($rules){
        foreach ($rules as $rule) {
            if(is_array($rule)){
                foreach ($rule as $key_rule => $rule_params) {
                    $validator->rule($key_rule, $key, $rule_params);
                }
            }else{
                $validator->rule($rule, $key);
            }
        }
    }

    if($validator->validate()){
        return array($value, array(true, ""));
    }else{
        return array($value, array(false, $validator->errors()));
    }
}

// get defined validation rules for given feilds
function clean_get_validation_rules($field, $value){
    if(in_array($field, array('footer_js', 'header_js', 'ad_chat_left_bar', 'ad_chat_right_bar'))){
        $value = clean($value);
    }elseif (in_array($field, array('password'))) {
        $value = trim($value);
    }else{
        $value = clean($value);
        $value = app('purify')->xss_clean($value);
    }

    switch ($field) {
        case "site_name":
            return array($value, array('required', ['lengthMax' => '200']));
            break;
        case "email_host":
            return array($value, array('required'));
            break;
        case "email_username":
            return array($value, array('required'));
            break;
        case "email_password":
            return array($value, array('required'));
            break;
        case "contact_us_email":
        case "email":
        case "email_from_address":
            return array($value, array('required', 'email'));
            break;
        case "email_from_name":
            return array($value, array('required'));
            break;
        case "chat_receive_seconds":
        case "user_list_check_seconds":
        case "chat_status_check_seconds":
        case "online_status_check_seconds":
        case "typing_status_check_seconds":
            return array($value, array('required', 'integer', ['min' => '1']));
            break;
        case "home_bg_gradient_1":
        case "home_bg_gradient_2":
        case "home_text_color":
        case "home_header_bg_color":
        case "home_header_text_color":
        case "chat_userlist_bg_gradient_1":
        case "chat_userlist_bg_gradient_2":
        case "chat_userlist_text_color":
        case "chat_container_bg_gradient_1":
        case "chat_container_bg_gradient_2":
        case "chat_container_text_color":
        case "chat_container_received_bubble_color":
        case "chat_container_received_text_color":
        case "chat_container_username_text_color":
        case "chat_container_sent_bubble_color":
        case "chat_container_sent_text_color":
        case "chat_info_bg_gradient_1":
        case "chat_info_bg_gradient_2":
        case "chat_info_section_header_color":
        case "chat_info_text_color":
            return array($value, array(['regex' => '/#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/']));
            break;
        case "max_message_length":
        case "tenor_gif_limit":
            return array($value, array(['min' => '1']));
            break;
        case "name":
            return array($value, array('required'));
            break;
        case "slug":
            return array($value, array('required', 'slug', ['lengthMax' => '50']));
            break;
        case "last_name":
        case "first_name":
            return array($value, array('required', ['lengthMax' => '20']));
            break;
        case "user_name":
            return array($value, array(['lengthMin' => '3'], ['lengthMax' => '50']));
            break;
        case "password":
            return array($value, array(['lengthMin' => '4'], ['lengthMax' => '20']));
            break;
        case "pin":
            return array($value, array(['lengthMin' => '3'], ['lengthMax' => '10']));
            break;
        case "homepage_chat_room_limit":
            return array($value, array(['min' => '1']));
            break;
        case "country":
            return array($value, array(['lengthMax' => '2']));
            break;
        default:
            return array($value, false);
    }
}

// basic clean function to clean input data
function clean($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function purchase_verify($purchase_code, $email, $url){
	return array('status'=>'true','response'=>'response');
    $post = [
        'code' => $purchase_code,
        'email' => $email,
        'url'   => $url,
        'item_id'   => '3318260180',
    ];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://www.oncodes.com/api/v1/envato/purchase_verify");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    $output = curl_exec($ch);
    $return_data = @json_decode($output, true);
    return $return_data;
    curl_close($ch);

}


function get_timezone_list($selected_timezone=False){
    $opt = '';
    $regions = array('Africa', 'America', 'Antarctica', 'Arctic', 'Asia', 'Atlantic', 'Australia', 'Europe', 'Indian', 'Pacific');
    $tzs = timezone_identifiers_list();
    $optgroup = '';
    sort($tzs);
    $timestamp = time();
    if (!$selected_timezone) {
        $selected_timezone = SETTINGS['timezone'];
        if ((app('auth')->user() && app('auth')->user()['timezone'])) {
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


function index_helper(){
    $data = array();
    if (!(app('auth')->user() && app('auth')->user()['user_type'] == 1)) {
        //app('db')->where ('status', '1');
        //app('db')->where ('is_visible', '1');
    }
    if(array_key_exists("homepage_chat_room_limit", SETTINGS)){
        if (SETTINGS['homepage_chat_room_limit']) {
            $default_limit = SETTINGS['homepage_chat_room_limit'];
        }else{
            $default_limit = 6;
        }
    }else{
        $default_limit = 6;
    }

    app('db')->join("chat_rooms cr", "cr.id=cg.chat_room", "LEFT");
    app('db')->join("group_users gu", "gu.chat_group=cg.id", "LEFT");
    app('db')->where ('cg.slug', 'general');
    app('db')->where ('cr.status', 1);
    app('db')->where ('cr.is_visible', 1);
    app('db')->groupBy ('gu.chat_group');

    if (isset(SETTINGS['chat_room_order'])) {
        if (SETTINGS['chat_room_order'] == 'newest_first') {
            app('db')->orderBy ('cr.id', 'DESC');
        }else if(SETTINGS['chat_room_order'] == 'oldest_first'){
            app('db')->orderBy ('cr.id', 'ASC');
        }else if(SETTINGS['chat_room_order'] == 'most_users_first'){
            app('db')->orderBy ('users_count', 'DESC');
        }else if(SETTINGS['chat_room_order'] == 'least_users_first'){
            app('db')->orderBy ('users_count', 'ASC');
        }
    }else{
        app('db')->orderBy ('users_count', 'DESC');
    }

    $chat_rooms = app('db')->get('chat_groups cg', array(0,$default_limit), 'cr.*, COUNT(gu.id) as users_count');


    $data['chat_rooms'] = $chat_rooms;
    $data['timezone_list'] = get_timezone_list();
    include('countries.php');
    $data['country_list'] = $countries;

    app('db')->where ('user_id', app('auth')->user()['id']);
    $data['user_push_devices'] = app('db')->get('push_devices');

    $data['lang_list'] = app('db')->get('languages');
    $data['title'] = SETTINGS['site_name'] . (isset(SETTINGS['site_tagline']) ? ' - '.SETTINGS['site_tagline'] : '');

    if (app('auth')->user() && in_array(app('auth')->user()['user_type'], array(1,2,4))) {
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
                    array_push($my_rooms, $my_room);
                }
            }
        }
        $data['my_rooms'] = $my_rooms;
    }

    return $data;
}


function translate_term($term, $lang=false){
    if(!$lang){
        $lang = app()->lang;
    }
    app('db')->where('term', $term);
    if ($lang_term = app('db')->getOne('lang_terms')) {
        app('db')->where('term_id', $lang_term['id']);
        app('db')->where('lang_code', $lang['code']);
        if ($lang_term = app('db')->getOne('translations')) {
            return $lang_term['translation'];
        }else{
            return $term;
        }
    }else{
        return $term;
    }
}



function get_url_data($url) {
    $data = array(
        'title' => null,
        'description' => null,
        'image' => null
    );
    if ($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_ENCODING, "");
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36');
        curl_setopt($ch, CURLOPT_AUTOREFERER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        $page = curl_exec($ch);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        curl_close($ch);
        $advanced = 1;
        if (stripos($contentType, 'text/html') !== false) {
            $doc = new DOMDocument();
            @$doc->loadHTML(mb_convert_encoding($page, 'HTML-ENTITIES', 'UTF-8'));
            $nodes = $doc->getElementsByTagName('title');
            $data['title'] = $nodes->item(0)->nodeValue;
            if (empty($data['title'])) {
                $data['title'] = null;
            } else {
                $data['title'] = app('purify')->xss_clean(clean($data['title']));
            }
            $metas = $doc->getElementsByTagName('meta');
            for ($i = 0; $i < $metas->length; $i++) {
                $meta = $metas->item($i);
                if ($meta->getAttribute('property') == 'og:description') {
                    $data['description'] =  app('purify')->xss_clean(clean($meta->getAttribute('content')));
                }else if($meta->getAttribute('name') == 'description'){
                    $data['description'] = app('purify')->xss_clean(clean($meta->getAttribute('content')));
                }else if($meta->getAttribute('name') == 'Description'){
                    $data['description'] = app('purify')->xss_clean(clean($meta->getAttribute('content')));
                }
                if ($meta->getAttribute('property') == 'og:image') {
                    $data['image'] = $meta->getAttribute('content');
                }else if($meta->getAttribute('property') == 'twitter:image'){
                    $data['image'] = $meta->getAttribute('content');
                }
            }
        }

    }
    return $data;
}


function listFolderFiles($dir, &$results = array()) {
    $files = scandir($dir);

    foreach ($files as $key => $value) {
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path)) {
            $results[] = $path;
        } else if ($value != "." && $value != "..") {
            listFolderFiles($path, $results);
            $results[] = $path;
        }
    }

    return $results;
}

function get_string_between($p_string, $p_from, $p_to, $p_multiple=true){
    $result = null;
    //checking for valid main string
    if (strlen($p_string) > 0) {
        //checking for multiple strings
        if ($p_multiple) {
            // getting list of results by end delimiter
            $result_list = explode($p_to, $p_string);
            //looping through result list array
            foreach ( $result_list AS $rlkey => $rlrow) {
                // getting result start position
                $result_start_pos   = strpos($rlrow, $p_from);
                // calculating result length
                $result_len         =  strlen($rlrow) - $result_start_pos;

                // return only valid rows
                if ($result_start_pos > 0) {
                    // cleanying result string + removing $p_from text from result
                    $result[] =   substr($rlrow, $result_start_pos + strlen($p_from), $result_len);
                }// end if
            } // end foreach

        // if single string
        } else {
            // result start point + removing $p_from text from result
            $result_start_pos   = strpos($p_string, $p_from) + strlen($p_from);
            // lenght of result string
            $result_length      = strpos($p_string, $p_to, $result_start_pos);
            // cleaning result string
            $result             = substr($p_string, $result_start_pos+1, $result_length );
        } // end if else
    // if empty main string
    } else {
        $result = false;
    } // end if else

    return $result;

}


// rebuild translation phrases
function collect_update_terms(){
    $dirs = array(
        BASE_PATH.'templates',
        BASE_PATH.'static',
        BASE_PATH.'utils',
        BASE_PATH.'app',
        BASE_PATH.'classes'
    );
    $exts = array(
        'html',
        'php',
    );
    $added_terms = array();
    foreach ($dirs as $dir) {
        $items = listFolderFiles($dir);
        foreach ($items as $item) {
            if (!is_dir($item)) {
                $ext = pathinfo($item, PATHINFO_EXTENSION);
                if (in_array($ext, $exts)){
                    $item_file_content = file_get_contents($item);
                    $translate_phrases = get_string_between($item_file_content, '_(', ')');

                    if ($translate_phrases) {
                        foreach ($translate_phrases as $translate_phrase) {
                            $translate_phrase = substr($translate_phrase, 1);
                            $translate_phrase = substr($translate_phrase, 0, -1);
                            if (strlen(trim($translate_phrase))>1) {
                                app('db')->where('term', $translate_phrase);
                                if(!app('db')->getOne('lang_terms')){
                                    $data = Array ("term" => $translate_phrase);
                                    $id = app('db')->insert ('lang_terms', $data);
                                    if ($id) {
                                        $added_terms[] = $translate_phrase;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return $added_terms;
}

function profanity_filter($text){
    if(app('profanity')->hasProfanity($text)){
        $words = preg_split("~\s+~", $text);
        foreach ($words as $key => $word) {
            $filtered = app('profanity')->obfuscateIfProfane($word);
            $words[$key] = $filtered;
        }
        return implode(' ', $words);
    }else{
        return $text;
    }
}


function __($term){
    return translate_term($term);
}

function send_push($token, $title, $message, $image){
    if (isset(SETTINGS['firebase_server_key'])) {
        $data = array();
        $data['notification']['title'] = $title;
        $data['notification']['body'] = $message;
        $data['notification']['icon'] = $image;
        $data['notification']['click_action'] = URL;
        $data['to'] = $token;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POST, 1);
        $headers = array();
        $headers[] = "Authorization: key = " . SETTINGS['firebase_server_key'];
        $headers[] = "Content-Type: application/json";
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_URL , "https://fcm.googleapis.com/fcm/send");
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch,CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch,CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch,CURLOPT_SSL_VERIFYPEER , false);
        $result = curl_exec($ch);
        curl_close($ch);
    }
}

function hybridauth($sconfig){
    $hybridauth = new Hybridauth\Hybridauth($sconfig);
    app()->hybridauth = new Hybridauth\Hybridauth($sconfig);
    $adapters = $hybridauth->getConnectedAdapters();
    return $hybridauth;
}

function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 8; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}


function download_image($url, $temp_file_name){
    $fp = fopen ($temp_file_name, 'w+');
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_ENCODING, "");
	curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36');
	curl_setopt($ch, CURLOPT_AUTOREFERER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
	curl_setopt($ch, CURLOPT_TIMEOUT, 5);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_exec($ch);
    curl_close($ch);
    fclose($fp);
    // Crop
    $image = new ImageResize($temp_file_name);
    $image->crop(150, 150);
    $image->save($temp_file_name);
    if ($image) {
        return $temp_file_name;
    }else{
        return false;
    }

}

function get_social_logins(){
    $social_logins = array(
        ['name' => 'Amazon', 'spec' => 'OAuth2'],
        ['name' => 'Apple', 'spec' => 'OAuth2'],
        ['name' => 'Authentiq', 'spec' => 'OAuth2'],
        ['name' => 'BitBucket', 'spec' => 'OAuth2'],
        ['name' => 'Blizzard', 'spec' => 'OAuth2'],
        ['name' => 'BlizzardAPAC', 'spec' => 'OAuth2'],
        ['name' => 'BlizzardEU', 'spec' => 'OAuth2'],
        ['name' => 'DeviantArt', 'spec' => 'OAuth2'],
        ['name' => 'Discord', 'spec' => 'OAuth2'],
        ['name' => 'Disqus', 'spec' => 'OAuth2'],
        ['name' => 'Dribbble', 'spec' => 'OAuth2'],
        ['name' => 'Dropbox', 'spec' => 'OAuth2'],
        ['name' => 'Facebook', 'spec' => 'OAuth2'],
        ['name' => 'Foursquare', 'spec' => 'OAuth2'],
        ['name' => 'GitHub', 'spec' => 'OAuth2'],
        ['name' => 'GitLab', 'spec' => 'OAuth2'],
        ['name' => 'Google', 'spec' => 'OAuth2'],
        ['name' => 'Instagram', 'spec' => 'OAuth2'],
        ['name' => 'LinkedIn', 'spec' => 'OAuth2'],
        ['name' => 'Mailru', 'spec' => 'OAuth2'],
        ['name' => 'Medium', 'spec' => 'OAuth2'],
        ['name' => 'MicrosoftGraph', 'spec' => 'OAuth2'],
        ['name' => 'Odnoklassniki', 'spec' => 'OAuth2'],
        ['name' => 'ORCID', 'spec' => 'OAuth2'],
        ['name' => 'Patreon', 'spec' => 'OAuth2'],
        ['name' => 'Pinterest', 'spec' => 'OAuth2'],
        ['name' => 'QQ', 'spec' => 'OAuth2'],
        ['name' => 'Reddit', 'spec' => 'OAuth2'],
        ['name' => 'Slack', 'spec' => 'OAuth2'],
        ['name' => 'Spotify', 'spec' => 'OAuth2'],
        ['name' => 'StackExchange', 'spec' => 'OAuth2'],
        ['name' => 'Steam', 'spec' => 'Hybrid'],
        ['name' => 'SteemConnect', 'spec' => 'OAuth2'],
        ['name' => 'Strava', 'spec' => 'OAuth2'],
        ['name' => 'Telegram', 'spec' => 'Hybrid'],
        ['name' => 'TwitchTV', 'spec' => 'OAuth2'],
        ['name' => 'Vkontakte', 'spec' => 'OAuth2'],
        ['name' => 'WeChat', 'spec' => 'OAuth2'],
        ['name' => 'WeChatChina', 'spec' => 'OAuth2'],
        ['name' => 'WindowsLive', 'spec' => 'OAuth2'],
        ['name' => 'WordPress', 'spec' => 'OAuth2'],
        ['name' => 'Yahoo', 'spec' => 'OAuth2'],
        ['name' => 'Yandex', 'spec' => 'OAuth2']
    );
    return $social_logins;
}

function base64_to_upload($base64_string, $output_file) {
    $file = fopen($output_file, "wb");
    $data = explode(',', $base64_string);
    fwrite($file, base64_decode($data[1]));
    fclose($file);
    return $output_file;
}


function get_social_config(){
    app('db')->where('status', 1);
    $social_logins = app('db')->get('social_logins');
    $providers = [];
    foreach ($social_logins as $social_login) {
        $each_provider_keys = [];
        $each_provider_keys['id'] = $social_login['id_key'];
        $each_provider_keys['secret'] = $social_login['secret_key'];
        $each_provider = [];
        $each_provider['enabled'] = true;
        $each_provider['keys'] = $each_provider_keys;
        $providers[$social_login['name']] = $each_provider;
    }
    $sconfig = [];
    $sconfig['callback'] = route('sociallogin-callback');
    $sconfig['providers'] = $providers;
    return $sconfig;
}


?>
