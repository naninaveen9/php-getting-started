"use strict"; // Start of use strict

var isMobile = false;
var lastTypedTime = new Date(0); // it's 01/01/1970
var typingDelayMilliSe = {{SETTINGS.typing_status_check_seconds}}*1000; // how long user can "think about his spelling"
var onlineCheckMilliSe = {{SETTINGS.online_status_check_seconds}}*1000;
var chat_receive_seconds = {{SETTINGS.chat_receive_seconds}}*1000;
var user_list_check_seconds = {{SETTINGS.user_list_check_seconds}}*1000;
var chat_status_check_seconds = {{SETTINGS.chat_status_check_seconds}}*1000;
var system_timezone = '{{SETTINGS.timezone}}';
var system_timezone_offset = '{{SYSTEM_TIMEZONE_OFFSET}}';
var user_timezone = "{{USER.timezone}}";
var tenor_api_key = '{{SETTINGS.tenor_api_key}}';
var tenor_gif_limit = "{{SETTINGS.tenor_gif_limit|default('15')}}";
var chat_date = "";
var is_typing = 0;
var audio = new Audio('{{STATIC_URL}}/audio/chat_sound.mp3');
var previous_height = $('.chat-scroll')[0].scrollHeight;
var is_nicescroll = {{ SETTINGS.nice_scroll?'true':'false' }};
var max_message_length = {{SETTINGS.max_message_length?SETTINGS.max_message_length:1000}}
var display_name_format = "{{ SETTINGS.display_name_format?SETTINGS.display_name_format:'fullname'}}";
var can_scroll_up = true;
var can_scroll_down = false;
var chat_search_mode = false;
var room_user_search_mode = false;
var room_status_mode = false;
var heartbeat_status = 0;
var updated_chats_heartbeat_status = 0;
var forward_msg_list = [];
var forward_user_list = [];
var forward_group_list = [];
var forward_chat_item = [];

// Auddio Recorder Variables
URL = window.URL || window.webkitURL;
var gumStream; //stream from getUserMedia()
var recorder; //WebAudioRecorder object
var input; //MediaStreamAudioSourceNode  we'll be recording
var encodingType; //holds selected encoding for resulting audio (file)
var encodeAfterRecord = true; // when to encode
// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; //new audio context to help us record
var recordingTime = 0;
var msg_forward_btn = "";


// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

if (isMobile) {
    is_nicescroll = false;
}


// Call Tenor Api & Get Emojis
function get_gifs(tenor_api_key, tenor_gif_limit, q) {
    loading(".gifs", "show");
    $('.gif-list').empty();
    if (q != "") {
        var api_url = `https://api.tenor.com/v1/search?key=` + tenor_api_key + `&media_filter=minimal&ar_range=standard&limit=` + tenor_gif_limit + `&q=` + q;
    } else {
        var api_url = `https://api.tenor.com/v1/trending?key=` + tenor_api_key + `&media_filter=minimal&ar_range=standard&limit=` + tenor_gif_limit;
    }
    $.get(api_url, function(data) {
        $.each(data.results, function(k, v) {
            var gif_url = v.media[0]['tinygif']['url'];
            var gif_li = `<li class="send-gif" data-gif="` + gif_url + `"><img class="gif-preview" src="` + gif_url + `"></li>`;
            $(gif_li).appendTo($('.gif-list'));
        });
    });
    loading(".gifs", "hide");
}


// Play Chat pop sound
function play_chat_sound() {
    audio.play();
}


// Convert text links to hyperlinks in chat
function linkParse(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank"><span class="chat-link"><i class="fa fa-link"></i> $1</span></a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank"><span class="chat-link"><i class="fa fa-link"></i> $2</span></a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1"><span class="chat-link"><i class="fa fa-link"></i> $1</span></a>');

    return replacedText;
}


// make youtube links as clickable and popup the video player
function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}


// Sanitize xss jQuery - Clean xss and HTML
(function($) {
    $.sanitize = function(input) {
        //strip all html tags
        var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
        replace(/<[\/\!]*?[^<>]*?>/gi, '').
        replace(/<style[^>]*?>.*?<\/style>/gi, '').
        replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
        return $.trim(output);
    };
})(jQuery);


// Convert html chars
function htmlEncode(html) {
    return document.createElement('a').appendChild(
        document.createTextNode(html)).parentNode.innerHTML;
}


// Lazy load images and scroll resize
function lazyLoad(){
    $('.lazy').lazy({
        effect: "fadeIn",
        effectTime: 500,
        scrollDirection: 'vertical',
        appendScroll:$('.chat-scroll'),
    });
    if (is_nicescroll) {
        $(".chat-scroll").getNiceScroll().resize();
    }
}


// restrict or unrestrict chat typing area
function restrictTypingArea(restrict_type, restrict_msg){
    if(restrict_type == 1){
        $('.type-blocked-overlay').show();
        $('.type-blocked-overlay').text(restrict_msg);
        $('#message_content').data("emojioneArea").disable();
        $('.message-files').css({"pointer-events": "none"});
        $(".message-gif, .message-sticker").popover('disable');
    }else{
        $('.type-blocked-overlay').hide();
        $('.type-blocked-overlay').text("Blocked User");
        $('#message_content').data("emojioneArea").enable();
        $('.message-files').css({"pointer-events": "unset"});
        $(".message-gif, .message-sticker").popover('enable');
    }
}


// new message save
function newMessage(message_data, message_type){
    if (message_data === undefined) {
        var message_data = $.sanitize($("#message_content").val());
    }
    if (message_type === undefined) {
        var message_type = 1;
    }
    var chat_type = "private";
    if ($('#active_user').val() == ""){
        chat_type = "group";
    }
    var random_id = Math.random();
    if(message_data != ""){
        var msg_obj = {};
        msg_obj['sender_id'] = {{ USER.id }};
        msg_obj['status'] = 1;
        msg_obj['type'] = message_type;
        msg_obj['chat_type'] = chat_type;
        msg_obj['avatar'] = "{{USER.avatar}}";
        msg_obj['message'] = message_data;
        msg_obj['random_id'] = random_id;
        msg_obj['id'] = "";
        msg_obj['time'] = moment().format('YYYY-MM-DD HH:mm:ss');
        if (message_data != "") {
            createMessage(msg_obj, false, true);
            $('#message_content').val(null);
            $('.emojionearea-editor').empty();
            lazyLoad();
            if (message_type==7) {
                GreenAudioPlayer.init({
                    selector: '.cn-player',
                    stopOthersOnPlay: true,
                });
            }
        }

        var active_user = $("#active_user").val();
        var active_group = $("#active_group").val();
        var active_room = $("#active_room").val();
        var chat_meta_id = $("#chat_meta_id").val();
        if (active_user) {
            active_group = null;
        }
        $.ajax({
            url: "{{ url('ajax-save-message') }}",
            type: "POST",
            dataType: 'json',
            data: {
                csrftoken: '{{ csrf_token_ajax() }}',
                active_user: active_user,
                active_group: active_group,
                active_room: active_room,
                chat_meta_id: chat_meta_id,
                message_content: message_data,
                message_type: message_type,
                random_id: random_id,
            },
            success: function(data) {
                $("[data-random-id='" + data.random_id + "']").attr("id",data.id);
                $("[data-random-id='" + data.random_id + "']").find('.forward-list-check').attr("id",data.id+'_check');
                $("[data-random-id='" + data.random_id + "']").find('.message-time').html(moment(data.time+system_timezone_offset).tz(user_timezone).format('hh:mm A'));
                $("[data-random-id='" + data.random_id + "']").find('.message-status').html('<i class="fa fa-check-double"></i>');
                if (data.preview !== null) {
                    if (message_type == 1) {
                        var json_preview = JSON.parse(data.preview)
                        $("[data-random-id='" + data.random_id + "']").find('.message-html').append(getLinkPreview(json_preview));
                        lazyLoad();
                        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
                    }
                }

                if (data.profanity_filtered !== null) {
                    $("[data-random-id='" + data.random_id + "']").find('.chat-txt').text(data.profanity_filtered);
                }
            }
        });
    }

}


// get sticker functions
function get_strickers(){
    $.ajax({
        url: "{{ url('ajax-get-stickers') }}",
        type: "POST",
        dataType: 'json',
        data: {
            csrftoken: '{{ csrf_token_ajax() }}'
        },
        beforeSend: function() {
            loading(".strickers","show");
        },
        success: function(data) {
            if (Object.keys(data.stickers).length > 0) {
                var sticker_set_count = 1;
                $.each(data.stickers, function( index, obj ) {
                    if(sticker_set_count == 1){
                        var act_class = 'active';
                        var act_class_content = 'active show';
                    }else{
                        var act_class = '';
                        var act_class_content = '';
                    }
                    var tab_html =
                    `<li class="nav-item">
                      <a class="nav-link `+act_class+`" id="pills-tab-`+sticker_set_count+`" data-toggle="pill" href="#sticker-pills-`+sticker_set_count+`" role="tab" >`+index+`</a>
                    </li>`;
                    $('.sticker-nav').append(tab_html);
                    var sticker_list = '';
                    $.each(obj, function( index, sticker ) {
                        var sticker_url = '{{ MEDIA_URL }}/stickers/' + sticker;
                        var sticker_html = `<div class="send-sticker" data-sticker="`+sticker+`"><img src="`+sticker_url+`" /></div>`;
                        sticker_list += (sticker_html);
                    });
                    var tab_content_html =
                    `<div class="tab-pane fade  `+act_class_content+`" id="sticker-pills-`+sticker_set_count+`" role="tabpanel" >
                        `+ sticker_list +`
                    </div>`
                    $('.sticker-tab-content').append(tab_content_html);
                    sticker_set_count++;
                });
            }else{
                $('.sticker-tab-content').append('<p class="text-center">{{_("No Stickers Found")}}</p>');
            }
        },complete: function(){
            loading(".strickers","hide");
        }

    });
}


// check user is typing
function refreshTypingStatus() {
    if ($('#message_content').data("emojioneArea").getText().length == 0 || new Date().getTime() - lastTypedTime.getTime() > typingDelayMilliSe) {
        is_typing = 0;
    } else {
        is_typing = 1;
    }
}


// update user last type time
function updateLastTypedTime() {
    lastTypedTime = new Date();
}


