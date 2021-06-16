(function($) {
    "use strict";

    $(document).ready(function() {
        // Initialize summernote wysiwyg editor
        $('.summernote').summernote();
        $(".dob").dateDropdowns();
        $('#dataTable').DataTable({
            stateSave: true
        });

        //Init lazy Load
        $(function() {
            $('.lazy').Lazy();
        });
        var page_reload = false;

        // Whenever user click on Update button on settings page, call ajax with new settings
        $(".update-settings").on('click', function(e) {
            var update_type = $(this).val();
            var data = new FormData($('#'+$(this).val())[0]);
            data.append("update_type", $(this).val());
            {{ csrf_token }}
            if(update_type == "policy-settings"){
                data.set('terms_and_conditions', $('#terms_and_conditions').summernote('code'));
                data.set('privacy_policy', $('#privacy_policy').summernote('code'));
            }
            if(update_type == "about-settings"){
                data.set('about_us', $('#about_us').summernote('code'));
            }
            $('.settings-success').hide();
            $('.settings-error').hide();
            $.ajax({
                url: "{{ url('ajax-update-settings') }}",
                data: data,
                type: "POST",
                dataType: 'json',
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                beforeSend: function() {
                    loading(".card-"+update_type, "show");
                },
                success: function(data) {
                    page_reload = true;
                    $('.text-error').remove();
                    if(data.success) {
                        toastr["success"]("{{_('Successfully Updated')}}");
                    }else{
                        $.each( data.message, function( key, field_array ) {
                            $.each( field_array, function( field, error_list ) {
                                $.each( error_list, function( error_key, error_message ) {
                                    $('[name='+field+']').after(`<small class="form-text text-danger text-error">`+error_message+`</small>`);
                                });
                            });
                        });
                    }
                },complete: function(){
                    loading(".card-"+update_type, "hide");
                }
            });

        });

        // Generate image instant previews
        $(document).on("change",".upload-setting-image", function(){
            var uploadFile = $(this);
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

            if (/^image/.test( files[0].type)){ // only image file
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file
                reader.onloadend = function(){ // set image data as background of div
                    uploadFile.closest(".row").find(".setting-image-preview").html("");
                    uploadFile.closest(".row").find(".setting-image-preview").css("background-image", "url("+this.result+")");

                }
            }
        });

        // Update Chat Room information with ajax
        $(document).on("click", '.admin-update-chatroom', function(event) {
            var data = new FormData($('#admin-chatroom-info')[0]);
            $('.chatroom-success').hide();
            $('.chatroom-error').hide();
            $.ajax({
                url: "{{ url('ajax-update-chatroom') }}",
                data: data,
                type: "POST",
                dataType: 'json',
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                beforeSend: function() {
                    loading(".card-room-info", "show");
                },
                success: function(data) {
                    $('.text-error').remove();
                    if(data.success == "true") {
                        toastr.success(
                            "{{_('Successfully Updated')}}", '',
                            {
                                timeOut: 3000,
                                fadeOut: 3000,
                                onHidden: function () {
                                    window.location.href = "{{ url('dashboard-chatroom-list') }}";
                                }
                            }
                        );
                    }else{
                        $.each( data.message, function( key, field_array ) {
                            $.each( field_array, function( field, error_list ) {
                                $.each( error_list, function( error_key, error_message ) {
                                    $('[name='+field+']').after(`<small class="form-text text-danger text-error">`+error_message+`</small>`);
                                });
                            });
                        });
                    }

                },complete: function(){
                    loading(".card-room-info", "hide");
                }
            });

            $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {

                $('.chatroom-success').hide();
                $('.chatroom-error').hide();
            });
        });

        // Change cover image of chat room preveiw
        $(document).on("change",".upload-cover-image", function(){
            var uploadFile = $(this);
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

            if (/^image/.test( files[0].type)){ // only image file
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file
                reader.onloadend = function(){ // set image data as background of div
                    uploadFile.closest(".row").find(".room-coverimage-preview img").attr("src",this.result);
                }
            }
        });

        // Whenever user click on Update button on social login
        $(document).on("click",".update-social-login", function(e){
            var enable_social_login = $('#enable_social_login').val();
            var update_list = [];
            var delete_list = [];
            $('tr').not('.hidden-row, .delete-row').each(function(){
                var auth_provider = $(this).find('#name').val();
                if(auth_provider){
                    var auth_id = $(this).find('#id_key').val();
                    var auth_secret = $(this).find('#secret_key').val();
                    var auth_status = $(this).find('#status').val();
                    var each_auth = [auth_provider, auth_id, auth_secret, auth_status];
                    update_list.push(each_auth);
                }
            });

            $('.delete-row').each(function(){
                var auth_provider = $(this).find('#name').val();
                if(auth_provider){
                    delete_list.push(auth_provider);
                }
            });

            $.ajax({
                url: "{{ url('ajax-social-login-update') }}",
                data: {
                    csrftoken: '{{ csrf_token_ajax() }}',
                    update_list : JSON.stringify(update_list),
                    delete_list : JSON.stringify(delete_list),
                    enable_social_login : enable_social_login,
                },
                type: "POST",
                dataType: 'json',
                beforeSend: function() {
                    loading(".card-social-login-settings", "show");
                },
                success: function(data) {
                    $('.text-error').remove();
                    if(data.success) {
                        toastr["success"]("{{_('Successfully Updated')}}");
                    }else{
                        $.each( data.message, function( key, field_array ) {
                            $.each( field_array, function( field, error_list ) {
                                $.each( error_list, function( error_key, error_message ) {
                                    $('[name='+field+']').after(`<small class="form-text text-danger text-error">`+error_message+`</small>`);
                                });
                            });
                        });
                    }
                },complete: function(){
                    loading(".card-social-login-settings", "hide");
                }
            });

        });

        $(document).on("change",".upload-radio-icon", function(e){
            var myImageUrl = URL.createObjectURL(e.target.files[0]);
            var myImage = new Image();
            myImage.src = myImageUrl;
            console.log(myImage);
            var this_image = this;

    		myImage.onload = function(){
                var myCanvas = document.createElement('canvas');
                $(myCanvas).prop('width', this.width).prop('height', this.height);
                var ctx = myCanvas.getContext('2d');
            	ctx.drawImage(myImage, 0, 0);
            	var mydataURL = myCanvas.toDataURL('image/jpg');
                $(this_image).parent().parent().find('.radio-icon').prop('src', mydataURL);
                $(this_image).data('image', mydataURL);
            }
        });

        // Whenever user click on Update button on social login
        $(document).on("click", ".update-radio", function(e){
            var enable_radio = $('#enable_radio').val();
            var update_list = [];
            var delete_list = [];
            $('tr').not('.hidden-row, .delete-row').each(function(){
                var radio_station_name = $(this).find('#name').val();
                if(radio_station_name){
                    var id = $(this).find('#id').val();
                    var description = $(this).find('#description').val();
                    var source = $(this).find('#source').val();
                    var status = $(this).find('#status').val();
                    var data_image = $(this).find(".upload-radio-icon").data('image');
                    var each_station = {id, radio_station_name, description, source, status, data_image};
                    update_list.push(each_station);
                }
            });

            $('.delete-row').each(function(){
                var radio_station = $(this).find('#id').val();
                if(radio_station){
                    delete_list.push(radio_station);
                }
            });

            var formData = new FormData();
            formData.append('csrftoken', '{{ csrf_token_ajax() }}');
            formData.append('update_list', JSON.stringify(update_list));
            formData.append('delete_list', JSON.stringify(delete_list));
            formData.append('radio', enable_radio);

            $.ajax({
                url: "{{ url('ajax-radio-update') }}",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                type: "POST",
                dataType: 'json',
                beforeSend: function() {
                    loading(".card-radio-settings", "show");
                },
                success: function(data) {
                    $('.text-error').remove();
                    if(data.success) {
                        toastr.success(
                            "{{_('Successfully updated')}}", '',
                            {
                                timeOut: 1000,
                                fadeOut: 1000,
                                onHidden: function () {
                                    window.location.reload();
                                }
                            }
                        );
                    }else{
                        $.each( data.message, function( key, field_array ) {
                            $.each( field_array, function( field, error_list ) {
                                $.each( error_list, function( error_key, error_message ) {
                                    $('[name='+field+']').after(`<small class="form-text text-danger text-error">`+error_message+`</small>`);
                                });
                            });
                        });
                    }
                },complete: function(){
                    loading(".card-radio-settings", "hide");
                }
            });

        });

        // Update already created chat room
        $(document).on("click", ".edit-chatroom, .new-chatroom", function(){
            var edit_id = $(this).attr("data-edit-id");
            $.ajax({
                url: "{{ url('ajax-get-chatroom') }}",
                data: {
                    edit_room: edit_id,
                    csrftoken: '{{ csrf_token_ajax() }}'
                },
                type: "POST",
                beforeSend: function() {
                    loading(".card-room-users", "show");
                },
                success: function(data) {
                    $('.rooms-modal .modal-body').html(data);
                    $('.rooms-modal').modal('show');
                    $('#dataTable').DataTable();
                },
                complete: function(){
                    loading(".card-room-users", "hide");
                }
            });
        });

        // delete chatroom
        $(document).on('click', '.delete-chatroom', function(e) {
            var room_id = this.id;
            if (confirm('{{_("Are you sure you want to delete this room? This action can not be undone.")}}')) {
                $.ajax({
                    url: "{{ url('ajax-delete-chatroom') }}",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        csrftoken: '{{ csrf_token_ajax() }}',
                        room_id: room_id
                    },
                    beforeSend: function() {
                        loading(".card-room-list","show");
                    },
                    success: function(data) {
                        if(data.success){
                            toastr["success"]("{{_('Successfully deleted')}}");
                            $('#dataTable').DataTable().row($('#'+room_id).closest('tr')).remove().draw();
                        }
                    },complete: function(){
                        loading(".card-room-list","hide");
                    }

                });
            }
        });

        // delete chats
        $(document).on('click', '.delete-chats', function(e) {
            var room_id = this.id;
            if (confirm('{{_("Are you sure you want to delete all chats on this room? This action can not be undone.")}}')) {
                $.ajax({
                    url: "{{ url('ajax-delete-chats') }}",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        csrftoken: '{{ csrf_token_ajax() }}',
                        room_id: room_id
                    },
                    beforeSend: function() {
                        loading(".card-room-list","show");
                    },
                    success: function(data) {
                        if(data.success){
                            toastr["success"]("{{_('Successfully deleted')}}");
                        }
                    },complete: function(){
                        loading(".card-room-list","hide");
                    }

                });
            }
        });

        // Update and manage users in chat rooms (kick and unkick)
        $(document).on("click", ".chatroom-user-restriction", function(){
            var result = confirm("Are you sure?");
            if (result) {
                var current_row = $(this).closest('tr');
                var room_id = $(this).attr("data-room");
                var selected_user = $(this).attr("data-user");
                var restriction_type = $(this).attr("data-restriction-type");
                $.ajax({
                    url: "{{ url('ajax-chatroom-user-restriction') }}",
                    data: {room_id : room_id, selected_user : selected_user, restriction_type : restriction_type,
                    csrftoken: '{{ csrf_token_ajax() }}'
                    },
                    type: "POST",
                    beforeSend: function() {
                        loading(".card-room-users", "show");
                    },
                    success: function(data) {
                        if(restriction_type == "3"){
                            $(current_row).find('.kick-btn').css("display", "none");
                            $(current_row).find('.unkick-btn').css("display", "inline-block");
                        }else if (restriction_type == "1") {
                            $(current_row).find('.kick-btn').css("display", "inline-block");
                            $(current_row).find('.unkick-btn').css("display", "none");
                        }

                        if(data.success == "true") {
                            $('.chatroom-success').html(data.message);
                            $('.chatroom-success').show();
                        }else{
                            $('.chatroom-error').html(data.message);
                            $('.chatroom-error').show();
                        }
                    },
                    complete: function(){
                        loading(".card-room-users", "hide");
                    }
                });
            }
        });

        // Whenever user click on Update button on language page, call ajax with new settings
        $(document).on("click", ".update-language", function(){
            var data = new FormData($('#language-form')[0]);
            $('.language-error').hide();
            $.ajax({
                url: "{{ url('ajax-language-update') }}",
                data: data,
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function() {
                    loading(".card-language", "show");
                },
                success: function(data) {
                    page_reload = true;
                    $('.text-error').remove();
                    if(data.success) {
                        toastr.success(
                            "{{_('Successfully Updated')}}", '',
                            {
                                timeOut: 3000,
                                fadeOut: 3000,
                                onHidden: function () {
                                    window.location.href = "{{ url('dashboard-languages') }}";
                                }
                            }
                        );
                    }else{
                        $.each( data.message, function( key, field_array ) {
                            $.each( field_array, function( field, error_list ) {
                                $.each( error_list, function( error_key, error_message ) {
                                    $('[name='+field+']').after(`<small class="form-text text-danger text-error">`+error_message+`</small>`);
                                });
                            });
                        });
                    }
                },complete: function(){
                    loading(".card-language", "hide");
                }
            });

        });

        // Whenever user click on Update translation on translation page
        $(document).on("click", ".update-translation", function(){
            var data = new FormData($('#lang-translation')[0]);
            $.ajax({
                url: "{{ url('ajax-update-translation') }}",
                data: data,
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function() {
                    loading(".card-language", "show");
                },
                success: function(data) {
                    page_reload = true;
                    $('.text-error').remove();
                    if(data.success) {
                        toastr.success(
                            "{{_('Successfully Updated')}}", '',
                            {
                                timeOut: 3000,
                                fadeOut: 3000,
                            }
                        );
                    }else{
                        $.each( data.message, function( key, field_array ) {
                            $.each( field_array, function( field, error_list ) {
                                $.each( error_list, function( error_key, error_message ) {
                                    $('[name='+field+']').after(`<small class="form-text text-danger text-error">`+error_message+`</small>`);
                                });
                            });
                        });
                    }
                },complete: function(){
                    loading(".card-language", "hide");
                }
            });

        });

        // Update and manage users in chat rooms (kick and unkick)
        $(document).on("click", ".delete-language", function(){
            var result = confirm("Are you sure?");
            if (result) {
                var lang = $(this).attr("data-lang");
                $.ajax({
                    url: "{{ url('ajax-language-delete') }}",
                    data: {lang : lang, csrftoken: '{{ csrf_token_ajax() }}'},
                    type: "POST",
                    beforeSend: function() {
                        loading(".card-language-list", "show");
                    },
                    success: function(data) {
                        if(data.success == true) {
                            toastr.success(
                                "{{_('Successfully deleted')}}", '',
                                {
                                    timeOut: 3000,
                                    fadeOut: 3000,
                                    onHidden: function () {
                                        window.location.href = "{{ url('dashboard-languages') }}";
                                    }
                                }
                            );
                        }else{
                            $('.language-error').html(data.message);
                            $('.language-error').show();
                        }
                    },
                    complete: function(){
                        loading(".card-language-list", "hide");
                    }
                });
            }
        });

        $(document).on('change', '#is_protected', function() {
            if(this.checked) {
                $('.pin-area').show();
            }else{
                $('.pin-area').hide();
            }
        });

        $(document).on('change', '#single_room_mode', function() {
            if($(this).val() == 1) {
                $('.default-room-area').show();
            }else{
                $('.default-room-area').hide();
            }
        });

        $(document).on('change', '#enable_terms', function() {
            if($(this).val() == 1) {
                $('.enable-terms-area').show();
            }else{
                $('.enable-terms-area').hide();
            }
        });

        $(document).on('change', '#enable_privacy', function() {
            if($(this).val() == 1) {
                $('.enable-privacy-area').show();
            }else{
                $('.enable-privacy-area').hide();
            }
        });

        $(document).on('change', '#enable_about', function() {
            if($(this).val() == 1) {
                $('.enable-about-area').show();
            }else{
                $('.enable-about-area').hide();
            }
        });

        $(document).on('change', '#profanity_filter', function() {
            if($(this).val() == 1) {
                $('.enable-profanity-area').show();
            }else{
                $('.enable-profanity-area').hide();
            }
        });

        $(document).on('change', '#enable_files', function() {
            if($(this).val() == 1) {
                $('.enable-filelist-area').show();
            }else{
                $('.enable-filelist-area').hide();
            }
        });

        $(document).on('change', '.auth-provider-name', function() {
            var selected_auth_src = "{{ STATIC_URL }}/img/auth_icons/"+$(this).val()+".png";
            $(this).parent().parent().find('.auth-provider-icon').attr('src', selected_auth_src);
        });

        $(document).on('change', '#enable_contact', function() {
            if($(this).val() == 1) {
                $('.enable-contact-area').show();
            }else{
                $('.enable-contact-area').hide();
            }
        });

        $(document).on('change', '#cookie_consent_popup', function() {
            if($(this).val() == 1) {
                $('.cookie-message-area').show();
            }else{
                $('.cookie-message-area').hide();
            }
        });

        $(document).on('change', '#theme', function() {
            if($(this).val() == 'custom') {
                $('.custom-colors').show();
            }else{
                $('.custom-colors').hide();
            }
        });

        $(document).on('change', '#push_notifications', function() {
            if($(this).val() == 1) {
                $('.push-notification-area').show();
            }else{
                $('.push-notification-area').hide();
            }
        });

        $(document).on('change', '#pwa_enabled', function() {
            if($(this).val() == 1) {
                $('.enable-pwa-area').show();
            }else{
                $('.enable-pwa-area').hide();
            }
        });

        $(document).on('change', '#enable_social_login', function() {
            if($(this).val() == 1) {
                $('.enable-social-login-area').show();
            }else{
                $('.enable-social-login-area').hide();
            }
        });

        $(document).on('change', '#enable_radio', function() {
            if($(this).val() == 1) {
                $('.enable-radio-area').show();
            }else{
                $('.enable-radio-area').hide();
            }
        });

        $(document).on('change', '.trans-lang-switch', function() {
            window.location.href = "{{ url('dashboard-language-translation') }}?lang="+$(this).val();
        });

        $(document).on('change', '.check_all', function() {
            $('.user-selection, .check_all').prop('checked', this.checked);
        });

        $(document).on('click', '.delete-user', function(e) {
            var selected = $(this).attr('data-id');
            $('#'+selected).prop('checked', 'checked');
            $(".delete-selected-user").trigger("click");
        });

        $(document).on('click', '.delete-selected-user', function(e) {
            var result = confirm("Are you sure?");
            if (result) {
                var data = new FormData($('#user-list')[0]);
                var url = "{{url('ajax-delete-users')}}";
                $.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                        if (data.success == true) {
                            toastr.success(
                                "{{_('Successfully deleted')}}", '',
                                {
                                    timeOut: 1500,
                                    fadeOut: 1500,
                                    onHidden: function () {
                                        window.location.reload();
                                    }
                                }
                            );
                        } else {
                            toastr["error"]("{{_('Something went wrong')}}");
                        }
                    },
                });
            }
        });

        $('.color-picker').on('input', function() {
            $(this).siblings("input[type=text]").val($(this).val());
        });

        $('.color-input').on('input', function() {
            $(this).siblings('.color-picker').val($(this).val());
        });

        $(".save-profile").on('click', function(e) {
            var data = new FormData($('#profile-form')[0]);
            var url = "{{url('ajax-save-profile')}}";
            $('.profile-error').hide();
            $.ajax({
                url: url,
                data: data,
                type: "POST",
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function(data) {

                    $('.text-error').remove();
                    if (data.success == true) {
                        toastr["success"]("{{_('Successfully Updated')}}");
                    } else {
                        if ($.isArray(data.message)) {
                            $.each(data.message, function(key, field_array) {
                                $.each(field_array, function(field, error_list) {
                                    $.each(error_list, function(error_key, error_message) {
                                        $('[name=' + field + ']').after(`<small class="form-text text-danger text-error">` + error_message + `</small>`);
                                    });
                                });
                            });
                        } else {
                            $('.profile-error').html(data.message);
                            $('.profile-error').show();
                        }
                    }
                },
            });
        });

        $(".add-profile").on('click', function(e) {
            var data = new FormData($('#profile-form')[0]);
            var url = "{{url('ajax-add-profile')}}";
            $('.profile-error').hide();
            $.ajax({
                url: url,
                data: data,
                type: "POST",
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function(data) {

                    $('.text-error').remove();
                    if (data.success == true) {
                        toastr.success(
                            "{{_('Successfully added')}}", '',
                            {
                                timeOut: 3000,
                                fadeOut: 3000,
                                onHidden: function () {
                                    window.location.href = "{{ url('dashboard-user-list') }}";
                                }
                            }
                        );
                    } else {
                        if ($.isArray(data.message)) {
                            $.each(data.message, function(key, field_array) {
                                $.each(field_array, function(field, error_list) {
                                    $.each(error_list, function(error_key, error_message) {
                                        $('[name=' + field + ']').after(`<small class="form-text text-danger text-error">` + error_message + `</small>`);
                                    });
                                });
                            });
                        } else {
                            $('.profile-error').html(data.message);
                            $('.profile-error').show();
                        }
                    }
                },
            });
        });


        // profile image upload
        $(document).on("change", ".upload-image", function() {
            var uploadFile = $(this);
            var files = !!this.files ? this.files : [];
            if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

            if (/^image/.test(files[0].type)) { // only image file
                var reader = new FileReader(); // instance of the FileReader
                reader.readAsDataURL(files[0]); // read the local file
                reader.onloadend = function() { // set image data as background of div
                    uploadFile.closest(".imgUp").find('.imagePreview').html("");
                    uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url(" + this.result + ")");
                }
            }
        });

        $(document).on("click", ".add-new-auth-provider", function() {
            var $tr = $('.hidden-row').clone();
            $tr.removeClass('hidden-row');
            $('.auth-provider-list').append($tr);
        });

        $(document).on("click", ".delete-auth-provider", function() {
            $(this).closest('tr').addClass('delete-row');
        });

        $(document).on("click", ".add-new-radio", function() {
            var $tr = $('.hidden-row').clone();
            $tr.removeClass('hidden-row');
            $('.radio-list').append($tr);
        });

        $(document).on("click", ".delete-radio", function() {
            $(this).closest('tr').addClass('delete-row');
        });

        $('.select2').select2({
            theme: 'bootstrap4'
        });
    });


    // Update and manage users in chat rooms (kick and unkick)
    $(document).on("click", ".chatroom-user-mod", function(){
        var result = confirm("Are you sure?");
        if (result) {
            var current_row = $(this).closest('tr');
            var room_id = $('#room_id').val();
            var selected_user = $(this).attr("data-user");
            var mod_type = $(this).attr("data-mod-type");
            $.ajax({
                url: "{{ url('ajax-chatroom-user-mod') }}",
                data: {
                    room_id : room_id,
                    selected_user : selected_user,
                    mod_type: mod_type,
                    csrftoken: '{{ csrf_token_ajax() }}'
                },
                type: "POST",
                beforeSend: function() {
                    loading(".card-room-users", "show");
                },
                success: function(data) {
                    if(mod_type == "1"){
                        $(current_row).find('.add-mod').css("display", "none");
                        $(current_row).find('.remove-mod').css("display", "inline-block");
                    }else if (mod_type == "0") {
                        $(current_row).find('.add-mod').css("display", "inline-block");
                        $(current_row).find('.remove-mod').css("display", "none");
                    }

                    if(data.success == "true") {
                        toastr["success"](data.message);
                    }else{
                        toastr["error"](data.message);
                    }
                },
                complete: function(){
                    loading(".card-room-users", "hide");
                }
            });
        }
    });


})(jQuery);