// get selected chat information
function getActiveInfo(user_show=false){
    if (user_show == false) {
        var active_user = $("#active_user").val();
        $('.close-selected-user, .start-chat').hide();
        $('.selected-chat-actions').show();
    }else{
        var active_user = user_show;
        $('.close-selected-user').show();
        $('.start-chat').css('display', 'inline-flex');
        $('.selected-chat-actions').hide();
    }
    var active_group = $("#active_group").val();
    var active_room = $("#active_room").val();
    if (active_user=="") {
        var selected_mode = "group";
    }else{
        var selected_mode = "user";
    }
    $.ajax({
        url: "{{ url('ajax-get-active-info') }}",
        type: "POST",
        dataType: 'json',
        data: {
            csrftoken: '{{ csrf_token_ajax() }}',
            active_group: active_group,
            active_room: active_room,
            active_user: active_user,
        },
        beforeSend: function() {
            loading(".selected-chat-col","show");
        },
        success: function(data) {
            $('.selected-chat').removeClass('shown-panel');
            $('.search-panel').hide();
            $('.results').empty();
            $('#search-query').val('');
            if (data.info_type == "user") {
                $('.active-group-info').hide();
                $('.active-user-info').show();
                $('.active-user-dob').html(data.info.dob);
                if (display_name_format == 'username') {
                    var display_name = data.info.user_name;
                }else{
                    var display_name = data.info.first_name + ' ' + data.info.last_name;
                }
                $('.active-user-title, .active-user-name').html(display_name);
                if(user_show==false){

                    if (display_name_format == 'username') {
                        $('.chat-title, .active-user-title, .active-user-name').html(""+display_name);
                        $('.chat-slug').empty();
                    }else{
                        $('.chat-title, .active-user-title, .active-user-name').html(display_name);
                        $('.chat-slug').html("@"+data.info.user_name);
                    }

                }
                var gender = "Other";
                var country = "N/A";
                if(data.info.sex == 1){
                    gender = "<i class='fa fa-gender fa-mars'></i> {{_('Male')}} ";
                }else if(data.info.sex == 2){
                    gender = "<i class='fa fa-gender fa-venus'></i> {{_('Female')}}";
                }else{
                    gender = "<i class='fa fa-gender fa-genderless'></i> {{_('Other')}}";
                }

                if(data.info.country){
                    country = '<span class="flag-icon flag-icon-'+data.info.country.toLowerCase()+'"></span> ' + data.info.country;
                }

                $('.active-user-gender').html(gender);
                $('.active-user-country').html(country);
                $(".active-user-avatar").attr("src", data.info.avatar_url);
                if(data.info.about){
                    $('.active-user-about').show();
                    $('.active-user-about').html(data.info.about);
                }else{
                    $('.active-user-about').hide();
                }
                $('.active-user-favourite').attr('data-is-favourite', data.info.is_favourite);
                $('.active-user-mute').attr('data-is-muted', data.info.is_muted);
                $('.active-user-block').attr('data-is-blocked', data.info.blocked_by_you);
                if(data.info.is_favourite){
                    $('.active-user-favourite .icon').html('<i class="fas fa-heart"></i>');
                    $('.active-user-favourite').attr('title', "{{_('Remove from Favorites')}}");
                }else{
                    $('.active-user-favourite .icon').html('<i class="far fa-heart"></i>');
                    $('.active-user-favourite').attr('title', "{{_('Add to Favorites')}}");
                }

                if(user_show==false){
                    if(data.info.blocked_by_you){
                        restrictTypingArea(data.info.blocked_by_you, "{{_('Blocked by you')}}");
                    }else if (data.info.blocked_by_him) {
                        restrictTypingArea(data.info.blocked_by_him, "{{_('Blocked by user')}}");
                    }else{
                        restrictTypingArea(0, '');
                    }
                }


                if(data.info.blocked_by_you){
                    $('.active-user-block .icon').html('<i class="fas fa-ban"></i>');
                    $('.active-user-block').attr('title', "{{_('Unblock')}}");
                }else{
                    $('.active-user-block .icon').html('<i class="far fa-circle"></i>');
                    $('.active-user-block').attr('title', "{{_('Block')}}");
                }

                if(data.info.is_muted){
                    $('.active-user-mute .icon').html('<i class="fas fa-bell-slash"></i>');
                    $('.active-user-mute').attr('title', "{{_('Unmute')}}");
                }else{
                    $('.active-user-mute .icon').html('<i class="fas fa-bell"></i>');
                    $('.active-user-mute').attr('title', "{{_('Mute')}}");
                }
            }else if (data.info_type == "group") {
                restrictTypingArea(0, '');
                $('.active-user-info').hide();
                $('.active-group-info').show();
                $(".active-group-cover").attr("src", data.info.cover_url);
                $('.active-group-mute').attr('data-is-muted', data.info.is_muted);
                $('.chat-title, .active-group-name').html(data.info.room_data.name);
                if (data.info.slug == 'general') {
                    $('.chat-slug').html("#"+data.info.room_data.slug);
                }else{
                    $('.chat-slug').html("#"+data.info.slug);
                }


                if(data.info.is_muted){
                    $('.active-group-mute .text').html("{{_('Muted')}}");
                    $('.active-group-mute .icon').html('<i class="fas fa-bell-slash"></i>');
                }else{
                    $('.active-group-mute .text').html("{{_('Mute')}}");
                    $('.active-group-mute .icon').html('<i class="fas fa-bell"></i>');
                }

                var group_users = ``;
                $.each(data.group_users, function( index, obj ) {
                    var sex = ``;
                    var user_type = ``;
                    var country = ``;
                    if(obj.avatar) {
                        var img_src = "{{MEDIA_URL}}/avatars/"+obj.avatar;
                    }else{
                        var img_src = "{{STATIC_URL}}/img/user.jpg";
                    }
                    if (display_name_format == 'username') {
                    	var display_name = obj.user_name;
                    }else{
                    	var display_name = obj.first_name + ' ' + obj.last_name;
                    }

                    {% if SETTINGS.list_show_gender %}
                    if (obj.sex != "") {
                        if (obj.sex == 1) {
                            sex = '<i class="fas fa-gender fa-mars"></i>';
                        }else if(obj.sex == 2){
                            sex = '<i class="fas fa-gender fa-venus"></i>';
                        }else if(obj.sex == 3){
                            sex = '<i class="fas fa-gender fa-genderless"></i>';
                        }
                    }
                    {% endif %}

                    {% if SETTINGS.list_show_user_type %}
                    if (obj.user_type != "") {
                        if (obj.user_type == 1) {
                            user_type = "<span class='user-type-badge admin'>{{_('ADMIN')}}</span>";
                        }else if(obj.user_type == 4){
                            user_type = "<span title='{{_('Global Moderator')}}' class='user-type-badge mod'>{{_('MOD')}}</span>";
                        }else if(obj.user_type == 2){
                            var active_room_created_by = $('#active_room_created_by').val();
                            if(active_room_created_by == obj.id){
                                user_type = "<span title='{{_('Room Creator')}}' class='user-type-badge creator'>{{_('CREATOR')}}</span>";
                            }else if(obj.is_mod == 1){
                                user_type = "<span title='{{_('Room Moderator')}}' class='user-type-badge room-mod'>{{_('MOD')}}</span>";
                            }
                        }
                    }
                    {% endif %}

                    {% if SETTINGS.list_show_country %}
                    if (obj.country !== undefined && obj.country !== null) {
                        country = '<span class="flag-icon flag-icon-'+obj.country.toLowerCase()+'"></span>';
                    }
                    {% endif %}

                    var each_user = '<div class="row group-user" data-user-id="'+obj.id+'"><div class="col-12"><img class="img-profile mr-2" src='+img_src+'><div class="grp-user-name">' + display_name + `</div></span> ` + sex + ` ` + country + ` `+ user_type+ '</div></div>';

                    group_users = group_users + each_user;
                });
                $('#group-users-tab').html(group_users);
            }
            var img_count = 0;
            var recent_img_chat = ``;
            $.each(data.shared_photos, function(all_img_idx, all_img_obj) {
                $.each(JSON.parse(all_img_obj), function(img_idx, img_obj) {
                    if(img_count < 12){
                        var image_size_str = img_obj.split('_');
                        var image_size = "600x600";
                        if (image_size_str[1] !== undefined) {
                            image_size = image_size_str[1].substring(0, image_size_str[1].indexOf("."))
                        }

                        var each_img = `<figure class="col-3 recent-img">
                                        <a  href="{{MEDIA_URL}}/chats/images/large/`+img_obj+`" data-size="`+image_size+`">
                                            <img class="img-responsive" src="{{MEDIA_URL}}/chats/images/thumb/`+img_obj+`" />
                                        </a>
                                    </figure>`;
                        recent_img_chat = recent_img_chat + each_img;
                        img_count++;
                    }
                });
            });
            $('#recent-media-'+selected_mode+' .row').html(recent_img_chat);
            initPhotoSwipeFromDOM('#recent-media .row');

            var file_count = 0;
            var recent_file_chat = ``;
            $.each(data.shared_files, function(all_file_idx, all_file_obj) {
                $.each(JSON.parse(all_file_obj), function(file_idx, file_obj) {
                    if(file_count < 10){
                        var file_icon = getFileIcon(file_obj.extenstion, 'file-icon');
                        var each_file = `<div class="chat-files-block">
                            <div class="file-section">
                                <a href="#" class="file-header">
                                    `+file_icon+`
                                    <div class="file-description">
                                        <span class="file-title" dir="auto">`+file_obj.name+`</span>
                                        <div class="file-meta">
                                            <div class="file-meta-entry">
                                                <div class="file-meta-swap">`+file_obj.size+` `+file_obj.extenstion+` file</div>
                                            </div>
                                        </div>
                                    </div>

                                </a>
                                <div class="file-actions">
                                    <a href="{{MEDIA_URL}}/chats/files/`+file_obj.name+`" download="`+file_obj.name+`" class="file-action-buttons">
                                        <i class="fas fa-download file-download-icon"  aria-hidden="true"></i>
                                    </a>
                                </div>

                            </div>
                        </div>`;
                        recent_file_chat = recent_file_chat + each_file;
                        file_count++;
                    }
                });
            });
            $('#recent-files-'+selected_mode+' .row').html(recent_file_chat);


            var recent_links_chat = ``;
            $.each(data.shared_links, function(all_links_idx, link_obj) {
                link_obj = JSON.parse(link_obj)
                if (!link_obj.image) {
                    var img_link = '{{STATIC_URL}}/img/default-image.png';
                }else{
                    var img_link = link_obj.image;
                }
                var each_link = `<div class="chat-files-block">
                    <div class="file-section">
                        <a href="`+link_obj.url+`" target="_blank" class="file-header">
                            <img class="recent-link-preview" src="`+img_link+`" />
                            <div class="file-description">
                                <span class="file-title" dir="auto">`+link_obj.title+`</span>
                                <div class="file-meta">
                                    <div class="file-meta-entry">
                                        <div class="file-meta-swap">`+link_obj.message+` file</div>
                                    </div>
                                </div>
                            </div>

                        </a>
                        <div class="file-actions">
                            <a href="`+link_obj.url+`" target="_blank" class="file-action-buttons">
                                <i class="fas fa-external-link-alt file-download-icon"  aria-hidden="true"></i>
                            </a>
                        </div>

                    </div>
                </div>`;
                recent_links_chat = recent_links_chat + each_link;
            });
            $('#recent-links-'+selected_mode+' .row').html(recent_links_chat);
        },complete: function(){
            loading(".selected-chat-col","hide");
            if (is_nicescroll) {
                $(".selected-chat").getNiceScroll().resize();
            }
        }
    });
}

function forward_list_create(forward_msg_id){
    if($('#'+forward_msg_id+"_check").is(':checked')) {
        if($.inArray(parseInt(forward_msg_id), forward_msg_list) == -1){
            $('#'+forward_msg_id).addClass('selected');
            forward_msg_list.push(parseInt(forward_msg_id));
        }
    }else{
        if($.inArray(parseInt(forward_msg_id), forward_msg_list) > -1){
            $('#'+forward_msg_id).removeClass('selected');
            forward_msg_list.splice(forward_msg_list.indexOf(parseInt(forward_msg_id)), 1);
        }
    }

    $('.forward-selection-name').html(forward_msg_list.length + ' selected');
    if(forward_msg_list.length == 0){
        $('.forward-selected').attr("disabled", true);
    }else{
        $('.forward-selected').attr("disabled", false);
    }
}

function destroy_forward_selection(){
    $('.forward-check').addClass('hidden');
    $('.forward-selection').addClass('hidden');
    $('.forward-list-check').prop('checked', false);
    $('.forward-actions').addClass('hidden');
    $('.chats').removeClass('forwarding');
    $('.forward-room-user-search').val("");
    forward_msg_list = [];
    forward_group_list = [];
    forward_user_list = [];
    forward_chat_item = [];
}

// load selected room chat or individual chats
function loadChats(active_user, active_group, active_room, chat_id=false){
    can_scroll_up = false;
    can_scroll_down = false;
    $(".chats").empty();
    $("#active_user").val(active_user);
    $("#active_group").val(active_group);
    $("#active_room").val(active_room);
    $.ajax({
        url: "{{ url('ajax-load-chats') }}",
        type: "POST",
        dataType: 'json',
        data: {
            csrftoken: '{{ csrf_token_ajax() }}',
            active_user: active_user,
            active_group: active_group,
            active_room: active_room,
            chat_id: chat_id
        },
        beforeSend: function() {
            heartbeat_status = 0;
            updated_chats_heartbeat_status = 0;
            loading(".messages","show");
        },
        success: function(data) {
            $("#last_chat_id").val(0);
            $("#is_mod").val(data.is_mod);
            $.each(data.chats, function( index, obj ) {
                createMessage(obj,'none');
                $("#last_chat_id").val(obj.id);
            });
            $("#chat_meta_id").val(data.chat_meta_id);
            $("#last_updated_chat_time").val(data.last_updated_chat_time);
            $("#active_user").val(data.active_user);
        },complete: function(){
            if (chat_id) {
                var highlight_class = '#'+chat_id + ' .message-data';
                $(highlight_class).css('animation', 'flash 2s ease infinite');
                $("#" + chat_id)[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout( function(){$( highlight_class ).removeAttr('style'); }, 2000);
                can_scroll_down = true;
            }else{
                getActiveInfo();
                $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
            }
            loading(".messages","hide");
            can_scroll_up = true;
            lazyLoad();
            GreenAudioPlayer.init({
                selector: '.cn-player',
                stopOthersOnPlay: true,
            });
            heartbeat_status = 1;
            updated_chats_heartbeat_status = 1;
        }

    });
}


function getLinkPreview(json_msg){
    if (json_msg.image) {
        var preview_image = encodeURI(json_msg.image);
    }else{
        var preview_image = `{{STATIC_URL}}/img/default-image.png`;
    }
    if (json_msg.title) {
        var preview_title = `<b>`+json_msg.title+`</b>`;
    }else{
        var preview_title = ``;
    }
    if (json_msg.description) {
        var preview_description = `<div class="link-meta-desc">`+json_msg.description+`</div>`;
    }else{
        var preview_description = ``;
    }
    var link_class = '';
    var a = document.createElement('a');
    a.href = json_msg.url;
    var hostname = a.hostname;
    if (hostname == 'www.youtube.com' || hostname == 'youtube.com' || hostname == 'youtu.be') {
        link_class = 'video-link';
    }
    if(preview_title != ''){
        var link_preview = `<div class="chat-link-block">` +
            `<a target="_blank" href="`+json_msg.url+`">` +
                `<div class="link-preview `+link_class+`">` +

                        `<img class="lazy" data-src="`+preview_image+`" />` +
                        `<div class="link-meta">` +
                            preview_title +
                            preview_description +
                        `</div>` +

                `</div>`+
            `</a>` +
        `</div>`;
    }else{
        var link_preview = ``;
    }

    return link_preview;
}

// message create and append to the chat container
function createMessage(obj, direction="down", save_message=false){
    var sender_div = "";
    var is_group = "";
    var msg_delete_btn = "";
    var sent_animation = '';
    var replies_animation = '';
    var active_room_created_by = $('#active_room_created_by').val();
    var is_mod = $('#is_mod').val();
    var msg_reply_btn = ``;
    var forward_checkbox_hidden = "hidden";
    var msg_forward_btn = "";
    var forward_checked = "";
    var deleted = "";
    var is_view_as = "{{VIEW_AS}}";
    {% if SETTINGS.animate_css %}
     sent_animation = ' animate__animated {{ SETTINGS.sent_animation }} ';
     replies_animation = ' animate__animated {{ SETTINGS.replies_animation }}';
    {% endif %}
    if (obj.sender_id == {{ USER.id }} ) {
        var message_class_name = "sent" + sent_animation;
        var msg_status = '<i class="fa fa-check-double"></i>';
        var msg_status_class = '';
        if (obj.status == 2) {
            msg_status_class = 'read';
        }
        if (obj.status != 3) {
            msg_delete_btn = `<i class="fa fa-trash-alt message-delete" data-chat-type="`+obj.chat_type+`" title="{{_('Delete')}}"></i>`;
        }

    }else{
        var message_class_name = "replies" + replies_animation;
        var msg_status = '';
        var msg_status_class = '';
        if (display_name_format == 'username') {
        	var display_name = obj.user_name;
        }else{
        	var display_name = obj.first_name + ' ' + obj.last_name;
        }
        if(obj.chat_type == "group"){
            is_group = "grp";
            sender_div = "<small class='sender-name' data-user-id='"+obj.sender_id+"'>"+display_name +" </small>";
        }
        if (({{ USER.user_type }} == 1 || {{ USER.user_type }} == 4 || {{ USER.id }} == active_room_created_by || is_mod == 1 || is_view_as != "") && obj.status != 3){
            msg_delete_btn = `<i class="fa fa-trash-alt message-delete" data-chat-type="`+obj.chat_type+`" title="{{_('Delete')}}"></i>`;
        }
    }

    if(!obj.random_id){
        obj.random_id = "";
    }

    if(obj.avatar) {
        var img_src = "{{MEDIA_URL}}/avatars/"+obj.avatar;
    }else{
        var img_src = "{{STATIC_URL}}/img/user.jpg";
    }
    var msg = "";

    if(obj.status != 3){
        msg = messageHtml(obj);
        msg_forward_btn = `<i class="fa fa-share message-forward" title="{{_('Forward')}}"></i>`;
        if (!$('.forward-selection').hasClass("hidden")) {
            forward_checkbox_hidden = "";
        }

        if($.inArray(obj.id, forward_msg_list) > -1){
            forward_checked = "checked";
        }
        msg_reply_btn = `<i class="fa fa-reply message-reply" data-chat-type="`+obj.chat_type+`" title="{{_('Reply')}}"></i>`;

    }else{
        deleted = "deleted";
        msg_status = "";
        msg = `<div class="chat-txt deleted"><i class="fa fa-ban"></i> {{_('This message was deleted')}}</div>`;
        msg_forward_btn = ``;
        msg_reply_btn = ``;
    }

    var new_chat_date = moment(obj.time+system_timezone_offset).tz(user_timezone).format('dddd, MMM D, YYYY');
    var msg_content = `<li class="`+message_class_name+`" id="`+obj.id+`" data-random-id="`+obj.random_id+`" data-msg-type="`+obj.type+`" data-date="`+new_chat_date+`">
                            <div class="forward-check `+forward_checkbox_hidden+` `+deleted+`">
                                <input class="forward-list-check" `+forward_checked+` type="checkbox" id="`+obj.id+`_check" name="forward_message_list" />
                            </div>
                            <img class="avatar " src="`+img_src+`"  />
                            <div class="message-data `+is_group+`">
                                `+sender_div+`
                                <div class="message-html">`+ msg +`</div>
                            </div>
                            <div class="chat-actions">
                                `+ msg_delete_btn +` `+ msg_reply_btn +` `+ msg_forward_btn +`
                            </div>
                            <span class="message-meta">
                                <span class="message-time">`+ moment(obj.time+system_timezone_offset).tz(user_timezone).format('hh:mm A') +`</span>
                                <span class="message-status `+msg_status_class+`">`+ msg_status +`</span>
                            </span>
                        </li>`;

    if(direction=='up'){
        $(msg_content).prependTo($('.messages ul'));
    }else{
        $(msg_content).appendTo($('.messages ul'));
    }
    $(".messages  ul").find(`[data-printed-date='`+new_chat_date+`']`).remove();
    $(".messages  ul").find(`[data-date='`+new_chat_date+`']:first`).before(`<li class="new-date" data-printed-date="`+new_chat_date+`"><p>`+new_chat_date+`</p></li>`);

    initPhotoSwipeFromDOM('.chat-gallery');

    if(save_message){
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
    }else if (direction=='up') {
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight - previous_height);
    }else if(direction=='down'){
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
    }else if(direction=='none'){
        // no scroll
    }else if($('.chat-scroll')[0].scrollHeight - $('.chat-scroll').scrollTop() - $('.chat-scroll').height() < 350){
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
    }
    chat_date = new_chat_date;
}


function messageHtml(obj){
    var msg = "";
    if(obj.type == 1){
        msg = (emojione.shortnameToImage(linkParse(htmlEncode(obj.message))));
        msg = `<div class="chat-txt">`+msg+`</div>`;
    }else if(obj.type == 2){
        var images = JSON.parse(obj.message);
        if (images.length > 2) {
            msg = `<div class="chat-img-grp chat-gallery" data-pswp-uid="1">`;
            var n = 1;
            var more_overlay = "";
            var each_img = "";
            $.each(JSON.parse(obj.message), function(img_idx, img_obj) {
                var image_size_str = img_obj.split('_');
                var image_size = "600x600";
                if (image_size_str[1] !== undefined) {
                    image_size = image_size_str[1].substring(0, image_size_str[1].indexOf("."))
                }
                if (n > 3) {
                    var cls = "chat-img d-none";
                }else if (n == 3) {
                    if (images.length - 2 != 1)  {
                        var cls = "chat-img more";
                        more_overlay = `<span class="more-ovrlay">+`+(images.length - 3).toString()+`</span>`;
                    }else{
                        var cls = "chat-img";
                    }
                }else{
                    var cls = "chat-img";
                }
                each_img = `<figure class="`+cls+`">
                                <a href="{{MEDIA_URL}}/chats/images/large/`+img_obj+`" data-size="`+image_size+`">
                                    <img class="lazy" data-src="{{MEDIA_URL}}/chats/images/thumb/`+img_obj+`" />
                                    `+more_overlay+`
                                </a>
                            </figure>`;
                msg = msg + each_img;
                n++;
            });
            msg = msg + "</div>";
        }else if (images.length == 2) {
            msg = `<div class="chat-img-duo chat-gallery" data-pswp-uid="1"">`;
            $.each(JSON.parse(obj.message), function(img_idx, img_obj) {
                var image_size_str = img_obj.split('_');
                var image_size = "600x600";
                if (image_size_str[1] !== undefined) {
                    image_size = image_size_str[1].substring(0, image_size_str[1].indexOf("."))
                }
                each_img = `<figure >
                                <a href="{{MEDIA_URL}}/chats/images/large/`+img_obj+`" data-size="`+image_size+`">
                                    <img class="lazy"  data-src="{{MEDIA_URL}}/chats/images/thumb/`+img_obj+`" />
                                </a>
                            </figure>`;
                msg = msg + each_img;
            });
            msg = msg + "</div>";
        }else{
            msg = `<div class="chat-img-sgl chat-gallery" data-pswp-uid="1"">`;
            $.each(JSON.parse(obj.message), function(img_idx, img_obj) {
                var image_size_str = img_obj.split('_');
                var image_size = "600x600";
                if (image_size_str[1] !== undefined) {
                    image_size = image_size_str[1].substring(0, image_size_str[1].indexOf("."))
                }
                var image_size_px = image_size.split('x');
                if(image_size_px[0] >= 150){
                    var thumb_width = '150px';
                }else{
                    var thumb_width = image_size_px[0]+'px';
                }
                if(image_size_px[1] >= 150){
                    var thumb_height = '150px';
                }else{
                    var thumb_height = image_size_px[0]+'px';
                }
                each_img = `<figure>
                                <a href="{{MEDIA_URL}}/chats/images/large/`+img_obj+`" data-size="`+image_size+`">
                                    <img width="`+thumb_width+`" height="`+thumb_height+`" class="lazy" data-src="{{MEDIA_URL}}/chats/images/thumb/`+img_obj+`" src="" />
                                </a>
                            </figure>`;
                msg = msg + each_img;
            });
            msg = msg + "</div>";
        }

    }else if(obj.type == 3){
        msg = `<div class="chat-gif"> <img class="lazy" data-src="`+obj.message+`" /> </div>`;
    }else if (obj.type == 4){
        msg = `<div class="chat-sticker"> <img  class="lazy" data-src="{{MEDIA_URL}}/stickers/`+encodeURI(obj.message)+`" /> </div>`;
    }else if(obj.type == 5){
        var json_msg = JSON.parse(obj.message);
        var original_msg = (emojione.shortnameToImage(linkParse(htmlEncode(json_msg.message))));
        msg =`<div class="chat-txt">`+original_msg+`</div>`;
        msg =  msg + getLinkPreview(json_msg);
    }else if(obj.type == 6){
        $.each(JSON.parse(obj.message), function(file_idx, file_obj) {
            var file_icon = getFileIcon(file_obj.extenstion, 'file-icon');
            var each_file = `<div class="chat-files-block">
                <div class="file-section">
                    <a href="#" class="file-header">
                        `+file_icon+`
                        <div class="file-description">
                            <span class="file-title" dir="auto">`+file_obj.name+`</span>
                            <div class="file-meta">
                                <div class="file-meta-entry">
                                    <div class="file-meta-swap">`+file_obj.size+` `+file_obj.extenstion+` {{_('file')}}</div>
                                </div>
                            </div>
                        </div>

                    </a>
                    <div class="file-actions">
                        <a href="{{MEDIA_URL}}/chats/files/`+file_obj.name+`" download="`+file_obj.name+`" class="file-action-buttons">
                            <i class="fas fa-download file-download-icon"  aria-hidden="true"></i>
                        </a>
                    </div>

                </div>
            </div>`;
            msg = msg + each_file;
        });

    }else if(obj.type == 7){
        var json_msg = JSON.parse(obj.message);
        msg =
           `<div class="chat-audio">
                <i class="fa fa-microphone-alt audio-icon"></i>
                <div class="cn-player">
                    <audio crossorigin>
                        <source src="{{MEDIA_URL}}/chats/audio/`+json_msg.name+`" type="audio/mpeg">
                    </audio>
                </div>
            </div>`;
    }else if(obj.type == 8){
        var json_msg = JSON.parse(obj.message);
        var msg_obj = {};
        msg_obj['type'] = json_msg.new_message.new_type;
        if(json_msg.new_message.new_type == 5){
            msg_obj['message'] = JSON.stringify(json_msg.new_message.new_content);
        }else{
            msg_obj['message'] = json_msg.new_message.new_content;
        }

        msg_obj['id'] = "";
        var new_msg = messageHtml(msg_obj);

        var replied_data = JSON.parse(repliedMessage(json_msg.reply_message.reply_content, json_msg.reply_message.reply_type));

        var current_message = replied_data['current_message'];
        var current_preview = replied_data['current_preview'];

        if(json_msg.reply_message.reply_from_id == {{ USER.id }}){
            var replied_to = "{{_('Your chat')}}";
        }else{
            var replied_to = json_msg.reply_message.reply_from + "'s {{_('chat')}}";
        }
        var reply_msg = `<div class="replied-to" data-chat-id="`+json_msg.reply_message.reply_id+`">
            <span class="replied-border"></span>
            <div class="replied-content">
                <div class="replied-content-data">
                    <div class="replied-user" >`+replied_to+`</div>
                    <div class="replied-html">
                        `+current_message+`
                    </div>
                </div>
            </div>
            <div class="replied-preview">
                `+current_preview+`
            </div>
        </div>`;

        msg = `<div class="chat-replied-bubble">`+ reply_msg + new_msg + `</div>`;
    }else if(obj.type == 9){
        var json_msg = JSON.parse(obj.message);
        var msg_obj = {};
        msg_obj['type'] = json_msg.type;
        msg_obj['message'] = json_msg.message;

        msg_obj['id'] = "";
        var new_msg = messageHtml(msg_obj);
        msg = `<div class="chat-fwd"><span class="fwd-label"><i class="fa fa-share"></i> Forwarded</span>` + new_msg + `</div>`;
    }

    return msg;
}

function repliedMessage(current_message, current_message_type){
    var replied_html = "";
    var replied_preview = "";
    if(current_message_type == 1){
        replied_html = current_message;
    }else if (current_message_type == 2) {
        var images = JSON.parse(current_message);
        if (images.length > 1) {
            replied_html = "<i class='fa fa-image'></i> "+images.length+" {{_('Images')}}";
        }else{
            replied_html = "<i class='fa fa-image'></i> {{_('Image')}}";
        }
        replied_preview = `<img class="lazy" data-src="{{MEDIA_URL}}/chats/images/thumb/`+JSON.parse(current_message)[0]+`" />`;
    }else if (current_message_type == 3) {
        replied_html = "<i class='fa fa-image'></i> {{_('GIF')}}";
        replied_preview = `<img class="lazy" data-src="`+current_message+`" />`;
    }else if (current_message_type == 4) {
        replied_html = "<i class='fa fa-smile'></i> {{_('Sticker')}}";
        replied_preview = `<img  class="lazy" data-src="{{MEDIA_URL}}/stickers/`+encodeURI(current_message)+`" />`;
    }else if (current_message_type == 5) {
        replied_html = (emojione.shortnameToImage(linkParse(htmlEncode(JSON.parse(current_message)['message']))));
        replied_preview = `<img class="lazy" data-src="`+JSON.parse(current_message)['image']+`" />`;
    }else if (current_message_type == 6) {
        var files = JSON.parse(current_message);
        if (files.length > 1) {
            replied_html = "<i class='fa fa-file-alt'></i> "+files.length+" {{_('Files')}}";
        }else{
            replied_html = "<i class='fa fa-file-alt'></i> {{_('File')}}";
        }
    }else if (current_message_type == 7) {
        if(JSON.parse(current_message)['duration'] === undefined){
            var duration = "";
        }else{
            var duration = JSON.parse(current_message)['duration'];
        }
        replied_html = "<i class='fa fa-microphone-alt'></i> "+duration+" {{_('Audio Message')}}";
    }else if (current_message_type == 8) {
        var replied_data = JSON.parse(repliedMessage(JSON.parse(current_message)['new_message'], JSON.parse(current_message)['new_message_type']));
        var replied_html = replied_data['current_message'];
        var replied_preview = replied_data['current_preview'];
    }

    var msg_obj = {};
    msg_obj['current_message'] = replied_html;
    msg_obj['current_preview'] = replied_preview;
    return JSON.stringify(msg_obj);
}

// change user restrictions
function changeActiveUserRestriction(restriction_type, current_status){
    var chat_meta_id = $("#chat_meta_id").val();
    $.ajax({
        url: "{{ url('ajax-active-user-restriction') }}",
        type: "POST",
        dataType: 'json',
        data: {
            csrftoken: '{{ csrf_token_ajax() }}',
            restriction_type: restriction_type,
            current_status: current_status,
            chat_meta_id: chat_meta_id,
        },
        success: function(data) {
            if(data.success){
                getActiveInfo();
                if(data.type == "is_blocked"){
                    restrictTypingArea(data.status, "{{_('Blocked by you')}}");
                }
            }
        }
    });
}


// load active users
function loadActiveUsers(){
    var active_room = $("#active_room").val();
    $.ajax({
        url: "{{ url('ajax-online-list') }}",
        type: "POST",
        dataType: 'json',
        data: {
            csrftoken: '{{ csrf_token_ajax() }}',
            active_room: active_room,
        },
        success: function(data) {
            $('.online-list').empty();
            $('.fav-list').empty();
            if ('default_group' in data) {
                var unread_count_html = "";
                var group_mute_icon = "";
                if(data.default_group.unread_count > 0){
                    unread_count_html = `<span class="badge badge-danger badge-counter">` + data.default_group.unread_count + `</span>`;
                }
                if(data.default_group.is_muted){
                    group_mute_icon = `<i class="fas fa-bell-slash"></i>`;
                }
                var group_li =
                `<div id="" class="recent-chat chat-item" data-user-id="">
                    <div class="user-list-item ">
                        <div class="user-avatar">
                            <img class="img-profile mr-2" src="` + data.default_group.cover_url + `">
                        </div>
                        <div class="user-info">
                            <div class="chat-name">` + data.default_group.name + ` ` + group_mute_icon + `</div>
                            <div class="chat-preview">
                                ` + data.default_group.room_data.name + ` {{_('Chat Room')}}
                            </div>
                        </div>
                        <div class="chat-meta">` + unread_count_html + `</div>
                    </div>
                </div>`;

                $('.online-list').append(group_li);

            }

            if ('list' in data) {

                $.each(data.list, function( index, obj ) {
                    var chat_li = createOnlineUser(obj);
                    $('.online-list').append(chat_li);
                    if(obj.is_favourite && !obj.blocked_by_you){
                        $('.fav-list').append(chat_li);
                    }
                });

                if(parseInt($('#chat_room_user_count').val()) > 21){
                    $('.load-more-users').show();
                }
            }
        },
        complete: function(){
            if (is_nicescroll) {
                $(".online-list").getNiceScroll().resize();
            }
            $('.refresh-user-list').hide();
        }
    });
}


// change group restrictions
function changeActiveGroupRestriction(restriction_type, current_status){
    var chat_meta_id = $("#chat_meta_id").val();
    $.ajax({
        url: "{{ url('ajax-active-group-restriction') }}",
        type: "POST",
        dataType: 'json',
        data: {
            csrftoken: '{{ csrf_token_ajax() }}',
            restriction_type: restriction_type,
            current_status: current_status,
            chat_meta_id: chat_meta_id,
        },
        success: function(data) {
            if(data.success){
                getActiveInfo();
            }
        }
    });
}


// load more chats
function load_more_chats(direction){
    var active_user = $("#active_user").val();
    var active_group = $("#active_group").val();
    var active_room = $("#active_room").val();

    $.ajax({
        url: "{{ url('ajax-load-more-chats') }}",
        type: "POST",
        dataType: 'json',
        data: {
            csrftoken: '{{ csrf_token_ajax() }}',
            active_user: active_user,
            active_group: active_group,
            active_room: active_room,
            direction: direction
        },
        beforeSend: function() {
            loading(".messages","show");
        },
        success: function(data) {
            $.each(data.chats, function( index, obj ) {
                if (direction=='down') {
                    direction='none';
                }
                createMessage(obj, direction);
            });

        },complete: function(){
            loading(".messages","hide");
            lazyLoad();
            GreenAudioPlayer.init({
                selector: '.cn-player',
                stopOthersOnPlay: true,
            });
        }

    });
}

function getFileIcon(ext, custom_cls=""){
    var icon = "";
    if (ext == "pdf") {
        icon = `<i class="far fa-file-pdf pdf-icon `+custom_cls+`"></i>`;
    } else if (ext.indexOf("doc") != -1) {
        icon = `<i class="far fa-file-word word-icon `+custom_cls+`"></i>`;
    } else if (ext.indexOf("xls") != -1) {
        icon = `<i class="far fa-file-excel excel-icon `+custom_cls+`"></i>`;
    } else if (ext.indexOf("ppt") != -1) {
        icon = `<i class="far fa-file-powerpoint powerpoint-icon `+custom_cls+`"></i>`;
    } else if (ext == "zip") {
        icon = `<i class="far fa-file-archive common-icon `+custom_cls+`"></i>`;
    } else if ($.inArray(ext, ['jpg', 'jpeg', 'png', 'gif']) >= 0) {
        icon = `<i class="far fa-file-image common-icon `+custom_cls+`"></i>`;
    } else {
        icon = `<i class="far fa-file common-icon `+custom_cls+`"></i>`;
    }

    return icon;
}


function startRecording() {
	console.log("startRecording() called");
    var constraints = { audio: true, video:false }
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing WebAudioRecorder...");
		audioContext = new AudioContext();
		gumStream = stream;
		input = audioContext.createMediaStreamSource(stream);
		recorder = new WebAudioRecorder(input, {
		    workerDir: "{{STATIC_URL}}/vendor/web-audio-recorder/",
            encoding: 'mp3',
    		numChannels:2,
		    onEncoderLoading: function(recorder, encoding) {
		        console.log("Loading "+encoding+" encoder...");
		    },
		    onEncoderLoaded: function(recorder, encoding) {
		        console.log(encoding+" encoder loaded");
		    }
		});

		recorder.onComplete = function(recorder, blob) {
			console.log("Encoding complete");
            $('.message-audio').removeClass('recording-started');
            $('.mic-icon').tooltip('dispose');
            $('.mic-icon').tooltip({
                title: "Sending...",
                placement:"right",
                trigger:"manual",
            }).tooltip('show');
            var reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onload = function(event){

               var fd = {};
               fd["data"] = event.target.result;
               fd["csrftoken"] = '{{ csrf_token_ajax() }}';
               fd["recordingTime"] = recordingTime;
                $.ajax({
                    type: 'POST',
                    url: "{{ url('ajax-send-audio') }}",
                    data: fd,
                    success: function(data) {
                        if (data) {
                            if ($('.reply-msg-row').hasClass('reply-msg-row-show')) {
                                var new_msg_data = {}
                                new_msg_data['new_content'] = JSON.stringify(data);
                                new_msg_data['new_type'] = 7;

                                var msg_data = {};
                                msg_data['reply_message'] = JSON.parse($('.reply-msg-row').data('reply-content'));
                                msg_data['new_message'] = new_msg_data;
                                $(".close-reply-msg").trigger("click");
                                newMessage(JSON.stringify(msg_data), 8);

                            }else{
                                newMessage(JSON.stringify(data), 7);
                            }

                        }
                    },
                    complete: function(){
                        $('.mic-icon').tooltip('dispose');
                    }
                });
            };
		}

		recorder.setOptions({
            timeLimit:120,
            encodeAfterRecord:encodeAfterRecord,
            ogg: {quality: 0.5},
            mp3: {bitRate: 160}
	    });

		recorder.startRecording();
		console.log("Recording started");
        $('.message-audio').addClass('recording-started');

        $('.mic-icon').tooltip({
            placement:"right",
            trigger:"manual",
            html:true,
            sanitize:false,
            title:'<span class="rec-controlls"><i class="fa text-danger fa-times-circle rec-cancel"></i> <label id="minutes">00</label>:<label id="seconds">00</label> <i class="fa text-success fa-check-circle rec-stop"></i></span>'
        }).tooltip('show');

        $('.mic-icon').on('shown.bs.tooltip', function () {
            var minutesLabel = document.getElementById("minutes");
            var secondsLabel = document.getElementById("seconds");
            var totalSeconds = 0;
            setInterval(setTime, 1000);
            function setTime() {
              ++totalSeconds;
              secondsLabel.innerHTML = pad(totalSeconds % 60);
              minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
            }
            function pad(val) {
              var valString = val + "";
              if (valString.length < 2) {
                return "0" + valString;
              } else {
                return valString;
              }
            }
        });

	}).catch(function(err) {
        console.log(err);
        $('.message-audio').removeClass('recording');
        $('.message-audio').removeClass('recording-started');
	});

}

function stopRecording() {
	console.log("stopRecording() called");
	//stop microphone access
	gumStream.getAudioTracks()[0].stop();
    recordingTime = recorder.recordingTime();
	//tell the recorder to finish the recording (stop recording + encode the recorded audio)
	recorder.finishRecording();
	console.log('Recording stopped');
}

function cancelRecording() {
	console.log("cancelRecording() called");
	gumStream.getAudioTracks()[0].stop();
	recorder.cancelRecording();
    $('.message-audio').removeClass('recording-started');
    $('.mic-icon').tooltip('dispose');
	console.log('Recording cancelled');
}



function chatSearch(){
    var q = $("#search-query").val();
    var active_user = $("#active_user").val();
    var active_group = $("#active_group").val();
    var active_room = $("#active_room").val();
    if (q && q.length >= 1) {
        $.ajax({
            url: "{{ url('ajax-chat-search') }}",
            type: "POST",
            dataType: 'json',
            data: {
                q: q,
                csrftoken: '{{ csrf_token_ajax() }}',
                active_user: active_user,
                active_group: active_group,
                active_room: active_room
            },
            beforeSend: function() {
                $('.results').empty();
                loading(".search-panel","show");
            },
            success: function(data) {
                $.each(data.chats, function( index, obj ) {
                    var res_chat_time = moment(obj.time+system_timezone_offset).tz(user_timezone).fromNow();
                    res_chat_time = res_chat_time + " - " + moment(obj.time+system_timezone_offset).tz(user_timezone).format('YYYY-MM-DD HH:mm A');
                    if (obj.sender_id == {{USER.id}}) {
                        var res_name = 'You';
                    }else{
                        if (display_name_format == 'username') {
                        	var display_name = obj.user_name;
                        }else{
                        	var display_name = obj.first_name;
                        }
                        var res_name = display_name;
                    }
                    var res_msg = "";
                    if (obj.type==1) {
                        res_msg = obj.message;
                    }else if(obj.type == 2){
                        res_msg = "<i class='fa fa-image'></i> {{_('Shared an Image')}}";
                    }else if(obj.type == 3){
                        res_msg = "<i class='fa fa-image'></i> {{_('Shared a GIF')}}";
                    }else if(obj.type == 4){
                        res_msg = "<i class='fa fa-smile'></i> {{_('Shared a Sticker')}}";
                    }else if(obj.type == 5){
                        res_msg = "<i class='fa fa-link'></i> {{_('Shared a Link')}}";
                    }else if(obj.type == 6){
                        res_msg = "<i class='fa fa-file-alt'></i> {{_('Sent a File')}}";
                    }else if(obj.type == 7){
                        res_msg = "<i class='fa microphone-alt'></i> {{_('Sent an Audio Message')}}";
                    }else if(obj.type == 8){
                        if(JSON.parse(obj.message)['new_message']['new_type'] == 1){
                            res_msg = "Reply : "+JSON.parse(obj.message)['new_message']['new_content'];
                        }else if(JSON.parse(obj.message)['new_message']['new_type'] == 2){
                            res_msg = "Reply : <i class='fa fa-image'></i> {{_('Shared an Image')}}";
                        }else if(JSON.parse(obj.message)['new_message']['new_type'] == 3){
                            res_msg = "Reply : <i class='fa fa-image'></i> {{_('Shared a GIF')}}";
                        }else if(JSON.parse(obj.message)['new_message']['new_type'] == 4){
                            res_msg = "Reply : <i class='fa fa-smile'></i> {{_('Shared a Sticker')}}";
                        }else if(JSON.parse(obj.message)['new_message']['new_type'] == 5){
                            res_msg = "Reply : <i class='fa fa-link'></i> {{_('Shared a Link')}}";
                        }else if(JSON.parse(obj.message)['new_message']['new_type'] == 6){
                            res_msg = "Reply : <i class='fa fa-file-alt'></i> {{_('Sent a File')}}";
                        }else if(JSON.parse(obj.message)['new_message']['new_type'] == 7){
                            res_msg = "Reply : <i class='fa microphone-alt'></i> {{_('Sent an Audio Message')}}";
                        }
                    }
                    var result =
                    `<li class="result" data-chat-id="`+obj.id+`">
                        <div>
                            <p class="res-chat-time">`+res_chat_time+`</p>
                            <p class="res-chat-txt"><small><i><b>`+res_name+`:</b></i></small> `+res_msg+`</p>
                        </div>
                    </li>`;
                    $('.results').append(result);
                });

            },complete: function(){
                loading(".search-panel","hide");
            }
        });
    }else{
        $('.results').empty();
    }
}

function createOnlineUser(obj){
    if(obj.avatar) {
        var img_src = "{{MEDIA_URL}}/avatars/"+obj.avatar;
    }else{
        var img_src = "{{STATIC_URL}}/img/user.jpg";
    }

    var list_user_timezone = obj.timzone;
    var user_status_class = "offline";

    if(obj.online_status>0){
        if(obj.user_status == 1){
            user_status_class = "online";
        }else if(obj.user_status == 2){
            user_status_class = "offline";
        }else if(obj.user_status == 3){
            user_status_class = "busy";
        }else if(obj.user_status == 4){
            user_status_class = "away";
        }
    }else{
        user_status_class = "offline";
    }

    var last_msg = "Blocked";
    var last_message_time = "";
    var space_dot = "";
    var unread_count = "";
    var unread_count_html = "";
    var mute_icon = "";
    var sex = "";
    var country = "";
    var user_type = "";

    {% if SETTINGS.list_show_gender %}
    if (obj.sex != "") {
        if (obj.sex == 1) {
            sex = '<i class="fas fa-gender fa-mars"></i>';
        }else if(obj.sex == 2){
            sex = '<i class="fas fa-gender fa-venus"></i>';
        }else if(obj.sex == 3){
            sex = '<i class="fas fa-gender fa-genderless"></i>';
        }
    }
    {% endif %}

    {% if SETTINGS.list_show_user_type %}
    if (obj.user_type != "") {
        if (obj.user_type == 1) {
            user_type = "<span class='user-type-badge admin'>{{_('ADMIN')}}</span>";
        }else if(obj.user_type == 4){
            user_type = "<span class='user-type-badge mod'>{{_('MOD')}}</span>";
        }else if(obj.user_type == 2){
            var active_room_created_by = $('#active_room_created_by').val();
            if(active_room_created_by == obj.user_id){
                user_type = "<span class='user-type-badge creator'>{{_('CREATOR')}}</span>";
            }else if(obj.is_mod == 1){
                user_type = "<span class='user-type-badge room-mod'>{{_('MOD')}}</span>";
            }
        }
    }
    {% endif %}

    {% if SETTINGS.list_show_country %}
    if (obj.country !== undefined && obj.country !== null) {
        country = '<span class="flag-icon flag-icon-'+obj.country.toLowerCase()+'"></span>';
    }
    {% endif %}

    if(!obj.blocked_by_him && !obj.blocked_by_you){
        if(obj.last_message_status == 3){
            last_msg = "<i class='fa fa-ban'></i> {{_('')}}Deleted";
        }else if(obj.last_message_type == 1){
            last_msg = obj.last_message;
        }else if(obj.last_message_type == 2){
            last_msg = "<i class='fa fa-image'></i> {{_('Image')}}";
        }else if(obj.last_message_type == 3){
            last_msg = "<i class='fa fa-image'></i> {{_('GIF')}} ";
        }else if(obj.last_message_type == 4){
            last_msg = "<i class='fa fa-smile'></i> {{_('Sticker')}}";
        }else if(obj.last_message_type == 5){
            last_msg = "<i class='fa fa-link'></i> {{_('Link')}}";
        }else if(obj.last_message_type == 6){
            last_msg = "<i class='fa fa-file-alt'></i> {{_('File')}}";
        }else if(obj.last_message_type == 7){
            last_msg = "<i class='fa microphone-alt'></i> {{_('Audio')}} ";
        }else if(obj.last_message_type == 8){
            last_msg = "<i class='fa fa-reply'></i> {{_('Reply Message')}} ";
        }else if(obj.last_message_type == 9){
            last_msg = "<i class='fa fa-share'></i> {{_('Forwarded Message')}} ";
        }else{
            if (display_name_format == 'username') {
            	var display_name = obj.user_name;
            }else{
            	var display_name = obj.first_name;
            }
            last_msg = "{{_('Say hi to')}} " + display_name ;
        }

        last_message_time = "";
        space_dot = "";
        if(obj.last_message_time > 0){
            last_message_time = moment(obj.last_message_time+system_timezone_offset).tz(user_timezone).fromNow();
            space_dot = "·";
        }

        unread_count = 0;
        if(obj.unread_count ){
            unread_count = obj.unread_count;
        }

        unread_count_html = "";
        if(unread_count > 0){
            unread_count_html = `<span class="badge badge-danger badge-counter">` + unread_count + `</span>`;
        }
    }else if(obj.blocked_by_you){
        last_msg = "{{_('Blocked by you')}}";
    }else if(obj.blocked_by_him){
        last_msg = "{{_('Blocked by user')}}";
    }

    if(obj.is_muted){
        mute_icon = '<i class="fas fa-bell-slash"></i>';
    }

    if (display_name_format == 'username') {
        var display_name = obj.user_name;
    }else{
        var display_name = obj.first_name + ' ' + obj.last_name;
    }

    var chat_li =
    `<div id="" class="recent-chat chat-item" data-user-id="` + obj.user_id + `" data-user-name="` + obj.user_name + `">
        <div class="user-list-item ">
            <div class="user-avatar">
                <div class="online-status ` + user_status_class + `"><i class="fa fa-circle"></i></div>
                <img class="img-profile mr-2" src="`+img_src+`">
            </div>
            <div class="user-info">
                <div class="chat-name"><span class="chat-name-text">` + display_name + `</span> ` + sex + ` ` + country + ` `+ user_type+ ` `+ mute_icon+ ` </div>
                <div class="chat-preview">
                    <span class="chat-is-read">` + last_msg + `</span>
                    <div aria-hidden="true" class="spacer-dot">` + space_dot + `</div>
                    <abbr class="chat-time" data-utime="">` + last_message_time + `</abbr>
                </div>
                <div class="user-options">
                    <div class="dropdown">
                      <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                      </a>
                      <div class="dropdown-menu" >
                        <a class="dropdown-item view-profile" data-user-id="` + obj.user_id + `" href="#">{{_('View Profile')}}</a>
                      </div>
                    </div>
                </div>
            </div>
            <div class="chat-meta">` + unread_count_html + `</div>
        </div>
    </div>`;

    return chat_li;
}

function createForwardUser(obj){
    if(obj.avatar) {
        var img_src = "{{MEDIA_URL}}/avatars/"+obj.avatar;
    }else{
        var img_src = "{{STATIC_URL}}/img/user.jpg";
    }

    var list_user_timezone = obj.timzone;
    var user_status_class = "offline";

    if(obj.online_status>0){
        if(obj.user_status == 1){
            user_status_class = "online";
        }else if(obj.user_status == 2){
            user_status_class = "offline";
        }else if(obj.user_status == 3){
            user_status_class = "busy";
        }else if(obj.user_status == 4){
            user_status_class = "away";
        }
    }else{
        user_status_class = "offline";
    }

    var sex = "";
    var country = "";
    var user_type = "";

    {% if SETTINGS.list_show_gender %}
    if (obj.sex != "") {
        if (obj.sex == 1) {
            sex = '<i class="fas fa-gender fa-mars"></i>';
        }else if(obj.sex == 2){
            sex = '<i class="fas fa-gender fa-venus"></i>';
        }else if(obj.sex == 3){
            sex = '<i class="fas fa-gender fa-genderless"></i>';
        }
    }
    {% endif %}

    {% if SETTINGS.list_show_user_type %}
    if (obj.user_type != "") {
        if (obj.user_type == 1) {
            user_type = "<span class='user-type-badge admin'>{{_('ADMIN')}}</span>";
        }else if(obj.user_type == 4){
            user_type = "<span title='{{_('Global Moderator')}}' class='user-type-badge mod'>{{_('MOD')}}</span>";
        }else if(obj.user_type == 2){
            var active_room_created_by = $('#active_room_created_by').val();
            if(active_room_created_by == obj.user_id){
                user_type = "<span title='{{_('Room Creator')}}' class='user-type-badge creator'>{{_('CREATOR')}}</span>";
            }else if(obj.is_mod == 1){
                user_type = "<span title='{{_('Room Moderator')}}' class='user-type-badge room-mod'>{{_('MOD')}}</span>";
            }
        }
    }
    {% endif %}

    {% if SETTINGS.list_show_country %}
    if (obj.country !== undefined && obj.country !== null) {
        country = '<span class="flag-icon flag-icon-'+obj.country.toLowerCase()+'"></span>';
    }
    {% endif %}

    if (display_name_format == 'username') {
        var display_name = obj.user_name;
    }else{
        var display_name = obj.first_name + ' ' + obj.last_name;
    }

    var checked = "";
    if($.inArray(obj.user_id, forward_user_list) > -1){
        checked = "checked";
    }

    var chat_li =
    `<label id="" class="recent-chat " for="` + obj.user_id + `_0_chat" data-id="` + obj.user_id + `" data-name="` + display_name + `">
        <div class="channel-check">
            <input class="chat-list-check" `+checked+` type="checkbox" id="` + obj.user_id + `_0_chat" data-is-group=0 data-id="` + obj.user_id + `" data-name="` + display_name + `" name="forward_chat_list" />
        </div>
        <div class="user-list-item ">
            <div class="user-avatar">

                <img class="img-profile mr-2" src="`+img_src+`">
            </div>
            <div class="user-info">
                <div class="chat-name"><span class="chat-name-text">` + display_name + `</span> ` + sex + ` ` + country + ` `+ user_type+ ` </div>
                <div class="chat-preview">
                    <span class="chat-is-read ` + user_status_class + `"><i class="fa fa-circle"></i> ` + user_status_class + `</span>
                    <div aria-hidden="true" class="spacer-dot"></div>
                    <abbr class="chat-time" data-utime=""></abbr>
                </div>
            </div>
        </div>
    </label>`;

    return chat_li;
}

function roomUserSearch(){
    if($('.forward-modal').is(':visible')){
        forwardRoomUserSearch();
    }else{
        room_user_search_mode = true;
        var search_from = 'users';
        if ($('.fav-tab').hasClass('active')) {
            search_from = 'favs';
        }

        var q = $(".room-user-search").val();
        var active_room = $("#active_room").val();
        if (q && q.length >= 1) {
            $.ajax({
                url: "{{ url('ajax-room-user-search') }}",
                type: "POST",
                dataType: 'json',
                data: {
                    q: q,
                    csrftoken: '{{ csrf_token_ajax() }}',
                    active_room: active_room,
                    search_from: search_from,
                },
                beforeSend: function() {
                    loading(".online-list","show");
                },
                success: function(data) {
                    if (search_from == 'users') {
                        $(".online-list").empty();
                        if ('list' in data) {
                            $.each(data.list, function( index, obj ) {
                                var chat_li = createOnlineUser(obj);
                                $('.online-list').append(chat_li);
                            });
                        }
                    }else if (search_from == 'favs'){
                        $(".fav-list").empty();
                        if ('list' in data) {
                            $.each(data.list, function( index, obj ) {
                                var chat_li = createOnlineUser(obj);
                                if(obj.is_favourite && !obj.blocked_by_you){
                                    $('.fav-list').append(chat_li);
                                }
                            });
                        }
                    }

                },complete: function(){
                    loading(".online-list","hide");
                }
            });
        }else{
            loadActiveUsers();
            room_user_search_mode = false;
        }
    }
}

function forwardRoomUserSearch(){
    var search_from = 'users';
    var active_room = $("#active_room").val();

    var q = $(".forward-room-user-search").val();
    if (q && q.length >= 1) {
        $.ajax({
            url: "{{ url('ajax-room-user-search') }}",
            type: "POST",
            dataType: 'json',
            data: {
                q: q,
                csrftoken: '{{ csrf_token_ajax() }}',
                active_room: active_room,
                search_from: search_from
            },
            beforeSend: function() {
                loading(".forward-online-list","show");
            },
            success: function(data) {
                forwardActionDisplay();
                $('.forward-online-list').empty();
                if ('list' in data) {
                    $.each(data.list, function( index, obj ) {
                        var chat_li = createForwardUser(obj);
                        $('.forward-online-list').append(chat_li);
                    });
                }

            },complete: function(){
                // LetterAvatar.transform();
                loading(".forward-online-list","hide");
            }
        });
    }else{
        forwardUserList();
    }
}

function forwardUserList(){
    var active_room = $("#active_room").val();
    $.ajax({
        url: "{{ url('ajax-online-list') }}",
        type: "POST",
        dataType: 'json',
        data: {
            active_room: active_room,
            csrftoken: '{{ csrf_token_ajax() }}',
        },
        success: function(data) {
            // $('.forward-actions').addClass('hidden');
            forwardActionDisplay();
            $('.forward-modal').modal('show');

            $('.forward-online-list').empty();
            if ('default_group' in data) {
                var unread_count_html = "";
                var group_mute_icon = "";
                if(data.default_group.unread_count > 0){
                    unread_count_html = `<span class="badge badge-danger badge-counter">` + data.default_group.unread_count + `</span>`;
                }
                if(data.default_group.is_muted){
                    group_mute_icon = `<i class="fas fa-bell-slash"></i>`;
                }
                var room_checked = "";
                if($.inArray(data.default_group.chat_group, forward_group_list) > -1){
                    room_checked = "checked";
                }
                var group_li =
                `<label id="" class="recent-chat " for="` + data.default_group.chat_group + `_1_chat" data-id="` + data.default_group.chat_group + `" data-name="` + data.default_group.name + `">
                    <div class="channel-check">
                        <input class="chat-list-check" `+room_checked+` type="checkbox" id="` + data.default_group.chat_group+ `_1_chat" data-is-group=1 data-id="` + data.default_group.chat_group + `" data-name="` + data.default_group.name + `" name="forward_chat_list" />
                    </div>
                    <div class="user-list-item ">
                        <div class="user-avatar">
                            <img class="img-profile mr-2" src="` + data.default_group.cover_url + `">
                        </div>
                        <div class="user-info">
                            <div class="chat-name">` + data.default_group.name + ` ` + group_mute_icon + `</div>
                            <div class="chat-preview">
                                ` + data.default_group.room_data.name + ` {{_('Chat Room')}}
                            </div>
                        </div>
                        <div class="chat-meta">` + unread_count_html + `</div>
                    </div>
                </label>`;

                $('.forward-online-list').append(group_li);

            }


            if ('list' in data) {

                $.each(data.list, function( index, obj ) {
                    var chat_li = createForwardUser(obj);
                    $('.forward-online-list').append(chat_li);
                });

                // if(parseInt($('#chat_room_user_count').val()) > 21){
                //     $('.load-more-users').show();
                // }
            }
        },
        complete: function(){
        }
    });
}

function forwardActionDisplay(){
    var selected_chat_item_count = forward_chat_item.length;
    var forward_html = "";
    if(selected_chat_item_count > 0){
        $('.forward-actions').removeClass('hidden');
        if(selected_chat_item_count == 1){
            forward_html = forward_chat_item[0];
        }else if (selected_chat_item_count > 1) {
            forward_html = forward_chat_item[0] + " & " + (selected_chat_item_count-1) + " other(s)";
        }
        $('.forward-name').html(forward_html);
    }else{
        $('.forward-actions').addClass('hidden');
    }
}

function roomListStatus(){
    if(!room_status_mode){
        $.ajax({
            url: "{{ url('ajax-room-list-status') }}",
            type: "POST",
            dataType: 'json',
            data: {
                csrftoken: '{{ csrf_token_ajax() }}',
            },
            beforeSend: function() {
                room_status_mode = true;
            },
            success: function(data) {
                var total_unread = 0;
                if ('chat_rooms' in data) {
                    $.each(data.chat_rooms, function( index, obj ) {
                        if(obj.unread_count){
                            total_unread += obj.unread_count;
                        }
                        if ($('#room-selector').find("option[value='" + obj.id + "']").length) {
                            $('#room-selector').find("option[value='" + obj.id + "']").data('unread', obj.unread_count).data('users', obj.users_count);
                        }
                    });
                }
                if(total_unread > 0){
                    $('.badge-all-unread').html(total_unread);
                }else{
                    $('.badge-all-unread').empty();
                }

            },complete: function(){
                room_status_mode = false;
                $("#room-selector").select2({
                    templateResult: formatRoomOptions,
                    theme: 'bootstrap4'
                });
            }
        });
    }
}

function formatRoomOptions (room_selection) {
    var unread = $('#room-selector').find("option[value='" + room_selection.id + "']").data('unread');
    var users = $('#room-selector').find("option[value='" + room_selection.id + "']").data('users');
    var unread_badge = "";
    if(unread){
        unread_badge = '<span class="badge badge-danger badge-unread">'+unread+'</span>';
    }

    if(users){
        var user_count = ' <span class="badge badge-secondary">'+users+' <i class="fas fa-users"></i></span>';
    }else{
        if(users === 'null'){
            var user_count = ' <span class="badge badge-secondary">0 <i class="fas fa-users"></i></span>';
        }else{
            var user_count = '';
        }
    }

    var $room_selection = $('<span>' + room_selection.text + user_count + unread_badge+'</span>');
    return $room_selection;
};




function getRecentMedia(is_load_more=false){
    $('.selected-chat').hide();
    $('.recent-panel').show();

    var active_user = $("#active_user").val();
    var active_room = $("#active_room").val();
    var active_group = $("#active_group").val();
    var selected_media_type = $('.recent-max-items .active').data('type');

    $.ajax({
        url: "{{ url('ajax-get-recent') }}",
        type: "POST",
        dataType: 'json',
        data: {
            selected_media_type: selected_media_type,
            active_user: active_user,
            active_room: active_room,
            is_load_more: is_load_more,
            active_group: active_group,
            csrftoken: '{{ csrf_token_ajax() }}',
        },
        success: function(data) {
            if (selected_media_type == 2) { //images
                var recent_img_chat = ``;
                $.each(data.shared_media, function(all_img_idx, all_img_obj) {
                    $.each(JSON.parse(all_img_obj), function(img_idx, img_obj) {
                        var image_size_str = img_obj.split('_');
                        var image_size = "600x600";
                        if (image_size_str[1] !== undefined) {
                            image_size = image_size_str[1].substring(0, image_size_str[1].indexOf("."))
                        }

                        var each_img = `<figure class="col-3 recent-img">
                                        <a  href="{{MEDIA_URL}}/chats/images/large/`+img_obj+`" data-size="`+image_size+`">
                                            <img class="img-responsive" src="{{MEDIA_URL}}/chats/images/thumb/`+img_obj+`" />
                                        </a>
                                    </figure>`;
                        recent_img_chat = recent_img_chat + each_img;
                    });
                });
                if (is_load_more==false) {
                    $('#recent-max-media .row').html(recent_img_chat);
                }else{
                    $('#recent-max-media .row').append(recent_img_chat);
                }
                initPhotoSwipeFromDOM('#recent-max-media .row');


            }else if(selected_media_type == 6){ //files
                var recent_file_chat = ``;
                $.each(data.shared_media, function(all_file_idx, all_file_obj) {
                    $.each(JSON.parse(all_file_obj), function(file_idx, file_obj) {
                        var file_icon = getFileIcon(file_obj.extenstion, 'file-icon');
                        var each_file = `<div class="chat-files-block">
                            <div class="file-section">
                                <a href="#" class="file-header">
                                    `+file_icon+`
                                    <div class="file-description">
                                        <span class="file-title" dir="auto">`+file_obj.name+`</span>
                                        <div class="file-meta">
                                            <div class="file-meta-entry">
                                                <div class="file-meta-swap">`+file_obj.size+` `+file_obj.extenstion+` file</div>
                                            </div>
                                        </div>
                                    </div>

                                </a>
                                <div class="file-actions">
                                    <a href="{{MEDIA_URL}}/chats/files/`+file_obj.name+`" download="`+file_obj.name+`" class="file-action-buttons">
                                        <i class="fas fa-download file-download-icon"  aria-hidden="true"></i>
                                    </a>
                                </div>

                            </div>
                        </div>`;
                        recent_file_chat = recent_file_chat + each_file;
                    });
                });
                if (is_load_more==false) {
                    $('#recent-max-files .row').html(recent_file_chat);
                }else{
                    $('#recent-max-files .row').append(recent_file_chat);
                }

            }else if(selected_media_type == 5){ //links
                var recent_links_chat = ``;
                $.each(data.shared_media, function(all_links_idx, link_obj) {
                    link_obj = JSON.parse(link_obj)
                    if (!link_obj.image) {
                        var img_link = '{{STATIC_URL}}/img/default-image.png';
                    }else{
                        var img_link = link_obj.image;
                    }
                    var each_link = `<div class="chat-files-block">
                        <div class="file-section">
                            <a href="`+link_obj.url+`" target="_blank" class="file-header">
                                <img class="recent-link-preview" src="`+img_link+`" />
                                <div class="file-description">
                                    <span class="file-title" dir="auto">`+link_obj.title+`</span>
                                    <div class="file-meta">
                                        <div class="file-meta-entry">
                                            <div class="file-meta-swap">`+link_obj.message+` file</div>
                                        </div>
                                    </div>
                                </div>

                            </a>
                            <div class="file-actions">
                                <a href="`+link_obj.url+`" target="_blank" class="file-action-buttons">
                                    <i class="fas fa-external-link-alt file-download-icon"  aria-hidden="true"></i>
                                </a>
                            </div>

                        </div>
                    </div>`;
                    recent_links_chat = recent_links_chat + each_link;
                });
                if (is_load_more==false) {
                    $('#recent-max-links .row').html(recent_links_chat);
                }else{
                    $('#recent-max-links .row').append(recent_links_chat);
                }
            }
        },
        complete: function(){

        }
    });

}


// init dropzone for file upload
Dropzone.autoDiscover = false;
var imageDropzone = new Dropzone("#image_dropzone", {
    url: "{{ url('ajax-send-images') }}",
    autoProcessQueue: false,
    addRemoveLinks: true,
    uploadMultiple: true,
    parallelUploads: 8,
	timeout: 180000,
	maxFiles: 8,
    maxFilesize:{{SETTINGS.post_max_size/1024/1024}},
    acceptedFiles: 'image/*',
    init: function () {
        this.on("sendingmultiple", function(file, xhr, data) {
            var active_user = $("#active_user").val();
            var active_group = $("#active_group").val();
            var active_room = $("#active_room").val();
            if (active_user) {
                active_group = null;
            }
            data.append("active_user", active_user);
            data.append("active_group", active_group);
            data.append("active_room", active_room);
            data.append("csrftoken", '{{ csrf_token_ajax() }}');
        });
        this.on('successmultiple', function(files, response) {

            imageDropzone.removeAllFiles();
            if ($('.reply-msg-row').hasClass('reply-msg-row-show')) {

                var new_msg_data = {}
                new_msg_data['new_content'] = response;
                new_msg_data['new_type'] = 2;

                var msg_data = {};
                msg_data['reply_message'] = JSON.parse($('.reply-msg-row').data('reply-content'));
                msg_data['new_message'] = new_msg_data;
                $(".close-reply-msg").trigger("click");
                newMessage(JSON.stringify(msg_data), 8);

            }else{
                newMessage(response, 2);
            }


            $('.chats').show();
            $('#image_dropzone').hide();
            $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
            if (is_nicescroll) {
                $(".chat-scroll").getNiceScroll().resize();
            }
        })
    }
});

var acceptedFiles = '';
{% if SETTINGS.enable_files %}
    acceptedFiles += '{{SETTINGS.enable_file_list}}';
{% endif %}
var fileDropzone = new Dropzone("#file_dropzone", {
    url: "{{ url('ajax-send-files') }}",
    autoProcessQueue: false,
    addRemoveLinks: true,
    uploadMultiple: true,
    maxFilesize:{{SETTINGS.post_max_size/1024/1024}},
    parallelUploads: 8,
	timeout: 180000,
	maxFiles: 8,
    acceptedFiles: acceptedFiles,
    init: function () {
        this.on("sendingmultiple", function(file, xhr, data) {
            var active_user = $("#active_user").val();
            var active_group = $("#active_group").val();
            var active_room = $("#active_room").val();
            if (active_user) {
                active_group = null;
            }
            data.append("active_user", active_user);
            data.append("active_group", active_group);
            data.append("active_room", active_room);
            data.append("csrftoken", '{{ csrf_token_ajax() }}');
        });
        this.on('successmultiple', function(files, response) {

            fileDropzone.removeAllFiles();
            if ($('.reply-msg-row').hasClass('reply-msg-row-show')) {
                var new_msg_data = {}
                new_msg_data['new_content'] = response;
                new_msg_data['new_type'] = 6;

                var msg_data = {};
                msg_data['reply_message'] = JSON.parse($('.reply-msg-row').data('reply-content'));
                msg_data['new_message'] = new_msg_data;
                $(".close-reply-msg").trigger("click");
                newMessage(JSON.stringify(msg_data), 8);

            }else{
                newMessage(response, 6);
            }
            $('.chats').show();
            $('#file_dropzone').hide();
            $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
            if (is_nicescroll) {
                $(".chat-scroll").getNiceScroll().resize();
            }
        })
    }
});

fileDropzone.on('addedfile', function(file) {

    var ext = file.name.split('.').pop();
    var ext_list = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "zip"];
    if(ext_list.includes(ext)){
        var icon = getFileIcon(ext, 'font-120');
        $(file.previewElement).addClass('dz-known-file-preview');
        $(file.previewElement).find(".dz-image").replaceWith(icon);
    }
});

// Functions to run when document is ready
$( document ).ready(function() {
    var url = new URL(window.location.href);
    var view_as = url.searchParams.get("view-as");
    if(view_as){
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            if(options.url.includes("?")){
                options.url = options.url + '&view-as='+view_as;
            }else{
                options.url = options.url + '?view-as='+view_as;
            }
        });
    }

    // loader display when message loading
    loading(".messages ","show");

    var active_user = "";
    var active_group = $("#active_group").val();
    var active_room = $("#active_room").val();

    loadActiveUsers();
    roomListStatus();

    //Init lazy Load
    $(function() {
        $('.lazy').Lazy();
    });

    // Fire nice scroll
    if (is_nicescroll) {
        $(".online-list, .chat-scroll, .selected-chat").niceScroll({
            autohidemode:false,
            cursorwidth:'5px',
            cursorborder:'none',
            cursorborderradius: '0px',
            horizrailenabled:false,
        });
    }



    // Left side online chat list show/hide
    $(".chat-list-toggle").on('click', function(e) {

        var aexpo1 = 'easeOutExpo';
        var aexpo2 = 'easeInExpo';
        var adirection = 'left';
        if($('html').hasClass('rtl')){
            aexpo1 = 'easeInExpo';
            aexpo2 = 'easeOutExpo';
            adirection = 'right';
        }

        $(".panel-content").hide( "blind", {direction : adirection, easing: aexpo1}, 500);
        $(".panel-content").show( "blind", {direction : adirection, easing: aexpo2}, 500);

        if ($(window).width() <= 576) {

            $(".chat-list-col").toggleClass("col-3 col-12", 500, "easeOutExpo");
            $(".chat-list-col").toggleClass("adjust-height");
            $(".chat-list-col").toggleClass("mobile-mini-user-list");
            $(".mobile-chat-list-toggle").toggle();

            if($('.chat-list-col').hasClass('mobile-mini-user-list')){
                $(".status-change").show();
                $(".nav-sidebar").css('display','flex');
                $(".nav-sidebar-mobile").hide();
            }else{
                $(".status-change").hide();
                $(".nav-sidebar").hide();
                $(".nav-sidebar-mobile").show();
            }

        }else if($(window).width() <= 768){

            $(".chat-list-col").toggleClass("col-3 col-12", 500, "easeOutExpo");
            $(".chat-list-col").toggleClass("adjust-height");
            $(".chat-list-col").toggleClass("mobile-mini-user-list");
            $(".mobile-chat-list-toggle").toggle();

            if($('.chat-list-col').hasClass('mobile-mini-user-list')){
                $(".nav-sidebar").css('display','flex');
                $(".nav-sidebar-mobile").hide();
                $(".status-change").show();
                $(".selected-chat-toggle").hide();
            }else{
                $(".nav-sidebar").hide();
                $(".nav-sidebar-mobile").show();
                $(".status-change").hide();
                $(".selected-chat-toggle").show();
            }

            $(".chat-messages-col").show();
            $(".selected-chat-col").hide();

        }else{
            $(".status-change").toggle();

            $(".logo img.large").toggle();

            if($(".logo img.small").is(":visible")){
                $(".logo img.small").hide();
            }else{
                setTimeout(function(){ $(".logo img.small").show(); }, 500);

            }
            if($(".nav-sidebar").is(":visible")){
                $(".nav-sidebar").hide();
            }else{
                $(".nav-sidebar").css('display','flex');
            }
            $(".chat-list-col").toggleClass("mini-user-list", 500, "easeOutExpo");
        }

        // resize nice scroll after toggle and animations
        if (is_nicescroll) {
            setTimeout(function(){ $(".online-list").getNiceScroll().resize(); }, 502);
        }


    });

    // when window resizes adopt the chat screen
    $(window).on('resize', function(){
        if ($(window).width() > 768) {

            if($('.chat-list-col').hasClass('mini-user-list')){
                $(".nav-sidebar").hide();
            }else{
                if($('.chat-list-col').hasClass('mobile-mini-user-list')){
                    $(".nav-sidebar").show();
                }else{
                    $(".nav-sidebar").hide();
                    $(".logo img.small").hide();
                }
                $(".status-change").show();
                $(".logo img.large").show();
                $(".nav-sidebar").css('display','flex');
            }
            $(".chat-messages-col").show();
            $(".selected-chat-col").removeClass("col-10");
            $(".selected-chat-col").show();
            $(".mobile-chat-list-toggle").hide();
        }else if($(window).width() <= 768){

            $(".status-change").hide();
            $('.chat-list-col').removeClass('mini-user-list');
            if($('.chat-list-col').hasClass('mobile-mini-user-list')){
                $(".nav-sidebar").show();
                $(".status-change").show();
            }else{
                $(".nav-sidebar").hide();
                $(".logo img.small").show();
            }

            $(".chat-messages-col").show();
            $(".selected-chat-col").hide();
            $(".selected-chat-toggle.enable-selected-chat").show();
        }
    });

    // send gif, send stickers button show or hide
    $(".buttons-showhide").on('click', function(e) {
        $(".buttons-showhide i").toggleClass("fa-chevron-left fa-chevron-right");
        if ($("#hidable-btns").is(":visible")) {
            $("#hidable-btns").hide();
            $(".chat-buttons").css("flex", "60px");
            $(".chat-box").css("flex", "89%");
        }else{
            $("#hidable-btns").show();
            $(".chat-buttons").css("flex", "150px");
            $(".chat-box").css("flex", "76%");
        }
    });

    // selected/active chat information show or hide
    $(".selected-chat-toggle").on('click', function(e) {

        var adirection = 'right';
        if($('html').hasClass('rtl')){
            var adirection = 'left';
        }

        $(".selected-chat-toggle").css('pointer-events','none');
        setTimeout(function(){ $(".selected-chat-toggle").css('pointer-events','auto'); }, 502);

        if (($(window).width() <= 1024) && ($(window).width() > 768 )) {
            if($(".selected-chat-col").is(":visible")){
                $(".selected-chat-col").hide( "blind", {direction : adirection, easing: 'easeOutExpo'}, 500);
            }else{
                $(".selected-chat-col").show("blind", {direction : adirection,  easing: 'easeOutExpo'}, 500);
            }
        }else if ($(window).width() <= 768) {
            $(".chat-messages-col").toggle();
            if($(".selected-chat-col").is(":visible")){
                $(".selected-chat-col").hide( "blind", {direction : adirection, easing: 'easeOutExpo'}, 500);
                $(".selected-chat-col").removeClass("col-10");
            }else{
                $(".selected-chat-col").addClass("col-10");
                $(".selected-chat-col").show("blind", {direction : adirection,  easing: 'easeOutExpo'}, 500);
            }
        } else {
            if($(".selected-chat-col").is(":visible")){
                $(".selected-chat-col").hide( "blind", {direction : adirection, easing: 'easeOutExpo'}, 500);
            }else{
                $(".selected-chat-col").show( "blind", {direction : adirection,  easing: 'easeInOutQuint'}, 500);
            }
        }
        $(".enable-selected-chat").toggle();

        // after toggle destroy nicescroll and reinit
        if (is_nicescroll) {
            setTimeout(function(){
                $(".selected-chat, .chat-scroll").getNiceScroll().remove();
                 $(".selected-chat, .chat-scroll").niceScroll({
                     autohidemode:false,
                     cursorwidth:'5px',
                     cursorborder:'none',
                     cursorborderradius: '0px',
                     horizrailenabled:false,
                 });
            }, 502);
        }
    });

    // selected chat info each section show or hide
    $(".chat-data-header").on('click', function(e) {
        $(this).find(".dropdown i").toggleClass("fa-angle-down fa-angle-right");
    });

    // init tooptip
    $(".btn-msg, .btn-tooltip").tooltip();

    // init send gif popover
    $(".message-gif").popover({
        html : true,
        sanitize: false,
        trigger: "click",
        content: $('.gif-content').html(),
        placement: 'top',
        title: `<div class="input-group input-group-sm gif-search-area">
                  <input type="text" class="form-control gif-search-input" placeholder="Search GIFs via Tenor" style="z-index:0">
                  <div class="input-group-append">
                      <button class="btn btn-success gif-search-btn" type="button">Go</button>
                   </div>
                </div>
                <button type="button" id="close-popover" class="close close-popover gif-close-btn" ><i class="fas fa-times"></i></button>`,
    });

    // init send sticker popover
    $(".message-sticker").popover({
        html : true,
        sanitize: false,
        trigger: "click",
        content: $('.sticker-content').remove().html(),
        title : '<div class="send-sticker-txt">Send Stickers</div> <button type="button" id="close-popover" class="close close-popover" ><i class="fas fa-times"></i></button>',
        placement: 'top',
    });

    // after gif popover show functions
    $('.message-gif').on('show.bs.popover', function () {
        $('.chats').show();
        $('.dropzone').hide();
        $('.message-sticker').popover('hide');
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
    });

    // gif popover shown functions
    $('.message-gif').on('shown.bs.popover', function () {
        var results = get_gifs(tenor_api_key, tenor_gif_limit, "");
    });

    // gif search functions
    $(document).on('click', '.gif-search-btn', function(e) {
        var q = $('.gif-search-input').val();
        get_gifs(tenor_api_key, tenor_gif_limit, q);
    });

    // gif send functions
    $(document).on('click', '.send-gif', function(e) {
        var gif_url = $(this).data('gif');
        if ($('.reply-msg-row').hasClass('reply-msg-row-show')) {
            var new_msg_data = {}
            new_msg_data['new_content'] = gif_url;
            new_msg_data['new_type'] = 3;

            var msg_data = {};
            msg_data['reply_message'] = JSON.parse($('.reply-msg-row').data('reply-content'));
            msg_data['new_message'] = new_msg_data;
            $(".close-reply-msg").trigger("click");
            newMessage(JSON.stringify(msg_data), 8);
        }else{
            newMessage(gif_url, 3);
        }
    });

    // stickers send functions
    $(document).on('click', '.send-sticker', function(e) {
        var sticker_url = $(this).data('sticker');
        if ($('.reply-msg-row').hasClass('reply-msg-row-show')) {
            var new_msg_data = {}
            new_msg_data['new_content'] = sticker_url;
            new_msg_data['new_type'] = 4;

            var msg_data = {};
            msg_data['reply_message'] = JSON.parse($('.reply-msg-row').data('reply-content'));
            msg_data['new_message'] = new_msg_data;
            $(".close-reply-msg").trigger("click");
            newMessage(JSON.stringify(msg_data), 8);
        }else{
            newMessage(sticker_url, 4);
        }
    });

    // after sticker popover show functions
    $('.message-sticker').on('show.bs.popover', function () {
        $(".sticker-nav").empty();
        $(".sticker-tab-content").empty();
        $('.chats').show();
        $('.dropzone').hide();
        $('.message-gif').popover('hide');
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
    });

    // sticker popover shown functions
    $('.message-sticker').on('shown.bs.popover', function () {
        get_strickers();
    });


    // click link on chat message
    $(document).on('click', '.chat-link-block a', function(e) {
        var clicked_link = $(this).attr('href');
        var a = document.createElement('a');
        a.href = clicked_link;
        var hostname = a.hostname;
        if (hostname == 'www.youtube.com' || hostname == 'youtube.com' || hostname == 'youtu.be') {
            var videoid = youtube_parser(clicked_link);
            if(videoid) {
                e.preventDefault();
                var embedlink = "https://www.youtube.com/embed/" + videoid + '?autoplay=1';
                $("#video-iframe").attr('src', embedlink);
                $("#video-modal").modal();
            }
        }
    });

    // video modal hide function
    $("#video-modal").on('hide.bs.modal', function(){
       $("#video-iframe").attr('src', "{{STATIC_URL}}/img/loading-video.gif");
    });

    // click image send button
    $(document).on('click', '.message-images', function(e) {
        if ($('#image_dropzone').is(':visible') ){
            $('#image_dropzone').hide();
            $('.chats').show();
        }else{
            $('#image_dropzone').show();
            $('.chats').hide();
        }

        $('#file_dropzone').hide();
        $('.message-sticker, .message-gif').popover('hide');
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
        if (is_nicescroll) {
            $(".chat-scroll").getNiceScroll().resize();
        }
    });

    // click file send button
    $(document).on('click', '.message-files', function(e) {
        if ($('#file_dropzone').is(':visible') ){
            $('#file_dropzone').hide();
            $('.chats').show();
        }else{
            $('#file_dropzone').show();
            $('.chats').hide();
        }

        $('#image_dropzone').hide();
        $('.message-sticker, .message-gif').popover('hide');
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
        if (is_nicescroll) {
            $(".chat-scroll").getNiceScroll().resize();
        }
    });

    $(document).on('click', '.close-dropzone', function(e) {
        $('.chats').toggle();
        $('.dropzone').toggle();
        $('.message-sticker, .message-gif').popover('hide');
        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);
        if (is_nicescroll) {
            $(".chat-scroll").getNiceScroll().resize();
        }
    });

    // popover close button
    $(document).on('click','.close-popover',function(){
        $('.message-sticker, .message-gif').popover('hide');
    });

    // send selected image
    $('.send-images').on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        imageDropzone.processQueue();
    });

    // send selected files
    $('.send-files').on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        fileDropzone.processQueue();
    });

    {% if SETTINGS.enable_files or SETTINGS.enable_images %}
        // Drag enter
        $('.chat-scroll').on('dragover, dragenter', function (e) {
            e.stopPropagation();
            e.preventDefault();

            $('.chats').toggle();
            $('#image_dropzone').toggle();
            $('.message-sticker, .message-gif').popover('hide');
        });
    {% endif %}

    // mobile sidebar show or minimize
    $(document).on('click', '.mobile-sidebar-toggle', function(e) {
        $(this).removeClass('active');
        var icon_class = $(this).find('i').attr("class");
        $('.mobile-sidebar-icon > i').removeClass().addClass(icon_class);
    });

    // favourite or unfavourite the selected chat user
    $(document).on('click', '.active-user-favourite', function(e) {
        var current_status = $(this).attr("data-is-favourite");
        changeActiveUserRestriction('is_favourite', current_status);
    });

    // block or unblock the selected chat user
    $(document).on('click', '.active-user-block', function(e) {
        var current_status = $(this).attr("data-is-blocked");
        changeActiveUserRestriction('is_blocked', current_status);
    });

    // mute or unmute the selected chat user
    $(document).on('click', '.active-user-mute', function(e) {
        var current_status = $(this).attr("data-is-muted");
        changeActiveUserRestriction('is_muted', current_status);
    });

    // mute or unmute the selected chat group
    $(document).on('click', '.active-group-mute', function(e) {
        var current_status = $(this).attr("data-is-muted");
        changeActiveGroupRestriction('is_muted', current_status);
    });

    // delete message
    $(document).on('click', '.message-delete', function(e) {
        var message_id = $(this).parent().parent().attr('id');
        var chat_type = $(this).data("chat-type");
        $.ajax({
            url: "{{ url('ajax-delete-message') }}",
            type: "POST",
            dataType: 'json',
            data: {
                csrftoken: '{{ csrf_token_ajax() }}',
                message_id: message_id,
                chat_type: chat_type
            },
            beforeSend: function() {
                loading(".messages","show");
            },
            success: function(data) {
                if(data.success){
                    $('#'+message_id).find('.message-html').html(`<div class="chat-txt deleted"><i class="fa fa-ban"></i> {{_('This message was deleted')}}</div>`);
                    $('#'+message_id).find('.chat-actions').html(``);
                    $('#'+message_id).find('.message-status').html(``);
                }
            },complete: function(){
                loading(".messages","hide");
            }

        });
    });

    // reply message
    $(document).on('click', '.message-reply', function(e) {
        var reply_msg_id = $(this).parent().parent().attr('id');
        var chat_type = $(this).data("chat-type");

        $.ajax({
            url: "{{ url('ajax-get-message') }}",
            type: "POST",
            dataType: 'json',
            data: {
                csrftoken: '{{ csrf_token_ajax() }}',
                chat_id: reply_msg_id,
                chat_type:chat_type
            },
            beforeSend: function() {
                loading(".messages","show");
            },
            success: function(data) {
                if(data.type == 8){
                    var replied_type = JSON.parse(data.message)['new_message']['new_type'];
                    if(replied_type == 5){
                        var replied_content = JSON.stringify(JSON.parse(data.message)['new_message']['new_content']);
                    }else{
                        var replied_content = JSON.parse(data.message)['new_message']['new_content'];
                    }
                }else if(data.type == 9){
                    var replied_type = JSON.parse(data.message)['type'];
                    if(replied_type == 5){
                        var replied_content = JSON.stringify(JSON.parse(data.message)['message']);
                    }else{
                        var replied_content = JSON.parse(data.message)['message'];
                    }
                }else{
                    var replied_content = data.message;
                    var replied_type = data.type;
                }

                var replied_data = JSON.parse(repliedMessage(replied_content, replied_type));
                var replied_html = replied_data['current_message'];
                var replied_preview = replied_data['current_preview'];

                var replied_to_id = data.sender_id;
                if (display_name_format == 'username') {
                	var display_name = data.user_name;
                    var replied_to_short = data.user_name;
                }else{
                	var display_name = data.first_name + ' ' + data.last_name;
                    var replied_to_short = data.first_name;
                }
                if(data.sender_id == {{ USER.id }}){
                    var replied_to = "{{_('Reply to your chat')}}";
                }else{
                    var replied_to = "{{_('Reply to')}} "+ display_name +"'s {{_('chat')}}";
                }

                var reply_data = {};
                reply_data['reply_id'] = reply_msg_id;
                reply_data['reply_content'] = replied_content;
                reply_data['reply_type'] = replied_type;
                reply_data['reply_from'] = replied_to_short;
                reply_data['reply_from_id'] = replied_to_id;
                $('.reply-msg-row').data('reply-content', JSON.stringify(reply_data));

                $('.reply-msg-row .replied-user').html(replied_to);
                $('.reply-msg-row .replied-html').html(replied_html);
                $('.reply-msg-row .replied-preview').html(replied_preview);


                $('.reply-msg-row').addClass('reply-msg-row-show');
                $('.reply-msg-row').removeClass('reply-msg-row-hide');


            },complete: function(){
                loading(".messages","hide");
            }

        });
    });

    // close reply message
    $(document).on('click', '.close-reply-msg', function(e) {
        $('.reply-msg-row').addClass('reply-msg-row-hide');
        $('.reply-msg-row').removeClass('reply-msg-row-show');

        $('.reply-msg-row .replied-user').html("");
        $('.reply-msg-row .replied-html').html("");
        $('.reply-msg-row .replied-preview').html("");

        $('.reply-msg-row').data('reply-content', "");
    });

    // chat area scroll
    $('.chat-scroll').on('scroll', function() {
        if ($(this).scrollTop() == 0 && can_scroll_up == true){
            previous_height = $(this)[0].scrollHeight;
            console.log("load_more_chats('up')");
            load_more_chats('up');
        }
        if(($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) && can_scroll_down == true) {
            console.log("load_more_chats('down')");
            load_more_chats('down');
        }
    });


    // init emoji with chat area

    var emo_dir = 'ltr';
    if($('html').hasClass('rtl')){
        var emo_dir = 'rtl';
    }

    $("#message_content").emojioneArea({
        pickerPosition: "top",
        tonesStyle: "radio",
        inline: false,
        tones: false,
        search: false,
        saveEmojisAs: "shortname",
        hidePickerOnBlur: true,
        attributes:{
            dir: emo_dir,
        },
        events: {
            keypress: function (editor, event) {
                if (isMobile==false && event.keyCode  == 13) {
                   var content = $.sanitize(this.getText());
                   if(event.shiftKey){
                       event.stopPropagation();
                   } else {
                        event.preventDefault();
                        if (this.getText() != "") {
                            if (content.length < max_message_length) {
                                if ($('.reply-msg-row').hasClass('reply-msg-row-show')) {
                                    var new_msg_data = {}
                                    new_msg_data['new_content'] = content;
                                    new_msg_data['new_type'] = 1;

                                    var msg_data = {};
                                    msg_data['reply_message'] = JSON.parse($('.reply-msg-row').data('reply-content'));
                                    msg_data['new_message'] = new_msg_data;
                                    $(".close-reply-msg").trigger("click");
                                    newMessage(JSON.stringify(msg_data), 8);

                                }else{
                                    newMessage(content, 1);
                                }
                            }else{
                                alert("{{_('Sorry, Your message is too long!')}}")
                            }
                        }
                   }
                }
                updateLastTypedTime();
            },
            click: function (editor, event) {
                if ($(window).width() < 425) {
                   $( ".buttons-showhide" ).trigger( "click" );
                }
            },
            blur: function (editor, event) {
                refreshTypingStatus();
                if ($(window).width() < 425) {
                   $( ".buttons-showhide" ).trigger( "click" );
                }
            },
            ready: function (editor, event) {
                if ($('#active_user').val() != "") {
                    var load_chat_user = $('#active_user').val();
                }else{
                     var load_chat_user = active_user;
                }
                loadChats(load_chat_user, active_group, active_room);
            }
        }
    });

    // click recent room chat or individual chat
    $(document).on('click', '.chat-item', function(e) {
        chat_search_mode = false;
        var active_user = $(this).data("user-id");
        var active_user_name = $(this).data("user-name");
        var active_group = $("#active_group").val();
        var active_room = $("#active_room").val();
        $(".close-reply-msg").trigger("click");
        loadChats(active_user, active_group, active_room);

        if(view_as){
            var view_as_url = '?view-as='+view_as;
        }else{
            var view_as_url = '';
        }

        if (active_user_name) {
            if ($("#chat_room_url").val()!="" && history.pushState) {
                history.pushState(null, null, $("#chat_room_url").val()+"/"+active_user_name+view_as_url);
            }
        }else{
            if(history.pushState) {
                history.pushState(null, null, $("#chat_room_url").val()+view_as_url);
            }
        }

        if ($('.chat-list-col').hasClass('mobile-mini-user-list')) {
            $(".mobile-chat-list-toggle .chat-list-toggle").trigger('click');
        }

    });

    // change user status
    $(document).on('click', '.change-status', function(e) {
        var icon_class = $(this).find('i').attr("class");
        icon_class = icon_class.replace('fa-fw mr-2','');
        $('.current-status > i').removeClass().addClass(icon_class);
        var new_status = $(this).attr("data-status");
        $.ajax({
            url: "{{ url('ajax-change-user-status') }}",
            type: "POST",
            dataType: 'json',
            data: {
                csrftoken: '{{ csrf_token_ajax() }}',
                new_status: new_status,
            }
        });

    });

    if($(window).width() <= 768){
        $(".act-more").show();
        $( ".act-icon" ).each(function() {
            $('.mobile-act-row').append(this);
        });

        $(".act-more").on('click', function(e) {
            if ($('.mobile-act-row').hasClass('mobile-act-row-show')) {
                $('.mobile-act-row').removeClass('mobile-act-row-show');
                $('.mobile-act-row').addClass('mobile-act-row-hide');
                $('.act-more-btn').removeClass('act-btn-active');
            }else{
                $('.mobile-act-row').addClass('mobile-act-row-show');
                $('.mobile-act-row').removeClass('mobile-act-row-hide');
                $('.act-more-btn').addClass('act-btn-active');
            }

        });

    }else{

        $(".act-more").on('click', function(e) {
            if ($('.act-hidden').hasClass('act-show')) {
                $('.act-hidden').removeClass('act-show');
                $('.act-hidden').css('width','0px');
                $('.act-more-btn').removeClass('act-btn-active');
            }else{
                var width = 24;
                {% if SETTINGS.enable_files %}
                    width += 36;
                {% endif  %}
                {% if SETTINGS.enable_audioclip %}
                    width += 36;
                {% endif  %}
                $('.act-hidden').addClass('act-show');
                $('.act-hidden').css('width', width+'px');
                $('.act-more-btn').addClass('act-btn-active');
            }

        });
    }

    $(document).on('click', '.btn-send', function(e) {
        var content_el = $('#message_content').data("emojioneArea");
        var content = $.sanitize(content_el.getText());
        if(event.shiftKey){
            event.stopPropagation();
        } else {
             event.preventDefault();
             if (content_el.getText() != "") {
                 if (content.length < max_message_length) {

                    if ($('.reply-msg-row').hasClass('reply-msg-row-show')) {
                        var new_msg_data = {}
                        new_msg_data['new_content'] = content;
                        new_msg_data['new_type'] = 1;

                        var msg_data = {};
                        msg_data['reply_message'] = JSON.parse($('.reply-msg-row').data('reply-content'));
                        msg_data['new_message'] = new_msg_data;
                        $(".close-reply-msg").trigger("click");
                        newMessage(JSON.stringify(msg_data), 8);

                    }else{
                        newMessage(content, 1);
                    }
                    content_el.editor.focus();
                 }else{
                     alert("{{_('Sorry, Your message is too long!')}}");
                 }
             }
        }
    });

    {% if SETTINGS.push_notifications %}
    //FireBase Init
    var config = {
        'messagingSenderId': '{{SETTINGS.firebase_messaging_sender_id}}',
        'apiKey': '{{SETTINGS.firebase_api_key}}',
        'projectId': '{{SETTINGS.firebase_project_id}}',
        'appId': '{{SETTINGS.firebase_app_id}}',
    };
    firebase.initializeApp(config);
    navigator.serviceWorker.register("{{ url('firebase-messaging-sw') }}")
        .then((registration) => {
            const messaging = firebase.messaging();
            messaging.useServiceWorker(registration);
            messaging
                .requestPermission()
                .then(function() {
                    console.log("Notification permission granted.");
                    return messaging.getToken();
                })
                .then(function(token) {
                    $.ajax({
                        url: "{{ url('ajax-update-push-device') }}",
                        type: "POST",
                        dataType: 'json',
                        data: {
                            csrftoken: '{{ csrf_token_ajax() }}',
                            token: token,
                        }
                    });
                })
                .catch(function(err) {
                    console.log("Unable to get permission to notify.", err);
                });
        });
    {% endif %}

    $(document).on('click', '.message-audio', function(e) {
        if ($(this).hasClass('recording')) {
            stopRecording();
            $('.message-audio').removeClass('recording');
        }else{
            $('.message-audio').addClass('recording');
            startRecording();
        }
    });

    $(document).on('click', '.btn-chat-search, .search-close', function(e) {

        var aexpo2 = 'easeInExpo';
        var adirection = 'left';
        if($('html').hasClass('rtl')){
            aexpo2 = 'easeOutExpo';
            adirection = 'right';
        }
        if($(".search-panel").is(":visible")){
            $(".search-panel").hide();
            $(".shown-panel").show("blind", {direction : adirection, easing: aexpo2}, 500).removeClass('shown-panel');
            var active_user = $("#active_user").val();
            var active_group = $("#active_group").val();
            var active_room = $("#active_room").val();
            chat_search_mode = false;
            loadChats(active_user, active_group, active_room);
        }else{

            if (!$(".selected-chat-col").is(":visible")) {
                $(".enable-selected-chat").trigger('click');
            }

            if($(".active-user-info").is(":visible")){
                $(".active-user-info").addClass('shown-panel').hide();
            }else if($(".active-group-info").is(":visible")){
                $(".active-group-info").addClass('shown-panel').hide();
            }
            $(".search-panel").show("blind", {direction : adirection, easing: aexpo2}, 500);
        }
    });

    $(document).on('click', '.rec-stop', function(e) {
        stopRecording();
        $('.message-audio').removeClass('recording');
    });

    $(document).on('keyup', '#search-query', function(e) {
        if (!event.ctrlKey) {
            if (event.keyCode === 13) {
                event.preventDefault();
                chatSearch();
            }else{
                chatSearch();
            }
        }
    });

    $(document).on('click', '.rec-cancel', function(e) {
        cancelRecording();
        $('.message-audio').removeClass('recording');
    });

    $(document).on('click', '.search-init', function(e) {
        chatSearch();
    });

    $(document).on('click', 'li.result, .replied-to', function(e) {
        var chat_id = $(this).data('chat-id');
        if ($('#'+chat_id).length) {
            $("#" + chat_id)[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            var highlight_class = '#'+chat_id + ' .message-data';
            $(highlight_class).css('animation', 'flash 2s ease infinite');
            setTimeout(function(){ $( highlight_class ).removeAttr('style'); }, 2000);

        }else{
            var active_user = $("#active_user").val();
            var active_group = $("#active_group").val();
            var active_room = $("#active_room").val();
            loadChats(active_user, active_group, active_room, chat_id);
            chat_search_mode = true;
        }
    });

    $(document).on('click', '.btn-room-user-search', function(e) {
        roomUserSearch();
    });

    $(document).on('keyup', '.room-user-search', function(e) {
        roomUserSearch();
    });

    $('.nav-sidebar').on('shown.bs.tab', function (e) {
        if ($('.room-user-search').val() != '') {
            $('.room-user-search').val('');
            loadActiveUsers();
            room_user_search_mode = false;
        }
    });

    $('.online-list').on('click', '.view-profile', function(e) {
        $(this).data('user-id');
        $('#shown-user').val($(this).data('user-id'));
        getActiveInfo($(this).data('user-id'));
        $(this).parents('.dropdown-menu').removeClass('show');
        e.stopPropagation();
    });

    $(document).on('click', '.close-selected-user', function(e) {
        getActiveInfo();
    });

    $(document).on('click', '.start-chat', function(e) {
        var active_user = $('#shown-user').val();
        var active_group = $("#active_group").val();
        var active_room = $("#active_room").val();
        loadChats(active_user, active_group, active_room);
    });

    $(document).on('click', '.sender-name, .group-user', function(e) {
        $(this).data('user-id');
        $('#shown-user').val($(this).data('user-id'));
        getActiveInfo($(this).data('user-id'));
    });

    $('.select2').select2({
        theme: 'bootstrap4'
    });

    $("#room-selector").select2({
        templateResult: formatRoomOptions,
        theme: 'bootstrap4'
    });

    $('#room-selector').on('change', function () {
        var url = $(this).find(':selected').data('href');
        if (url) {
            window.location = url;
        }
        return false;
    });

    $('#room-selector').on('select2:open', function (e) {
        room_status_mode = true;
    });

    $('#room-selector').on('select2:close', function (e) {
        room_status_mode = false;
    });


    $(document).on('click', '.load-more-users', function(e) {
        var active_room = $("#active_room").val();
        room_user_search_mode = true;
        $.ajax({
            url: "{{ url('ajax-load-more-online-list') }}",
            type: "POST",
            dataType: 'json',
            data: {
                csrftoken: '{{ csrf_token_ajax() }}',
                active_room: active_room,
            },
            success: function(data) {
                if ('list' in data) {

                    $.each(data.list, function( index, obj ) {
                        var chat_li = createOnlineUser(obj);
                        $('.online-list').append(chat_li);
                    });
                }
            },
            complete: function(){
                if (is_nicescroll) {
                    $(".online-list").getNiceScroll().resize();
                }
                $('.refresh-user-list').show();
            }
        });
    });

    $(document).on('click', '.refresh-user-list', function(e) {
        room_user_search_mode = false;
        $('.refresh-user-list').hide();
        loadActiveUsers();
    });

    $(document).on('click', '.forward-selection-close', function(e) {
        destroy_forward_selection();
    });

    $(document).on('click', '.forward-list-check', function(e) {
        e.stopPropagation();
    });


    $(document).on('click', '.forwarding li', function(e) {
        var fwd_check = $(this).find('.forward-list-check');
        if (fwd_check.length) {
            if($(fwd_check).is(':checked')) {
                $(fwd_check).prop('checked', false);
            }else{
                $(fwd_check).prop('checked', true);
            }
            forward_list_create(this.id);
        }

    });

    $(document).on("change", '.forward-list-check', function(event) {
        var forward_msg_id = $(this).parent().parent().attr('id');
        forward_list_create(forward_msg_id);
    });

    // forward message
    $(document).on('click', '.message-forward', function(e) {
        $('.forward-check:not(.deleted)').removeClass('hidden');
        $('.forward-selection').removeClass('hidden');
        $('.chats').addClass('forwarding');
        var forward_msg_id = $(this).parent().parent().attr('id');
        $('#'+forward_msg_id).find('.forward-list-check').prop('checked', true);
        forward_list_create(forward_msg_id);
    });

    // forward message
    $(document).on('click', '.forward-selected', function(e) {
        forwardUserList();
    });

    $(document).on("change", '.chat-list-check', function(event) {
        var chat_item_id = $(this).data('id');
        var chat_item_name = $(this).data('name');
        if($(this).is(':checked')) {
            if($(this).data('is-group')){
                if($.inArray(chat_item_id, forward_group_list) == -1){
                    forward_group_list.push(parseInt(chat_item_id));
                }
            }else{
                if($.inArray(chat_item_id, forward_user_list) == -1){
                    forward_user_list.push(parseInt(chat_item_id));
                }
            }

            if($.inArray(chat_item_name, forward_chat_item) == -1){
                forward_chat_item.unshift(chat_item_name);
            }
        }else{
            if($(this).data('is-group')){
                if($.inArray(chat_item_id, forward_group_list) > -1){
                    forward_group_list.splice(forward_group_list.indexOf(chat_item_id), 1);
                }
            }else{
                if($.inArray(chat_item_id, forward_user_list) > -1){
                    forward_user_list.splice(forward_user_list.indexOf(chat_item_id), 1);
                }
            }

            if($.inArray(chat_item_name, forward_chat_item) > -1){
                forward_chat_item.splice(forward_chat_item.indexOf(chat_item_name), 1);
            }
        }

        var selected_chat_item_count = forward_chat_item.length;

        var forward_html = "";
        if(selected_chat_item_count > 0){
            $('.forward-actions').removeClass('hidden');
            if(selected_chat_item_count == 1){
                forward_html = forward_chat_item[0];
            }else if (selected_chat_item_count > 1) {
                forward_html = forward_chat_item[0] + " & " + (selected_chat_item_count-1) + " other(s)";
            }
            $('.forward-name').html(forward_html);
        }else{
            $('.forward-actions').addClass('hidden');
        }
    });

    $(document).on("click", '.forward-button', function(event) {

        var active_user = $("#active_user").val();
        var active_group = $("#active_group").val();
        var active_room = $("#active_room").val();

        $.ajax({
            type: 'POST',
            url: "{{ url('ajax-forward-message') }}",
            data: {
                csrftoken: '{{ csrf_token_ajax() }}',
                forward_message: forward_msg_list,
                selected_chat_groups: forward_group_list,
                selected_chat_users: forward_user_list,
                active_user: active_user,
                active_room: active_room,
                active_group: active_group
            },
            success: function(data) {
                if (data.success) {
                    $('.forward-modal').modal('hide');
                    var active_user = $("#active_user").val();
                    var active_group = $("#active_group").val();
                    var active_room = $("#active_room").val();
                    if($.inArray(parseInt(active_user), forward_user_list) > -1 ) {
                        destroy_forward_selection();
                        loadChats(active_user, active_group, active_room);
                    }else if ($.inArray(parseInt(active_group), forward_group_list) > -1 ) {
                        destroy_forward_selection();
                        loadChats(active_user, active_group, active_room);
                    }
                    destroy_forward_selection();
                }
            },
            complete: function(){
            }
        });

    });


    $(document).on('click', '.max-recent', function(e) {
        getRecentMedia();
    });


    $('.nav-recent-max').on('shown.bs.tab', function (e) {
        if($(".nav-recent-max").is(":visible")){
            getRecentMedia();
        }
    });

    $(document).on('click', '.load-more-media', function(e) {
        getRecentMedia('is_load_more');
    })

    $(document).on('click', '.recent-media-close', function(e) {
        $('.recent-panel').hide();
        getActiveInfo();
        $('.nav-recent-max a[href="#recent-max-media"]').tab('show');
    });

    {% if SETTINGS.radio %}

        var source = $('.radio-container').data('default-source');
        var audio = document.createElement("audio");
        audio.volume = 0.5;

        $(document).on("change", "#radio-volume-control", function () {
            var vol_icon = $("#radio-volume-display i");
            if (this.value < 20) {
                vol_icon.removeClass("fa-volume-up fa-volume-down").addClass("fa-volume-off");
            } else if (this.value < 71) {
                vol_icon.removeClass("fa-volume-up fa-volume-off").addClass("fa-volume-down");
            } else {
                vol_icon.removeClass("fa-volume-down fa-volume-off").addClass("fa-volume-up");
            }
            audio.volume = this.value / 100;
        });

        $(document).on("click", ".turn-on-play", function () {
            audio.src = source;
            $(this).toggleClass("turn-on-play turn-off-play");
            $(this).children().toggleClass("fa-play-circle fa-stop-circle");
            audio.play();
        });

        $(document).on("click", ".turn-off-play", function () {
            audio.src = "static/audio/mute.mp3";
            $(this).toggleClass("turn-off-play turn-on-play");
            $(this).children().toggleClass("fa-stop-circle fa-play-circle");
            audio.pause();
        });

        $(document).on("click", ".radio-station", function () {
            var newSource = $(this).data("source");
            var newThumb = $(this).data("thumb");
            var sourceTitle = $(this).text();
            $(".radio-controls").removeClass("turn-on-play").addClass("turn-off-play");
            $(".radio-controls i").addClass("fa-stop-circle").removeClass("fa-play-circle");
            $(".radio-title").text(sourceTitle);
            $(".radio-desc").text($(this).data("description"));
            $(".radio-thumb").find('img').attr('src', "{{MEDIA_URL}}/settings/"+newThumb);
            source = newSource;
            audio.src = newSource;
            audio.play();
        });

        $(document).on("click", "#radio-selector", function () {
            $('.radio-panel').toggle();
        });

    {% endif %}

});
// Doc ready end

// Heart Beat Functions
$( document ).ready(function() {
    // Main chat heartbeat
    window.setInterval(function(){
        if(chat_search_mode==false){
            if(heartbeat_status == 1){
                var active_user = $("#active_user").val();
                var active_group = $("#active_group").val();
                var active_room = $("#active_room").val();
                var last_chat_id = $("#last_chat_id").val();
                var chat_meta_id = $("#chat_meta_id").val();
                $.ajax({
                    url: "{{ url('ajax-heartbeat') }}",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        csrftoken: '{{ csrf_token_ajax() }}',
                        active_group: active_group,
                        active_room: active_room,
                        active_user: active_user,
                        last_chat_id: last_chat_id,
                        chat_meta_id: chat_meta_id,
                        is_typing: is_typing,
                    },
                    beforeSend: function() {
                        heartbeat_status = 0; //working
                    },
                    success: function(data) {
                        if(data.typing_user){
                            $('.is-typing').show();
                            $('.is-typing span').html(data.typing_user);
                        }else{
                            $('.is-typing').hide();
                            $('.is-typing span').html("");
                        }
                        if (data.chats) {
                            $.each(data.chats, function( index, obj ) {
                                createMessage(obj,"down");
                                $("#last_chat_id").val(obj.id);
                                if(!data.is_muted){
                                    play_chat_sound();
                                }
                            });
                        }
                    },
                    complete: function(){
                        lazyLoad();
                        GreenAudioPlayer.init({
                            selector: '.cn-player',
                            stopOthersOnPlay: true,
                        });
                        heartbeat_status = 1; //complete
                    }
                });
            }
        }
    }, chat_receive_seconds);

    // Left sidebar active user list heartbeat
    var run_online_list = true;
    $('.fav-list, .online-list').mouseenter(function(){
        run_online_list=false;
        window.setInterval(function(){
            run_online_list=true;
        }, 30000);

    });
    $('.fav-list, .online-list').mouseleave(function(){run_online_list=true;});
    window.setInterval(function(){
        if (room_user_search_mode==false && run_online_list==true) {
            loadActiveUsers();
        }
    }, user_list_check_seconds);

    // Load room list status
    window.setInterval(function(){
        roomListStatus();
    }, user_list_check_seconds);

    // Message read status heartbeat
    window.setInterval(function(){
        if(updated_chats_heartbeat_status == 1){
            var active_user = $("#active_user").val();
            var active_group = $("#active_group").val();
            var active_room = $("#active_room").val();
            var last_updated_chat_time = $("#last_updated_chat_time").val();
            $.ajax({
                url: "{{ url('ajax-updated-chats') }}",
                type: "POST",
                dataType: 'json',
                data: {
                    csrftoken: '{{ csrf_token_ajax() }}',
                    active_group: active_group,
                    active_room: active_room,
                    active_user: active_user,
                    last_updated_chat_time: last_updated_chat_time,
                },
                beforeSend: function() {
                    updated_chats_heartbeat_status = 0; //working
                },
                success: function(data) {
                    if (data.updated_chats) {
                        $.each(data.updated_chats, function( index, obj ) {
                            var updated_li = $(".messages ul").find("li[id="+ obj.id +"]");
                            if (obj.status == 2) {
                                $(updated_li).find('.message-status').addClass('read');
                            }else if (obj.status == 3) {
                                $(updated_li).find('.message-html').html(`<div class="chat-txt deleted"><i class="fa fa-ban"></i> This message was deleted</div>`);
                            }
                        });
                    }
                },
                complete: function(){
                    updated_chats_heartbeat_status = 1; //complete
                }
            });
        }
    }, chat_status_check_seconds);

    setInterval(refreshTypingStatus, 1000);

    $('#selected-lang-toggle').html($('.selected-lang').html());


});
