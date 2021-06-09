-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 17, 2020 at 02:12 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

--
-- Database: `install_varient`
--

-- --------------------------------------------------------

--
-- Table structure for table `ad_spaces`
--

CREATE TABLE `ad_spaces` (
  `id` int(11) NOT NULL,
  `ad_space` text DEFAULT NULL,
  `ad_code_728` text DEFAULT NULL,
  `ad_code_468` text DEFAULT NULL,
  `ad_code_300` text DEFAULT NULL,
  `ad_code_234` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ad_spaces`
--

INSERT INTO `ad_spaces` (`id`, `ad_space`, `ad_code_728`, `ad_code_468`, `ad_code_300`, `ad_code_234`) VALUES
(1, 'index_top', NULL, NULL, NULL, NULL),
(2, 'index_bottom', NULL, NULL, NULL, NULL),
(3, 'post_top', NULL, NULL, NULL, NULL),
(4, 'post_bottom', NULL, NULL, NULL, NULL),
(5, 'category_top', NULL, NULL, NULL, NULL),
(6, 'category_bottom', NULL, NULL, NULL, NULL),
(7, 'tag_top', NULL, NULL, NULL, NULL),
(8, 'tag_bottom', NULL, NULL, NULL, NULL),
(9, 'search_top', NULL, NULL, NULL, NULL),
(10, 'search_bottom', NULL, NULL, NULL, NULL),
(11, 'profile_top', NULL, NULL, NULL, NULL),
(12, 'profile_bottom', NULL, NULL, NULL, NULL),
(13, 'reading_list_top', NULL, NULL, NULL, NULL),
(14, 'reading_list_bottom', NULL, NULL, NULL, NULL),
(15, 'sidebar_top', NULL, NULL, NULL, NULL),
(16, 'sidebar_bottom', NULL, NULL, NULL, NULL),
(17, 'header', NULL, NULL, NULL, NULL),
(18, 'posts_top', NULL, NULL, NULL, NULL),
(19, 'posts_bottom', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `audios`
--

CREATE TABLE `audios` (
  `id` int(11) NOT NULL,
  `audio_name` varchar(255) DEFAULT NULL,
  `audio_path` varchar(255) DEFAULT NULL,
  `download_button` tinyint(1) DEFAULT 1,
  `user_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `name` varchar(255) DEFAULT NULL,
  `name_slug` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT 0,
  `description` varchar(500) DEFAULT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `block_type` varchar(255) DEFAULT NULL,
  `category_order` int(11) DEFAULT 0,
  `show_at_homepage` tinyint(1) DEFAULT 1,
  `show_on_menu` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE `ci_sessions` (
  `id` varchar(128) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `timestamp` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `data` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT 0,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `comment` varchar(5000) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `like_count` int(11) DEFAULT 0,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` varchar(5000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `following_id` int(11) DEFAULT NULL,
  `follower_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fonts`
--

CREATE TABLE `fonts` (
  `id` int(11) NOT NULL,
  `font_name` varchar(255) DEFAULT NULL,
  `font_url` varchar(2000) DEFAULT NULL,
  `font_family` varchar(500) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fonts`
--

INSERT INTO `fonts` (`id`, `font_name`, `font_url`, `font_family`, `is_default`) VALUES
(1, 'Arial', NULL, 'font-family: Arial, Helvetica, sans-serif', 1),
(2, 'Arvo', '<link href=\"https://fonts.googleapis.com/css?family=Arvo:400,700&display=swap\" rel=\"stylesheet\">\r\n', 'font-family: \"Arvo\", Helvetica, sans-serif', 0),
(3, 'Averia Libre', '<link href=\"https://fonts.googleapis.com/css?family=Averia+Libre:300,400,700&display=swap\" rel=\"stylesheet\">\r\n', 'font-family: \"Averia Libre\", Helvetica, sans-serif', 0),
(4, 'Bitter', '<link href=\"https://fonts.googleapis.com/css?family=Bitter:400,400i,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Bitter\", Helvetica, sans-serif', 0),
(5, 'Cabin', '<link href=\"https://fonts.googleapis.com/css?family=Cabin:400,500,600,700&display=swap&subset=latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Cabin\", Helvetica, sans-serif', 0),
(6, 'Cherry Swash', '<link href=\"https://fonts.googleapis.com/css?family=Cherry+Swash:400,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Cherry Swash\", Helvetica, sans-serif', 0),
(7, 'Encode Sans', '<link href=\"https://fonts.googleapis.com/css?family=Encode+Sans:300,400,500,600,700&display=swap&subset=latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Encode Sans\", Helvetica, sans-serif', 0),
(8, 'Helvetica', NULL, 'font-family: Helvetica, sans-serif', 1),
(9, 'Hind', '<link href=\"https://fonts.googleapis.com/css?family=Hind:300,400,500,600,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">', 'font-family: \"Hind\", Helvetica, sans-serif', 0),
(10, 'Josefin Sans', '<link href=\"https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap&subset=latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Josefin Sans\", Helvetica, sans-serif', 0),
(11, 'Kalam', '<link href=\"https://fonts.googleapis.com/css?family=Kalam:300,400,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Kalam\", Helvetica, sans-serif', 0),
(12, 'Khula', '<link href=\"https://fonts.googleapis.com/css?family=Khula:300,400,600,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Khula\", Helvetica, sans-serif', 0),
(13, 'Lato', '<link href=\"https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">', 'font-family: \"Lato\", Helvetica, sans-serif', 0),
(14, 'Lora', '<link href=\"https://fonts.googleapis.com/css?family=Lora:400,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Lora\", Helvetica, sans-serif', 0),
(15, 'Merriweather', '<link href=\"https://fonts.googleapis.com/css?family=Merriweather:300,400,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Merriweather\", Helvetica, sans-serif', 0),
(16, 'Montserrat', '<link href=\"https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Montserrat\", Helvetica, sans-serif', 0),
(17, 'Mukta', '<link href=\"https://fonts.googleapis.com/css?family=Mukta:300,400,500,600,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Mukta\", Helvetica, sans-serif', 0),
(18, 'Nunito', '<link href=\"https://fonts.googleapis.com/css?family=Nunito:300,400,600,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Nunito\", Helvetica, sans-serif', 0),
(19, 'Open Sans', '<link href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">', 'font-family: \"Open Sans\", Helvetica, sans-serif', 0),
(20, 'Oswald', '<link href=\"https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext,vietnamese\" rel=\"stylesheet\">', 'font-family: \"Oswald\", Helvetica, sans-serif', 0),
(21, 'Oxygen', '<link href=\"https://fonts.googleapis.com/css?family=Oxygen:300,400,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Oxygen\", Helvetica, sans-serif', 0),
(22, 'Poppins', '<link href=\"https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap&subset=devanagari,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Poppins\", Helvetica, sans-serif', 0),
(23, 'PT Sans', '<link href=\"https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap&subset=cyrillic,cyrillic-ext,latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"PT Sans\", Helvetica, sans-serif', 0),
(24, 'Raleway', '<link href=\"https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">\r\n', 'font-family: \"Raleway\", Helvetica, sans-serif', 0),
(25, 'Roboto', '<link href=\"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">', 'font-family: \"Roboto\", Helvetica, sans-serif', 0),
(26, 'Roboto Condensed', '<link href=\"https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Roboto Condensed\", Helvetica, sans-serif', 0),
(27, 'Roboto Slab', '<link href=\"https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Roboto Slab\", Helvetica, sans-serif', 0),
(28, 'Rokkitt', '<link href=\"https://fonts.googleapis.com/css?family=Rokkitt:300,400,500,600,700&display=swap&subset=latin-ext,vietnamese\" rel=\"stylesheet\">\r\n', 'font-family: \"Rokkitt\", Helvetica, sans-serif', 0),
(29, 'Source Sans Pro', '<link href=\"https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese\" rel=\"stylesheet\">', 'font-family: \"Source Sans Pro\", Helvetica, sans-serif', 0),
(30, 'Titillium Web', '<link href=\"https://fonts.googleapis.com/css?family=Titillium+Web:300,400,600,700&display=swap&subset=latin-ext\" rel=\"stylesheet\">', 'font-family: \"Titillium Web\", Helvetica, sans-serif', 0),
(31, 'Ubuntu', '<link href=\"https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext\" rel=\"stylesheet\">', 'font-family: \"Ubuntu\", Helvetica, sans-serif', 0),
(32, 'Verdana', NULL, 'font-family: Verdana, Helvetica, sans-serif', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `title` varchar(500) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `path_big` varchar(255) DEFAULT NULL,
  `path_small` varchar(255) DEFAULT NULL,
  `is_album_cover` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_albums`
--

CREATE TABLE `gallery_albums` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `gallery_categories`
--

CREATE TABLE `gallery_categories` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `name` varchar(255) DEFAULT NULL,
  `album_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `general_settings`
--

CREATE TABLE `general_settings` (
  `id` int(11) NOT NULL,
  `site_lang` int(11) NOT NULL DEFAULT 1,
  `multilingual_system` tinyint(1) DEFAULT 1,
  `show_hits` tinyint(1) DEFAULT 1,
  `show_rss` tinyint(1) DEFAULT 1,
  `show_newsticker` tinyint(1) DEFAULT 1,
  `pagination_per_page` smallint(6) DEFAULT 10,
  `google_analytics` text DEFAULT NULL,
  `mail_library` varchar(100) DEFAULT 'swift',
  `mail_protocol` varchar(100) DEFAULT 'smtp',
  `mail_host` varchar(255) DEFAULT NULL,
  `mail_port` varchar(255) DEFAULT '587',
  `mail_username` varchar(255) DEFAULT NULL,
  `mail_password` varchar(255) DEFAULT NULL,
  `mail_title` varchar(255) DEFAULT NULL,
  `google_client_id` varchar(500) DEFAULT NULL,
  `google_client_secret` varchar(500) DEFAULT NULL,
  `vk_app_id` varchar(500) DEFAULT NULL,
  `vk_secure_key` varchar(500) DEFAULT NULL,
  `facebook_app_id` varchar(500) DEFAULT NULL,
  `facebook_app_secret` varchar(500) DEFAULT NULL,
  `facebook_comment` text DEFAULT NULL,
  `facebook_comment_active` tinyint(1) DEFAULT 1,
  `show_featured_section` tinyint(1) DEFAULT 1,
  `show_latest_posts` tinyint(1) DEFAULT 1,
  `pwa_status` tinyint(1) DEFAULT 0,
  `registration_system` tinyint(1) DEFAULT 1,
  `comment_system` tinyint(1) DEFAULT 1,
  `comment_approval_system` tinyint(1) DEFAULT 1,
  `show_post_author` tinyint(1) DEFAULT 1,
  `show_post_date` tinyint(1) DEFAULT 1,
  `menu_limit` tinyint(4) DEFAULT 8,
  `custom_css_codes` mediumtext DEFAULT NULL,
  `custom_javascript_codes` mediumtext DEFAULT NULL,
  `adsense_activation_code` text DEFAULT NULL,
  `vr_key` varchar(500) DEFAULT NULL,
  `purchase_code` varchar(255) DEFAULT NULL,
  `recaptcha_site_key` varchar(255) DEFAULT NULL,
  `recaptcha_secret_key` varchar(255) DEFAULT NULL,
  `recaptcha_lang` varchar(50) DEFAULT NULL,
  `emoji_reactions` tinyint(1) DEFAULT 1,
  `mail_contact_status` tinyint(1) DEFAULT 0,
  `mail_contact` varchar(255) DEFAULT NULL,
  `cache_system` tinyint(1) DEFAULT 0,
  `cache_refresh_time` int(11) DEFAULT 1800,
  `refresh_cache_database_changes` tinyint(1) DEFAULT 0,
  `email_verification` tinyint(1) DEFAULT 0,
  `file_manager_show_files` tinyint(1) DEFAULT 1,
  `audio_download_button` tinyint(1) DEFAULT 1,
  `approve_added_user_posts` tinyint(1) DEFAULT 1,
  `approve_updated_user_posts` tinyint(1) DEFAULT 1,
  `timezone` varchar(255) DEFAULT 'America/New_York',
  `show_latest_posts_on_slider` tinyint(1) DEFAULT 0,
  `show_latest_posts_on_featured` tinyint(1) DEFAULT 0,
  `sort_slider_posts` varchar(100) DEFAULT 'by_slider_order',
  `sort_featured_posts` varchar(100) DEFAULT 'by_featured_order',
  `newsletter` tinyint(1) DEFAULT 1,
  `show_home_link` tinyint(1) DEFAULT 1,
  `post_format_article` tinyint(1) DEFAULT 1,
  `post_format_gallery` tinyint(1) DEFAULT 1,
  `post_format_sorted_list` tinyint(1) DEFAULT 1,
  `post_format_video` tinyint(1) DEFAULT 1,
  `post_format_audio` tinyint(1) DEFAULT 1,
  `post_format_trivia_quiz` tinyint(1) DEFAULT 1,
  `post_format_personality_quiz` tinyint(1) DEFAULT 1,
  `maintenance_mode_title` varchar(500) DEFAULT 'Coming Soon!',
  `maintenance_mode_description` varchar(5000) DEFAULT NULL,
  `maintenance_mode_status` tinyint(1) DEFAULT 0,
  `sitemap_frequency` varchar(30) DEFAULT 'monthly',
  `sitemap_last_modification` varchar(30) DEFAULT 'server_response',
  `sitemap_priority` varchar(30) DEFAULT 'automatically',
  `show_user_email_on_profile` tinyint(1) DEFAULT 1,
  `reward_system_status` tinyint(1) DEFAULT 0,
  `reward_amount` double DEFAULT 1,
  `currency_name` varchar(100) DEFAULT 'US Dollar',
  `currency_symbol` varchar(10) DEFAULT '$',
  `currency_format` varchar(10) DEFAULT 'us',
  `currency_symbol_format` varchar(10) DEFAULT 'left',
  `payout_paypal_status` tinyint(1) DEFAULT 1,
  `payout_iban_status` tinyint(1) DEFAULT 1,
  `payout_swift_status` tinyint(1) DEFAULT 1,
  `cookie_prefix` varchar(50) DEFAULT NULL,
  `last_cron_update` timestamp NULL DEFAULT NULL,
  `version` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `general_settings`
--

INSERT INTO `general_settings` (`id`, `site_lang`, `multilingual_system`, `show_hits`, `show_rss`, `show_newsticker`, `pagination_per_page`, `google_analytics`, `mail_library`, `mail_protocol`, `mail_host`, `mail_port`, `mail_username`, `mail_password`, `mail_title`, `google_client_id`, `google_client_secret`, `vk_app_id`, `vk_secure_key`, `facebook_app_id`, `facebook_app_secret`, `facebook_comment`, `facebook_comment_active`, `show_featured_section`, `show_latest_posts`, `pwa_status`, `registration_system`, `comment_system`, `comment_approval_system`, `show_post_author`, `show_post_date`, `menu_limit`, `custom_css_codes`, `custom_javascript_codes`, `adsense_activation_code`, `vr_key`, `purchase_code`, `recaptcha_site_key`, `recaptcha_secret_key`, `recaptcha_lang`, `emoji_reactions`, `mail_contact_status`, `mail_contact`, `cache_system`, `cache_refresh_time`, `refresh_cache_database_changes`, `email_verification`, `file_manager_show_files`, `audio_download_button`, `approve_added_user_posts`, `approve_updated_user_posts`, `timezone`, `show_latest_posts_on_slider`, `show_latest_posts_on_featured`, `sort_slider_posts`, `sort_featured_posts`, `newsletter`, `show_home_link`, `post_format_article`, `post_format_gallery`, `post_format_sorted_list`, `post_format_video`, `post_format_audio`, `post_format_trivia_quiz`, `post_format_personality_quiz`, `maintenance_mode_title`, `maintenance_mode_description`, `maintenance_mode_status`, `sitemap_frequency`, `sitemap_last_modification`, `sitemap_priority`, `show_user_email_on_profile`, `reward_system_status`, `reward_amount`, `currency_name`, `currency_symbol`, `currency_format`, `currency_symbol_format`, `payout_paypal_status`, `payout_iban_status`, `payout_swift_status`, `cookie_prefix`, `last_cron_update`, `version`) VALUES
(1, 1, 1, 1, 1, 1, 16, NULL, 'swift', 'smtp', NULL, '587', NULL, NULL, 'Varient', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, 1, 0, 1, 1, 1, 1, 1, 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'en', 1, 0, NULL, 0, 180000, 0, 1, 1, 1, 1, 1, 'America/New_York', 0, 0, 'by_slider_order', 'by_featured_order', 1, 1, 1, 1, 1, 1, 1, 1, 1, 'Coming Soon!', 'Our website is under construction. We\'ll be here soon with our new awesome site.', 0, 'weekly', 'server_response', 'automatically', 1, 0, 1, 'US Dollar', '$', 'us', 'left', 1, 1, 1, NULL, '2020-09-13 21:26:46', '1.8');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `image_big` varchar(255) DEFAULT NULL,
  `image_default` varchar(255) DEFAULT NULL,
  `image_slider` varchar(255) DEFAULT NULL,
  `image_mid` varchar(255) DEFAULT NULL,
  `image_small` varchar(255) DEFAULT NULL,
  `image_mime` varchar(50) DEFAULT 'jpg',
  `file_name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short_form` varchar(255) NOT NULL,
  `language_code` varchar(100) NOT NULL,
  `text_direction` varchar(50) NOT NULL,
  `text_editor_lang` varchar(30) DEFAULT 'en',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `language_order` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `short_form`, `language_code`, `text_direction`, `text_editor_lang`, `status`, `language_order`) VALUES
(1, 'English', 'en', 'en-US', 'ltr', 'en', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `language_translations`
--

CREATE TABLE `language_translations` (
  `id` int(11) NOT NULL,
  `lang_id` smallint(6) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `translation` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `language_translations`
--

INSERT INTO `language_translations` (`id`, `lang_id`, `label`, `translation`) VALUES
(1, 1, 'all', 'All'),
(2, 1, 'all_posts', 'All Posts'),
(3, 1, 'add_page', 'Add Page'),
(4, 1, 'add_post', 'Add Post'),
(5, 1, 'add_video', 'Add Video'),
(6, 1, 'add_widget', 'Add Widget'),
(7, 1, 'add_poll', 'Add Poll'),
(8, 1, 'add_category', 'Add Category'),
(9, 1, 'add_subcategory', 'Add Subcategory'),
(10, 1, 'add_audio', 'Add Audio'),
(11, 1, 'add_link', 'Add Menu Link'),
(12, 1, 'add_language', 'Add Language'),
(13, 1, 'add_image', 'Add Image'),
(14, 1, 'add_reading_list', 'Add to Reading List'),
(15, 1, 'ad_spaces', 'Ad Spaces'),
(16, 1, 'admin', 'Admin'),
(17, 1, 'admin_panel', 'Admin Panel'),
(18, 1, 'about_me', 'About Me'),
(19, 1, 'audio', 'Audio'),
(20, 1, 'audios', 'Audios'),
(21, 1, 'auto_update', 'Auto Update'),
(22, 1, 'all_users_can_vote', 'All Users Can Vote'),
(23, 1, 'address', 'Address'),
(24, 1, 'app_name', 'Application Name'),
(25, 1, 'app_id', 'App ID'),
(26, 1, 'app_secret', 'App Secret'),
(27, 1, 'avatar', 'Avatar'),
(28, 1, 'add_featured', 'Add to Featured'),
(29, 1, 'add_breaking', 'Add to Breaking'),
(30, 1, 'add_slider', 'Add to Slider'),
(31, 1, 'add_recommended', 'Add to Recommended'),
(32, 1, 'active', 'Active'),
(33, 1, 'additional_images', 'Additional Images'),
(34, 1, 'approve', 'Approve'),
(35, 1, 'add_image_url', 'Add Image Url'),
(36, 1, 'back', 'Back'),
(37, 1, 'breadcrumb_home', 'Home'),
(38, 1, 'breadcrumb_videos', 'Videos'),
(39, 1, 'btn_send', 'Send'),
(40, 1, 'btn_submit', 'Submit'),
(41, 1, 'btn_reply', 'Reply'),
(42, 1, 'btn_delete', 'Delete'),
(43, 1, 'btn_like', 'Like'),
(44, 1, 'btn_goto_home', 'Go Back to the Homepage'),
(45, 1, 'breaking_news', 'Breaking News'),
(46, 1, 'banned', 'Banned'),
(47, 1, 'ban_user', 'Ban User'),
(48, 1, 'block_color', 'Top Header and Block Heads Color'),
(49, 1, 'breaking', 'Breaking'),
(50, 1, 'category', 'Category'),
(51, 1, 'change_avatar', 'Change Avatar'),
(52, 1, 'change_password', 'Change Password'),
(53, 1, 'create_account', 'Create an Account'),
(54, 1, 'comment', 'Comment'),
(55, 1, 'comments', 'Comments'),
(56, 1, 'custom', 'Custom'),
(57, 1, 'close', 'Close'),
(58, 1, 'contact_messages', 'Contact Messages'),
(59, 1, 'categories', 'Categories'),
(60, 1, 'category_name', 'Category Name'),
(61, 1, 'category_block_style', 'Category Block Style'),
(62, 1, 'configurations', 'Configurations'),
(63, 1, 'color', 'Color'),
(64, 1, 'client_id', 'Client ID'),
(65, 1, 'client_secret', 'Client Secret'),
(66, 1, 'contact', 'Contact'),
(67, 1, 'contact_text', 'Contact Text'),
(68, 1, 'comment_system', 'Comment System'),
(69, 1, 'change_favicon', 'Change favicon'),
(70, 1, 'change_user_role', 'Change User Role'),
(71, 1, 'change_logo', 'Change logo'),
(72, 1, 'copyright', 'Copyright'),
(73, 1, 'contact_settings', 'Contact Settings'),
(74, 1, 'content', 'Content'),
(75, 1, 'confirm_category', 'Are you sure you want to delete this category?'),
(76, 1, 'confirm_image', 'Are you sure you want to delete this image?'),
(77, 1, 'confirm_page', 'Are you sure you want to delete this page?'),
(78, 1, 'confirm_poll', 'Are you sure you want to delete this poll?'),
(79, 1, 'confirm_post', 'Are you sure you want to delete this post?'),
(80, 1, 'confirm_widget', 'Are you sure you want to delete this widget?'),
(81, 1, 'confirm_comment', 'Are you sure you want to delete this comment?'),
(82, 1, 'confirm_message', 'Are you sure you want to delete this message?'),
(83, 1, 'confirm_email', 'Are you sure you want to delete this email?'),
(84, 1, 'confirm_user', 'Are you sure you want to delete this user?'),
(85, 1, 'confirm_ban', 'Are you sure you want to ban this user?'),
(86, 1, 'confirm_remove_ban', 'Are you sure you want to remove ban for this user?'),
(87, 1, 'confirm_link', 'Are you sure you want to delete this link?'),
(88, 1, 'confirm_rss', 'Are you sure you want to delete this feed?'),
(89, 1, 'confirm_language', 'Are you sure you want to delete this language?'),
(90, 1, 'confirm_posts', 'Are you sure you want to delete selected posts?'),
(91, 1, 'confirm_comments', 'Are you sure you want to delete selected comments?'),
(92, 1, 'cookies_warning', 'Cookies Warning'),
(93, 1, 'date', 'Date'),
(94, 1, 'date_added', 'Date Added'),
(95, 1, 'delete', 'Delete'),
(96, 1, 'delete_reading_list', 'Remove from Reading List'),
(97, 1, 'default', 'Default'),
(98, 1, 'disable', 'Disable'),
(99, 1, 'days_remaining', 'Days Remaining'),
(100, 1, 'date_publish', 'Date Published'),
(101, 1, 'drafts', 'Drafts'),
(102, 1, 'description', 'Description'),
(103, 1, 'default_language', 'Default Language'),
(104, 1, 'dont_add_menu', 'Don\'t Add to Menu'),
(105, 1, 'email', 'Email'),
(106, 1, 'edit', 'Edit'),
(107, 1, 'enable', 'Enable'),
(108, 1, 'email_settings', 'Email Settings'),
(109, 1, 'edit_phrases', 'Edit Phrases'),
(110, 1, 'example', 'Example'),
(111, 1, 'featured_posts', 'Featured Posts'),
(112, 1, 'facebook_comments', 'Facebook Comments'),
(113, 1, 'form_username', 'Username'),
(114, 1, 'form_email', 'Email'),
(115, 1, 'form_password', 'Password'),
(116, 1, 'form_old_password', 'Old Password'),
(117, 1, 'form_confirm_password', 'Confirm Password'),
(118, 1, 'footer_random_posts', 'Random Posts'),
(119, 1, 'footer_follow', 'Social Media'),
(120, 1, 'footer_newsletter', 'Subscribe here to get interesting stuff and updates!'),
(121, 1, 'fonts', 'Fonts'),
(122, 1, 'feed_name', 'Feed Name'),
(123, 1, 'feed_url', 'Feed URL'),
(124, 1, 'filter', 'Filter'),
(125, 1, 'file_manager', 'File Manager'),
(126, 1, 'feed', 'Feed'),
(127, 1, 'folder_name', 'Folder Name'),
(128, 1, 'footer_about_section', 'Footer About Section'),
(129, 1, 'facebook_comments_code', 'Facebook Comments Plugin Code'),
(130, 1, 'featured', 'Featured'),
(131, 1, 'featured_order', 'Featured Order'),
(132, 1, 'favicon', 'Favicon'),
(133, 1, 'footer', 'Footer'),
(134, 1, 'gallery', 'Gallery'),
(135, 1, 'gallery_categories', 'Gallery Categories'),
(136, 1, 'general_settings', 'General Settings'),
(137, 1, 'gmail_smtp', 'Gmail SMTP'),
(138, 1, 'google_analytics', 'Google Analytics'),
(139, 1, 'google_analytics_code', 'Google Analytics Code'),
(140, 1, 'google_recaptcha', 'Google reCAPTCHA'),
(141, 1, 'site_key', 'Site Key'),
(142, 1, 'secret_key', 'Secret Key'),
(143, 1, 'get_video_from_url', 'Get Video from URL'),
(144, 1, 'get_video', 'Get Video'),
(145, 1, 'generate', 'Generate'),
(146, 1, 'hide', 'Hide'),
(147, 1, 'home', 'Home'),
(148, 1, 'home_title', 'Home Title'),
(149, 1, 'id', 'Id'),
(150, 1, 'images', 'Images'),
(151, 1, 'image_description', 'Image Description'),
(152, 1, 'index', 'Index'),
(153, 1, 'import_rss_feed', 'Import RSS Feed'),
(154, 1, 'invalid_url', 'Invalid URL!'),
(155, 1, 'image', 'Image'),
(156, 1, 'inactive', 'Inactive'),
(157, 1, 'keywords', 'Keywords'),
(158, 1, 'last_comments', 'Latest Comments'),
(159, 1, 'last_contact_messages', 'Latest Contact Messages'),
(160, 1, 'latest_users', 'Latest Users'),
(161, 1, 'latest_posts', 'Latest Posts'),
(162, 1, 'label', 'Label'),
(163, 1, 'label_video', 'Video'),
(164, 1, 'leave_message', 'Send a Message'),
(165, 1, 'load_more', 'Load More'),
(166, 1, 'login', 'Login'),
(167, 1, 'logout', 'Logout'),
(168, 1, 'login_error', 'Wrong username or password!'),
(169, 1, 'leave_reply', 'Leave a Reply'),
(170, 1, 'language', 'Language'),
(171, 1, 'languages', 'Languages'),
(172, 1, 'language_settings', 'Language Settings'),
(173, 1, 'language_name', 'Language Name'),
(174, 1, 'language_code', 'Language Code'),
(175, 1, 'logo', 'Logo'),
(176, 1, 'logo_footer', 'Logo Footer'),
(177, 1, 'location', 'Location'),
(178, 1, 'link', 'Link'),
(179, 1, 'left_to_right', 'Left to Right'),
(180, 1, 'main_navigation', 'MAIN NAVIGATION'),
(181, 1, 'message', 'Message'),
(182, 1, 'message_email_unique_error', 'The email has already been taken.'),
(183, 1, 'message_newsletter_success', 'Your email address has been successfully added!'),
(184, 1, 'message_newsletter_error', 'Your email address is already registered!'),
(185, 1, 'message_contact_success', 'Your message has been successfully sent!'),
(186, 1, 'message_contact_error', 'There was a problem sending your message!'),
(187, 1, 'message_register_error', 'There was a problem during registration. Please try again!'),
(188, 1, 'message_profile_success', 'Your profile has been successfully updated!'),
(189, 1, 'message_comment_delete', 'Are you sure you want to delete this comment?'),
(190, 1, 'message_invalid_email', 'Invalid email address!'),
(191, 1, 'message_page_auth', 'You must be logged in to view this page!'),
(192, 1, 'message_post_auth', 'You must be logged in to view this post!'),
(193, 1, 'message_change_password_success', 'Your password has been successfully changed!'),
(194, 1, 'message_change_password_error', 'There was a problem changing your password!'),
(195, 1, 'message_ban_error', 'Your account has been banned!'),
(196, 1, 'msg_suc_added', 'successfully added!'),
(197, 1, 'msg_suc_updated', 'successfully updated!'),
(198, 1, 'msg_suc_deleted', 'successfully deleted!'),
(199, 1, 'msg_error', 'An error occurred please try again!'),
(200, 1, 'msg_slug_used', 'The slug you entered is being used by another user!'),
(201, 1, 'msg_email_sent', 'Email successfully sent!'),
(202, 1, 'msg_role_changed', 'User role successfully changed!'),
(203, 1, 'msg_user_banned', 'User successfully banned!'),
(204, 1, 'msg_ban_removed', 'User ban successfully removed!'),
(205, 1, 'msg_delete_subcategories', 'Please delete subcategories belonging to this category first!'),
(206, 1, 'msg_delete_posts', 'Please delete posts belonging to this category first!'),
(207, 1, 'msg_delete_images', 'Please delete images belonging to this category first!'),
(208, 1, 'msg_add_slider', 'Post added to slider!'),
(209, 1, 'msg_remove_slider', 'Post removed from slider!'),
(210, 1, 'msg_add_featured', 'Post added to featured posts!'),
(211, 1, 'msg_remove_featured', 'Post removed from featured posts!'),
(212, 1, 'msg_add_breaking', 'Post added to breaking news!'),
(213, 1, 'msg_remove_breaking', 'Post removed from breaking news!'),
(214, 1, 'msg_add_recommended', 'Post added to recommended posts!'),
(215, 1, 'msg_remove_recommended', 'Post removed from recommended posts!'),
(216, 1, 'msg_post_approved', 'Post approved!'),
(217, 1, 'msg_page_delete', 'Default pages cannot be deleted!'),
(218, 1, 'msg_language_delete', 'Default language cannot be deleted!'),
(219, 1, 'msg_widget_delete', 'Default widgets cannot be deleted!'),
(220, 1, 'msg_published', 'Post successfully published!'),
(221, 1, 'msg_recaptcha', 'Please confirm that you are not a robot!'),
(222, 1, 'msg_cron_sitemap', 'With this URL you can automatically update your sitemap.'),
(223, 1, 'msg_cron_feed', 'With this URL you can automatically update your feeds.'),
(224, 1, 'multilingual_system', 'Multilingual System'),
(225, 1, 'more_info', 'More info'),
(226, 1, 'meta_tag', 'Meta Tag'),
(227, 1, 'mail_protocol', 'Mail Protocol'),
(228, 1, 'mail', 'Mail'),
(229, 1, 'mail_title', 'Mail Title'),
(230, 1, 'mail_host', 'Mail Host'),
(231, 1, 'mail_port', 'Mail Port'),
(232, 1, 'mail_username', 'Mail Username'),
(233, 1, 'mail_password', 'Mail Password'),
(234, 1, 'menu_limit', 'Menu Limit '),
(235, 1, 'main_menu', 'Main Menu'),
(236, 1, 'name', 'Name'),
(237, 1, 'nav_home', 'Home'),
(238, 1, 'nav_login', 'Login'),
(239, 1, 'nav_register', 'Register'),
(240, 1, 'nav_reset_password', 'Reset Password'),
(241, 1, 'next_article', 'Next Article'),
(242, 1, 'next_video', 'Next Video'),
(243, 1, 'no', 'No'),
(244, 1, 'newsletter', 'Newsletter'),
(245, 1, 'navigation', 'Navigation'),
(246, 1, 'number_of_posts_import', 'Number of Posts to Import'),
(247, 1, 'or', 'or'),
(248, 1, 'options', 'Options'),
(249, 1, 'online', 'online'),
(250, 1, 'option_1', 'Option 1'),
(251, 1, 'option_2', 'Option 2'),
(252, 1, 'option_3', 'Option 3'),
(253, 1, 'option_4', 'Option 4'),
(254, 1, 'option_5', 'Option 5'),
(255, 1, 'option_6', 'Option 6'),
(256, 1, 'option_7', 'Option 7'),
(257, 1, 'option_8', 'Option 8'),
(258, 1, 'option_9', 'Option 9'),
(259, 1, 'option_10', 'Option 10'),
(260, 1, 'optional', 'Optional'),
(261, 1, 'order', 'Menu Order'),
(262, 1, 'order_1', 'Order'),
(263, 1, 'optional_url', 'Optional URL'),
(264, 1, 'optional_url_name', 'Post Optional URL Button Name'),
(265, 1, 'only_registered', 'Only Registered'),
(266, 1, 'page', 'Page'),
(267, 1, 'pages', 'Pages'),
(268, 1, 'page_type', 'Page Type'),
(269, 1, 'page_not_found', 'Page not found'),
(270, 1, 'page_not_found_sub', 'The page you are looking for doesn\'t exist.'),
(271, 1, 'panel', 'Panel'),
(272, 1, 'previous_article', 'Previous Article'),
(273, 1, 'previous_video', 'Previous Video'),
(274, 1, 'placeholder_username', 'Username'),
(275, 1, 'placeholder_password', 'Password'),
(276, 1, 'placeholder_search', 'Search...'),
(277, 1, 'placeholder_email', 'Email Address'),
(278, 1, 'placeholder_message', 'Message'),
(279, 1, 'placeholder_comment', 'Comment...'),
(280, 1, 'placeholder_old_password', 'Old Password'),
(281, 1, 'placeholder_confirm_password', 'Confirm Password'),
(282, 1, 'placeholder_about_me', 'About Me'),
(283, 1, 'post', 'Post'),
(284, 1, 'posts', 'Posts'),
(285, 1, 'pending_posts', 'Pending Posts'),
(286, 1, 'post_tags', 'Tags:'),
(287, 1, 'popular_posts', 'Popular Posts'),
(288, 1, 'polls', 'Polls'),
(289, 1, 'poll', 'Poll'),
(290, 1, 'profile', 'Profile'),
(291, 1, 'preferences', 'Preferences'),
(292, 1, 'parent_category', 'Parent Category'),
(293, 1, 'publish', 'Publish'),
(294, 1, 'post_type', 'Post Type'),
(295, 1, 'parent_link', 'Parent Link'),
(296, 1, 'post_details', 'Post Details'),
(297, 1, 'play_list_empty', 'Playlist is empty.'),
(298, 1, 'pagination_number_posts', 'Number of Posts Per Page (Pagination)'),
(299, 1, 'phone', 'Phone'),
(300, 1, 'priority', 'Priority'),
(301, 1, 'priority_exp', 'The priority of a particular URL relative to other pages on the same site'),
(302, 1, 'priority_none', 'Automatically Calculated Priority'),
(303, 1, 'post_list_style', 'Post Item List Style'),
(304, 1, 'phrases', 'Phrases'),
(305, 1, 'question', 'Question'),
(306, 1, 'remember_me', 'Remember Me'),
(307, 1, 'register', 'Register'),
(308, 1, 'reset_password_error', 'We can\'t find a user with that e-mail address!'),
(309, 1, 'random_posts', 'Random Posts'),
(310, 1, 'reset_password', 'Reset Password'),
(311, 1, 'related_posts', 'Related Posts'),
(312, 1, 'related_videos', 'Related Videos'),
(313, 1, 'reading_list', 'Reading List'),
(314, 1, 'recommended_posts', 'Recommended Posts'),
(315, 1, 'rss_feeds', 'RSS Feeds'),
(316, 1, 'read_more_button_text', 'Read More Button Text'),
(317, 1, 'registered_users_can_vote', 'Only Registered Users Can Vote'),
(318, 1, 'role', 'Role'),
(319, 1, 'remove_ban', 'Remove Ban'),
(320, 1, 'registered_emails', 'Registered Emails'),
(321, 1, 'registration_system', 'Registration System'),
(322, 1, 'rss', 'RSS'),
(323, 1, 'remove_featured', 'Remove from Featured'),
(324, 1, 'remove_breaking', 'Remove from Breaking'),
(325, 1, 'remove_recommended', 'Remove from Recommended'),
(326, 1, 'remove_slider', 'Remove from Slider'),
(327, 1, 'recommended', 'Recommended'),
(328, 1, 'right_to_left', 'Right to Left'),
(329, 1, 'save_changes', 'Save Changes'),
(330, 1, 'social_accounts', 'Social Accounts'),
(331, 1, 'search_noresult', 'No results found.'),
(332, 1, 'share', 'Share'),
(333, 1, 'search', 'Search'),
(334, 1, 'slider_posts', 'Slider Posts'),
(335, 1, 'slug', 'Slug'),
(336, 1, 'show', 'Show'),
(337, 1, 'short_form', 'Short Form'),
(338, 1, 'select', 'Select'),
(339, 1, 'select_an_option', 'Select an option'),
(340, 1, 'select_category', 'Select a category'),
(341, 1, 'seo_tools', 'SEO Tools'),
(342, 1, 'seo_options', 'Seo options'),
(343, 1, 'social_login_configuration', 'Social Login Configuration'),
(344, 1, 'settings', 'Settings'),
(345, 1, 'show_at_homepage', 'Show on Homepage'),
(346, 1, 'show_cookies_warning', 'Show Cookies Warning'),
(347, 1, 'slug_exp', 'If you leave it blank, it will be generated automatically.'),
(348, 1, 'subcategory', 'Subcategory'),
(349, 1, 'subcategories', 'Subcategories'),
(350, 1, 'select_image', 'Select Image'),
(351, 1, 'select_audio', 'Select Audio'),
(352, 1, 'select_video', 'Select Video'),
(353, 1, 'show_only_registered', 'Show Only to Registered Users'),
(354, 1, 'show_title', 'Show Title'),
(355, 1, 'show_breadcrumb', 'Show Breadcrumb'),
(356, 1, 'show_right_column', 'Show Right Column'),
(357, 1, 'status', 'Status'),
(358, 1, 'summary', 'Summary'),
(359, 1, 'show_read_more_button', 'Show Read More Button'),
(360, 1, 'save_draft', 'Save as Draft'),
(361, 1, 'smtp', 'SMTP'),
(362, 1, 'social_media_settings', 'Social Media Settings'),
(363, 1, 'shared', 'Shared'),
(364, 1, 'show_featured_section', 'Show Featured Section'),
(365, 1, 'show_latest_posts_homepage', 'Show Latest Posts on Homepage'),
(366, 1, 'show_news_ticker', 'Show News Ticker'),
(367, 1, 'show_post_author', 'Show Post Author'),
(368, 1, 'show_post_dates', 'Show Post Date'),
(369, 1, 'show_post_view_counts', 'Show Post View Count'),
(370, 1, 'site_title', 'Site Title'),
(371, 1, 'site_description', 'Site Description'),
(372, 1, 'send_email_registered', 'Send Email to Registered Emails'),
(373, 1, 'subject', 'Subject'),
(374, 1, 'send_email', 'Send Email'),
(375, 1, 'save', 'Save'),
(376, 1, 'site_color', 'Site Color'),
(377, 1, 'sitemap', 'Sitemap'),
(378, 1, 'scheduled_posts', 'Scheduled Posts'),
(379, 1, 'scheduled_post', 'Scheduled Post'),
(380, 1, 'select_file', 'Select File'),
(381, 1, 'show_on_menu', 'Show on Menu'),
(382, 1, 'slider_order', 'Slider Order'),
(383, 1, 'slider', 'Slider'),
(384, 1, 'settings_language', 'Settings Language'),
(385, 1, 'tag', 'Tag'),
(386, 1, 'text_list_empty', 'Your reading list is empty.'),
(387, 1, 'total_vote', 'Total Vote:'),
(388, 1, 'tags', 'Tags'),
(389, 1, 'type_tag', 'Type tag and hit enter'),
(390, 1, 'title', 'Title'),
(391, 1, 'top_menu', 'Top Menu'),
(392, 1, 'text_direction', 'Text Direction'),
(393, 1, 'type', 'Type'),
(394, 1, 'phrase', 'Phrase'),
(395, 1, 'update_profile', 'Update Profile'),
(396, 1, 'user', 'User'),
(397, 1, 'users', 'Users'),
(398, 1, 'username', 'Username'),
(399, 1, 'user_agreement', 'User Agreement'),
(400, 1, 'update_category', 'Update Category'),
(401, 1, 'update_subcategory', 'Update Subcategory'),
(402, 1, 'update_image', 'Update Image'),
(403, 1, 'update_link', 'Update Menu Link'),
(404, 1, 'update_rss_feed', 'Update RSS Feed'),
(405, 1, 'upload', 'Upload'),
(406, 1, 'update', 'Update'),
(407, 1, 'update_widget', 'Update Widget'),
(408, 1, 'upload_video', 'Upload Video'),
(409, 1, 'update_video', 'Update Video'),
(410, 1, 'update_page', 'Update Page'),
(411, 1, 'update_poll', 'Update Poll'),
(412, 1, 'update_post', 'Update Post'),
(413, 1, 'update_language', 'Update Language'),
(414, 1, 'update_sitemap', 'Update Sitemap'),
(415, 1, 'url', 'URL'),
(416, 1, 'view_all', 'View All'),
(417, 1, 'view_all_posts', 'View All Posts'),
(418, 1, 'view_options', 'View Options'),
(419, 1, 'view_results', 'View Results'),
(420, 1, 'view_site', 'View Site'),
(421, 1, 'video', 'Video'),
(422, 1, 'videos', 'Videos'),
(423, 1, 'vote', 'Vote'),
(424, 1, 'voted_message', 'You already voted this poll before.'),
(425, 1, 'visual_settings', 'Visual Settings'),
(426, 1, 'view_result', 'View Results'),
(427, 1, 'visibility', 'Visibility'),
(428, 1, 'download_button', 'Download Button'),
(429, 1, 'musician', 'Musician'),
(430, 1, 'video_embed_code', 'Video Embed Code'),
(431, 1, 'video_thumbnails', 'Video Thumbnail'),
(432, 1, 'image_for_video', 'Image for video'),
(433, 1, 'video_url', 'Video URL'),
(434, 1, 'video_name', 'Video Name'),
(435, 1, 'video_file', 'Video File'),
(436, 1, 'vote_permission', 'Vote Permission'),
(437, 1, 'widget', 'Widget'),
(438, 1, 'widgets', 'Widgets'),
(439, 1, 'wrong_password_error', 'Wrong old password!'),
(440, 1, 'yes', 'Yes'),
(441, 1, 'facebook', 'Facebook'),
(442, 1, 'twitter', 'Twitter'),
(443, 1, 'google', 'Google'),
(444, 1, 'January', 'Jan'),
(445, 1, 'February', 'Feb'),
(446, 1, 'March', 'Mar'),
(447, 1, 'April', 'Apr'),
(448, 1, 'May', 'May'),
(449, 1, 'June', 'Jun'),
(450, 1, 'July', 'Jul'),
(451, 1, 'August', 'Aug'),
(452, 1, 'September', 'Sep'),
(453, 1, 'October', 'Oct'),
(454, 1, 'November', 'Nov'),
(455, 1, 'December', 'Dec'),
(456, 1, 'select_ad_spaces', 'Select Ad Space'),
(457, 1, 'ad_space', 'Ad Space'),
(458, 1, 'header_top_ad_space', 'Header'),
(459, 1, 'index_top_ad_space', 'Index (Top)'),
(460, 1, 'index_bottom_ad_space', 'Index (Bottom)'),
(461, 1, 'post_top_ad_space', 'Post Details (Top)'),
(462, 1, 'post_bottom_ad_space', 'Post Details (Bottom)'),
(463, 1, 'posts_top_ad_space', 'Posts (Top)'),
(464, 1, 'posts_bottom_ad_space', 'Posts (Bottom)'),
(465, 1, 'category_top_ad_space', 'Category (Top)'),
(466, 1, 'category_bottom_ad_space', 'Category (Bottom)'),
(467, 1, 'tag_top_ad_space', 'Tag (Top)'),
(468, 1, 'tag_bottom_ad_space', 'Tag (Bottom)'),
(469, 1, 'search_top_ad_space', 'Search (Top)'),
(470, 1, 'search_bottom_ad_space', 'Search (Bottom)'),
(471, 1, 'profile_top_ad_space', 'Profile &#40;Top&#41;'),
(472, 1, 'profile_bottom_ad_space', 'Profile &#40;Bottom&#41;'),
(473, 1, 'reading_list_top_ad_space', 'Reading List (Top)'),
(474, 1, 'reading_list_bottom_ad_space', 'Reading List (Bottom)'),
(475, 1, 'sidebar_top_ad_space', 'Sidebar (Top)'),
(476, 1, 'sidebar_bottom_ad_space', 'Sidebar (Bottom)'),
(477, 1, 'banner', 'Banner'),
(478, 1, 'paste_ad_code', 'Ad Code'),
(479, 1, 'upload_your_banner', 'Create Ad Code'),
(480, 1, 'paste_ad_url', 'Ad URL'),
(481, 1, 'primary_font', 'Primary Font (Main)'),
(482, 1, 'secondary_font', 'Secondary Font (Titles)'),
(483, 1, 'tertiary_font', 'Tertiary Font (Post & Page Text)'),
(484, 1, 'download_sitemap', 'Download Sitemap'),
(485, 1, 'frequency', 'Frequency'),
(486, 1, 'frequency_exp', 'This value indicates how frequently the content at a particular URL is likely to change'),
(487, 1, 'none', 'None'),
(488, 1, 'always', 'Always'),
(489, 1, 'hourly', 'Hourly'),
(490, 1, 'daily', 'Daily'),
(491, 1, 'weekly', 'Weekly'),
(492, 1, 'monthly', 'Monthly'),
(493, 1, 'yearly', 'Yearly'),
(494, 1, 'never', 'Never'),
(495, 1, 'last_modification', 'Last Modification'),
(496, 1, 'last_modification_exp', 'The time the URL was last modified'),
(497, 1, 'server_response', 'Server\'s Response'),
(498, 1, 'form_validation_required', 'The {field} field is required.'),
(499, 1, 'form_validation_min_length', 'The {field} field must be at least {param} characters in length.'),
(500, 1, 'form_validation_max_length', 'The {field} field cannot exceed {param} characters in length.'),
(501, 1, 'form_validation_matches', 'The {field} field does not match the {param} field.'),
(502, 1, 'form_validation_is_unique', 'The {field} field must contain a unique value.'),
(503, 1, 'emoji_reactions', 'Emoji Reactions'),
(504, 1, 'whats_your_reaction', 'What\'s Your Reaction?'),
(505, 1, 'like', 'Like'),
(506, 1, 'dislike', 'Dislike'),
(507, 1, 'love', 'Love'),
(508, 1, 'funny', 'Funny'),
(509, 1, 'angry', 'Angry'),
(510, 1, 'sad', 'Sad'),
(511, 1, 'wow', 'Wow'),
(512, 1, 'admin_panel_link', 'Admin Panel Link'),
(513, 1, 'number_of_links_in_menu', 'The number of links that appear in the menu'),
(514, 1, 'no_records_found', 'No records found.'),
(515, 1, 'reset', 'Reset'),
(516, 1, 'send_email_subscribers', 'Send Email to Subscribers'),
(517, 1, 'subscribe', 'Subscribe'),
(518, 1, 'subscribers', 'Subscribers'),
(519, 1, 'logo_email', 'Logo Email'),
(520, 1, 'preview', 'Preview'),
(521, 1, 'hit', 'Hit'),
(522, 1, 'post_owner', 'Post Owner'),
(523, 1, 'send_contact_to_mail', 'Send Contact Messages to Email Address'),
(524, 1, 'contact_messages_will_send', 'Contact messages will be sent to this email.'),
(525, 1, 'msg_updated', 'Changes successfully saved!'),
(526, 1, 'msg_user_added', 'User successfully added!'),
(527, 1, 'contact_message', 'Contact Message'),
(528, 1, 'dont_want_receive_emails', 'Don\'t want receive these emails?'),
(529, 1, 'unsubscribe', 'Unsubscribe'),
(530, 1, 'unsubscribe_successful', 'Unsubscribe Successful!'),
(531, 1, 'send_post_to_subscribes', 'Send Post to All Subscribers (Newsletter)'),
(532, 1, 'msg_unsubscribe', 'You will no longer receive emails from us!'),
(533, 1, 'invalid_feed_url', 'Invalid feed URL!'),
(534, 1, 'cache_system', 'Cache System'),
(535, 1, 'cache_refresh_time', 'Cache Refresh Time (Minute)'),
(536, 1, 'cache_refresh_time_exp', 'After this time, your cache files will be refreshed.'),
(537, 1, 'refresh_cache_database_changes', 'Refresh Cache Files When Database Changes'),
(538, 1, 'reset_cache', 'Reset Cache'),
(539, 1, 'msg_reset_cache', 'All cache files have been deleted!'),
(540, 1, 'choose_post_format', 'Choose a Post Format'),
(541, 1, 'article', 'Article'),
(542, 1, 'add_user', 'Add User'),
(543, 1, 'administrators', 'Administrators'),
(544, 1, 'msg_username_unique_error', 'The username has already been taken.'),
(545, 1, 'add_posts_as_draft', 'Add Posts as Draft'),
(546, 1, 'roles_permissions', 'Roles & Permissions'),
(547, 1, 'permissions', 'Permissions'),
(548, 1, 'all_permissions', 'All Permissions'),
(549, 1, 'manage_all_posts', 'Manage All Posts'),
(550, 1, 'edit_role', 'Edit Role'),
(551, 1, 'role_name', 'Role Name'),
(552, 1, 'msg_not_authorized', 'You are not authorized to perform this operation!'),
(553, 1, 'show_all_files', 'Show all Files'),
(554, 1, 'show_only_own_files', 'Show Only Users Own Files'),
(555, 1, 'approve_added_user_posts', 'Approve Added User Posts'),
(556, 1, 'approve_updated_user_posts', 'Approve Updated User Posts'),
(557, 1, 'this_week', 'This Week'),
(558, 1, 'this_month', 'This Month'),
(559, 1, 'all_time', 'All Time'),
(560, 1, 'timezone', 'Timezone'),
(561, 1, 'msg_send_confirmation_email', 'A confirmation email has been sent to your email address for activation. Please confirm your account.'),
(562, 1, 'msg_confirmation_email', 'Please confirm your email address by clicking the button below.'),
(563, 1, 'msg_confirmed', 'Your email address has been successfully confirmed!'),
(564, 1, 'msg_confirmed_required', 'Please verify your email address!'),
(565, 1, 'confirmed', 'Confirmed'),
(566, 1, 'unconfirmed', 'Unconfirmed'),
(567, 1, 'confirm_your_email', 'Confirm Your Email'),
(568, 1, 'email_verification', 'Email Verification'),
(569, 1, 'resend_activation_email', 'Resend Activation Email'),
(570, 1, 'please_select_option', 'Please select an option!'),
(571, 1, 'just_now', 'Just Now'),
(572, 1, 'ago', 'ago'),
(573, 1, 'minute', 'minute'),
(574, 1, 'minutes', 'minutes'),
(575, 1, 'hour', 'hour'),
(576, 1, 'hours', 'hours'),
(577, 1, 'day', 'day'),
(578, 1, 'days', 'days'),
(579, 1, 'month', 'month'),
(580, 1, 'months', 'months'),
(581, 1, 'year', 'year'),
(582, 1, 'years', 'years'),
(583, 1, 'follow', 'Follow'),
(584, 1, 'unfollow', 'Unfollow'),
(585, 1, 'following', 'Following'),
(586, 1, 'followers', 'Followers'),
(587, 1, 'member_since', 'Member since'),
(588, 1, 'email_template', 'Email Template'),
(589, 1, 'confirm_user_email', 'Confirm User Email'),
(590, 1, 'warning', 'Warning'),
(591, 1, 'gmail_warning', 'To send e-mails with Gmail server, please read Email Settings section in our documentation.'),
(592, 1, 'album', 'Album'),
(593, 1, 'albums', 'Albums'),
(594, 1, 'gallery_albums', 'Gallery Albums'),
(595, 1, 'add_album', 'Add Album'),
(596, 1, 'album_name', 'Album Name'),
(597, 1, 'msg_delete_album', 'Please delete categories belonging to this album first!'),
(598, 1, 'confirm_album', 'Are you sure you want to delete this album?'),
(599, 1, 'update_album', 'Update Album'),
(600, 1, 'select_multiple_images', 'You can select multiple images.'),
(601, 1, 'album_cover', 'Album Cover'),
(602, 1, 'set_as_album_cover', 'Set as Album Cover'),
(603, 1, 'show_email_on_profile', 'Show Email on Profile Page'),
(604, 1, 'mail_library', 'Mail Library'),
(605, 1, 'terms_conditions', 'Terms & Conditions'),
(606, 1, 'terms_conditions_exp', 'I have read and agree to the'),
(607, 1, 'forgot_password', 'Forgot Password'),
(608, 1, 'email_reset_password', 'Please click on the button below to reset your password.'),
(609, 1, 'reset_password_success', 'We\'ve sent an email for resetting your password to your email address. Please check your email for next steps.'),
(610, 1, 'new_password', 'New Password'),
(611, 1, 'or_register_with_email', 'Or register with email'),
(612, 1, 'or_login_with_email', 'Or login with email'),
(613, 1, 'enter_email_address', 'Enter your email address'),
(614, 1, 'enter_new_password', 'Enter your new password'),
(615, 1, 'to', 'To:'),
(616, 1, 'send_email_subscriber', 'Send Email to Subscriber'),
(617, 1, 'post_comment', 'Post Comment'),
(618, 1, 'load_more_comments', 'Load More Comments'),
(619, 1, 'author', 'Author'),
(620, 1, 'msg_cron_scheduled', 'If you want to automatically publish scheduled posts, you should create a Cron Job function with this URL. For more information, please read the documentation.'),
(621, 1, 'confirm_messages', 'Are you sure you want to delete selected messages?'),
(622, 1, 'sort_slider_posts', 'Sort Slider Posts'),
(623, 1, 'sort_featured_posts', 'Sort Featured Posts'),
(624, 1, 'by_date', 'by Date'),
(625, 1, 'by_slider_order', 'by Slider Order'),
(626, 1, 'by_featured_order', 'by Featured Order'),
(627, 1, 'uploading', 'Uploading...'),
(628, 1, 'vkontakte', 'VKontakte'),
(629, 1, 'add_gallery', 'Add Gallery'),
(630, 1, 'update_gallery', 'Update Gallery'),
(631, 1, 'gallery_post_items', 'Gallery Post Items'),
(632, 1, 'add_new_item', 'Add New Item'),
(633, 1, 'confirm_item', 'Are you sure you want to delete this item?'),
(634, 1, 'gallery_post', 'Gallery Post'),
(635, 1, 'next', 'Next'),
(636, 1, 'previous', 'Previous'),
(637, 1, 'gallery_post_exp', 'A collection of images'),
(638, 1, 'add_article', 'Add Article'),
(639, 1, 'update_article', 'Update Article'),
(640, 1, 'update_audio', 'Update Audio'),
(641, 1, 'last_seen', 'Last seen:'),
(642, 1, 'connect_with_facebook', 'Connect with Facebook'),
(643, 1, 'connect_with_google', 'Connect with Google'),
(644, 1, 'connect_with_vk', 'Connect with VK'),
(645, 1, 'ip_address', 'Ip Address'),
(646, 1, 'show_item_numbers', 'Show Item Numbers in Post Details Page'),
(647, 1, 'secure_key', 'Secure Key'),
(648, 1, 'embed_media', 'Embed Media'),
(649, 1, 'add_iframe', 'Add Iframe'),
(650, 1, 'text_editor_language', 'Text Editor Language'),
(651, 1, 'upload_image', 'Upload Image'),
(652, 1, 'drag_drop_files_here', 'Drag and drop files here or'),
(653, 1, 'drag_drop_file_here', 'Drag and drop file here or'),
(654, 1, 'browse_files', 'Browse Files'),
(655, 1, 'txt_processing', 'Processing...'),
(656, 1, 'file_upload', 'File Upload'),
(657, 1, 'pageviews', 'Pageviews'),
(658, 1, 'show_images_from_original_source', 'Show Images from Original Source'),
(659, 1, 'download_images_my_server', 'Download Images to My Server'),
(660, 1, 'maintenance_mode', 'Maintenance Mode'),
(661, 1, 'post_options', 'Post Options'),
(662, 1, 'route_settings', 'Route Settings'),
(663, 1, 'route_settings_warning', 'You cannot use special characters in routes. If your language contains special characters, please be careful when editing routes. If you enter an invalid route, you will not be able to access the related page.'),
(664, 1, 'general', 'General'),
(665, 1, 'homepage', 'Homepage'),
(666, 1, 'main_post_image', 'Main post image'),
(667, 1, 'more_main_images', 'More main images (slider will be active)'),
(668, 1, 'files', 'Files'),
(669, 1, 'files_exp', 'Downloadable additional files (.pdf, .docx, .zip etc..)'),
(670, 1, 'audios_exp', 'Select your audios and create your playlist'),
(671, 1, 'msg_beforeunload', 'You have unsaved changes! Are you sure you want to leave this page?'),
(672, 1, 'item_order', 'Item Order'),
(673, 1, 'trivia_quiz', 'Trivia Quiz'),
(674, 1, 'trivia_quiz_exp', 'Quizzes with right and wrong answers'),
(675, 1, 'personality_quiz', 'Personality Quiz'),
(676, 1, 'personality_quiz_exp', 'Quizzes with custom results'),
(677, 1, 'add_quiz', 'Add Quiz'),
(678, 1, 'add_trivia_quiz', 'Add Trivia Quiz'),
(679, 1, 'add_personality_quiz', 'Add Personality Quiz'),
(680, 1, 'update_trivia_quiz', 'Update Trivia Quiz'),
(681, 1, 'update_personality_quiz', 'Update Personality Quiz'),
(682, 1, 'questions', 'Questions'),
(683, 1, 'confirm_question', 'Are you sure you want to delete this question?'),
(684, 1, 'confirm_answer', 'Are you sure you want to delete this answer?'),
(685, 1, 'confirm_result', 'Are you sure you want to delete this result?'),
(686, 1, 'add_question', 'Add Question'),
(687, 1, 'answer_text', 'Answer Text'),
(688, 1, 'add_answer', 'Add Answer'),
(689, 1, 'answers', 'Answers'),
(690, 1, 'correct', 'Correct'),
(691, 1, 'correct_answer', 'Correct Answer'),
(692, 1, 'wrong_answer', 'Wrong Answer'),
(693, 1, 'quiz_images', 'Quiz Images'),
(694, 1, 'answer_format', 'Answer Format'),
(695, 1, 'result', 'Result'),
(696, 1, 'results', 'Results'),
(697, 1, 'add_result', 'Add Result'),
(698, 1, 'min', 'Min'),
(699, 1, 'max', 'Max'),
(700, 1, 'number_of_correct_answers', 'Number of Correct Answers'),
(701, 1, 'number_of_correct_answers_range', 'The range of correct answers to show this result'),
(702, 1, 'play_again', 'Play Again'),
(703, 1, 'select_a_result', 'Select a result'),
(704, 1, 'msg_added', 'Item successfully added!'),
(705, 1, 'msg_deleted', 'Item successfully deleted!'),
(706, 1, 'post_formats', 'Post Formats'),
(707, 1, 'font_settings', 'Font Settings'),
(708, 1, 'font_family', 'Font Family'),
(709, 1, 'add_font', 'Add Font'),
(710, 1, 'update_font', 'Update Font'),
(711, 1, 'site_font', 'Site Font'),
(712, 1, 'custom_css_codes', 'Custom CSS Codes'),
(713, 1, 'custom_css_codes_exp', 'These codes will be added to the header of the site.'),
(714, 1, 'custom_javascript_codes', 'Custom JavaScript Codes'),
(715, 1, 'custom_javascript_codes_exp', 'These codes will be added to the footer of the site.'),
(716, 1, 'adsense_activation_code', 'AdSense Activation Code'),
(717, 1, 'comment_approval_system', 'Comment Approval System'),
(718, 1, 'msg_comment_sent_successfully', 'Your comment has been sent. It will be published after being reviewed by the site management.'),
(719, 1, 'msg_comment_approved', 'Comment successfully approved!'),
(720, 1, 'pending_comments', 'Pending Comments'),
(721, 1, 'approved_comments', 'Approved Comments'),
(722, 1, 'recently_added_comments', 'Recently added comments'),
(723, 1, 'recently_added_unapproved_comments', 'Recently added unapproved comments'),
(724, 1, 'recently_added_contact_messages', 'Recently added contact messages'),
(725, 1, 'recently_registered_users', 'Recently registered users'),
(726, 1, 'audio_download_button', 'Audio Download Button'),
(727, 1, 'updated', 'Updated'),
(728, 1, 'themes', 'Themes'),
(729, 1, 'activate', 'Activate'),
(730, 1, 'activated', 'Activated'),
(731, 1, 'dark_mode', 'Dark Mode'),
(732, 1, 'ok', 'OK'),
(733, 1, 'cancel', 'Cancel'),
(734, 1, 'navigation_exp', 'You can manage the navigation by dragging and dropping menu items.'),
(735, 1, 'nav_drag_warning', 'You cannot drag a category below a page or a page below a category link!'),
(736, 1, 'article_post_exp', 'An article with images and embed videos'),
(737, 1, 'video_post_exp', 'Upload or embed videos'),
(738, 1, 'audio_post_exp', 'Upload audios and create playlist'),
(739, 1, 'sorted_list', 'Sorted List'),
(740, 1, 'add_sorted_list', 'Add Sorted List'),
(741, 1, 'update_sorted_list', 'Update Sorted List'),
(742, 1, 'sorted_list_items', 'Sorted List Items'),
(743, 1, 'sorted_list_exp', 'A list based article'),
(744, 1, 'invalid', 'Invalid!'),
(745, 1, 'msg_delete_subpages', 'Please delete subpages/sublinks first!'),
(746, 1, 'msg_rss_warning', 'If you chose to download the images to your server, adding posts will take more time and will use more resources. If you see any problems, increase \'max_execution_time\' and \'memory_limit\' values from your server settings.'),
(747, 1, 'send_test_email', 'Send Test Email'),
(748, 1, 'send_test_email_exp', 'You can send a test mail to check if your mail server is working.'),
(749, 1, 'edit_translations', 'Edit Translations'),
(750, 1, 'dashboard', 'Dashboard'),
(751, 1, 'earnings', 'Earnings'),
(752, 1, 'payouts', 'Payouts'),
(753, 1, 'pageviews', 'Pageviews'),
(754, 1, 'reward_system', 'Reward System'),
(755, 1, 'reward_amount', 'Reward Amount for 1000 Pageviews'),
(756, 1, 'currency_name', 'Currency Name'),
(757, 1, 'currency_symbol', 'Currency Symbol'),
(758, 1, 'currency_format', 'Currency Format'),
(759, 1, 'currency', 'Currency'),
(760, 1, 'user_id', 'User Id'),
(761, 1, 'total_pageviews', 'Total Pageviews'),
(762, 1, 'balance', 'Balance'),
(763, 1, 'currency_symbol_format', 'Currency Symbol Format'),
(764, 1, 'left', 'Left'),
(765, 1, 'right', 'Right'),
(766, 1, 'payouts', 'Payouts'),
(767, 1, 'amount', 'Amount'),
(768, 1, 'payout_method', 'Payout Method'),
(769, 1, 'payout_methods', 'Payout Methods'),
(770, 1, 'cookie_prefix', 'Cookie Prefix'),
(771, 1, 'add_payout', 'Add Payout'),
(772, 1, 'insufficient_balance', 'Insufficient balance!'),
(773, 1, 'msg_payout_added', 'Payout has been successfully added!'),
(774, 1, 'confirm_record', 'Are you sure you want to delete this record?'),
(775, 1, 'paypal', 'PayPal'),
(776, 1, 'iban', 'IBAN'),
(777, 1, 'swift', 'SWIFT'),
(778, 1, 'set_payout_account', 'Set Payout Account'),
(779, 1, 'paypal_email_address', 'PayPal Email Address'),
(780, 1, 'set_default_payment_account', 'Set as Default Payment Account'),
(781, 1, 'full_name', 'Full Name'),
(782, 1, 'bank_name', 'Bank Name'),
(783, 1, 'iban_long', 'International Bank Account Number'),
(784, 1, 'swift_iban', 'Bank Account Number/IBAN'),
(785, 1, 'postcode', 'Postcode'),
(786, 1, 'bank_account_holder_name', 'Bank Account Holder\'s Name'),
(787, 1, 'bank_branch_country', 'Bank Branch Country'),
(788, 1, 'bank_branch_city', 'Bank Branch City'),
(789, 1, 'swift_code', 'SWIFT Code'),
(790, 1, 'country', 'Country'),
(791, 1, 'state', 'State'),
(792, 1, 'city', 'City'),
(793, 1, 'warning_default_payout_account', 'Your earnings will be sent to your default payout account.'),
(794, 1, 'user_agent', 'User-Agent'),
(795, 1, 'upload_csv_file', 'Upload CSV File'),
(796, 1, 'completed', 'Completed'),
(797, 1, 'help_documents', 'Help Documents'),
(798, 1, 'help_documents_exp', 'You can use these documents to generate your CSV file'),
(799, 1, 'category_ids_list', 'Category Ids list'),
(800, 1, 'download_csv_template', 'Download CSV Template'),
(801, 1, 'download_csv_example', 'Download CSV Example'),
(802, 1, 'bulk_post_upload', 'Bulk Post Upload'),
(803, 1, 'bulk_post_upload_exp', 'You can add your posts with a CSV file from this section'),
(804, 1, 'importing_posts', 'Importing posts...'),
(805, 1, 'documentation', 'Documentation'),
(806, 1, 'field', 'Field'),
(807, 1, 'data_type', 'Data Type'),
(808, 1, 'required', 'Required'),
(809, 1, 'optional', 'Optional'),
(810, 1, 'show_user_email_profile', 'Show User\'s Email on Profile'),
(811, 1, 'pwa_warning', 'If you enable PWA option, read \'Progressive Web App (PWA)\' section from our documentation to make the necessary settings.'),
(812, 1, 'email_status', 'Email Status'),
(813, 1, 'enable_reward_system', 'Enable Reward System'),
(814, 1, 'disable_reward_system', 'Disable Reward System'),
(815, 1, 'delete_account', 'Delete Account'),
(816, 1, 'delete_account_confirm', 'Deleting your account is permanent and will remove all content including comments, avatars and profile settings. Are you sure you want to delete your account?'),
(817, 1, 'msg_wrong_password', 'Wrong Password!'),
(818, 1, 'show_latest_posts_on_slider', 'Show Latest Posts on Slider'),
(819, 1, 'show_latest_posts_on_featured', 'Show Latest Posts on Featured Posts');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `title` varchar(500) DEFAULT NULL,
  `slug` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `is_custom` tinyint(1) DEFAULT 1,
  `page_default_name` varchar(100) DEFAULT NULL,
  `page_content` mediumtext DEFAULT NULL,
  `page_order` smallint(6) DEFAULT 1,
  `visibility` tinyint(1) DEFAULT 1,
  `title_active` tinyint(1) DEFAULT 1,
  `breadcrumb_active` tinyint(1) DEFAULT 1,
  `right_column_active` tinyint(1) DEFAULT 1,
  `need_auth` tinyint(1) DEFAULT 0,
  `location` varchar(255) DEFAULT 'top',
  `link` varchar(1000) DEFAULT NULL,
  `parent_id` int(11) DEFAULT 0,
  `page_type` varchar(50) DEFAULT 'page',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `lang_id`, `title`, `slug`, `description`, `keywords`, `is_custom`, `page_default_name`, `page_content`, `page_order`, `visibility`, `title_active`, `breadcrumb_active`, `right_column_active`, `need_auth`, `location`, `link`, `parent_id`, `page_type`, `created_at`) VALUES
(1, 1, 'Contact', 'contact', 'Varient Contact Page', 'varient, contact, page', 0, 'contact', NULL, 1, 1, 1, 1, 0, 0, 'top', NULL, 0, 'page', '2020-02-18 11:09:21'),
(2, 1, 'Gallery', 'gallery', 'Varient Gallery Page', 'varient, gallery, page', 0, 'gallery', NULL, 1, 1, 1, 1, 0, 0, 'main', NULL, 0, 'page', '2020-02-18 11:11:40'),
(3, 1, 'Terms & Conditions', 'terms-conditions', 'Varient Terms Conditions Page', 'Terms, Conditions, Varient', 0, 'terms_conditions', NULL, 1, 1, 1, 1, 0, 0, 'footer', NULL, 0, 'page', '2020-02-18 11:12:40');

-- --------------------------------------------------------

--
-- Table structure for table `payouts`
--

CREATE TABLE `payouts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `amount` double NOT NULL,
  `payout_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `polls`
--

CREATE TABLE `polls` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `question` text DEFAULT NULL,
  `option1` text DEFAULT NULL,
  `option2` text DEFAULT NULL,
  `option3` text DEFAULT NULL,
  `option4` text DEFAULT NULL,
  `option5` text DEFAULT NULL,
  `option6` text DEFAULT NULL,
  `option7` text DEFAULT NULL,
  `option8` text DEFAULT NULL,
  `option9` text DEFAULT NULL,
  `option10` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `vote_permission` varchar(50) DEFAULT 'all',
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `poll_votes`
--

CREATE TABLE `poll_votes` (
  `id` int(11) NOT NULL,
  `poll_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vote` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `title` varchar(500) DEFAULT NULL,
  `title_slug` varchar(500) DEFAULT NULL,
  `title_hash` varchar(500) DEFAULT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `summary` varchar(5000) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_big` varchar(255) DEFAULT NULL,
  `image_default` varchar(255) DEFAULT NULL,
  `image_slider` varchar(255) DEFAULT NULL,
  `image_mid` varchar(255) DEFAULT NULL,
  `image_small` varchar(255) DEFAULT NULL,
  `image_mime` varchar(20) DEFAULT 'jpg',
  `optional_url` varchar(1000) DEFAULT NULL,
  `pageviews` int(11) DEFAULT 0,
  `need_auth` tinyint(1) DEFAULT 0,
  `is_slider` tinyint(1) DEFAULT 0,
  `slider_order` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `featured_order` tinyint(1) DEFAULT 1,
  `is_recommended` tinyint(1) DEFAULT 0,
  `is_breaking` tinyint(1) DEFAULT 1,
  `is_scheduled` tinyint(1) DEFAULT 0,
  `visibility` tinyint(1) DEFAULT 1,
  `show_right_column` tinyint(1) DEFAULT 1,
  `post_type` varchar(50) DEFAULT 'post',
  `video_path` varchar(255) DEFAULT NULL,
  `image_url` varchar(2000) DEFAULT NULL,
  `video_url` varchar(2000) DEFAULT NULL,
  `video_embed_code` varchar(2000) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `feed_id` int(11) DEFAULT NULL,
  `post_url` varchar(1000) DEFAULT NULL,
  `show_post_url` tinyint(1) DEFAULT 1,
  `image_description` varchar(500) DEFAULT NULL,
  `show_item_numbers` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post_audios`
--

CREATE TABLE `post_audios` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `audio_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post_files`
--

CREATE TABLE `post_files` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post_gallery_items`
--

CREATE TABLE `post_gallery_items` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_large` varchar(255) DEFAULT NULL,
  `image_description` varchar(255) DEFAULT NULL,
  `item_order` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post_images`
--

CREATE TABLE `post_images` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `image_big` varchar(255) DEFAULT NULL,
  `image_default` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post_pageviews_month`
--

CREATE TABLE `post_pageviews_month` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `post_user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(30) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `reward_amount` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post_pageviews_week`
--

CREATE TABLE `post_pageviews_week` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `post_user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(30) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `reward_amount` double NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `post_sorted_list_items`
--

CREATE TABLE `post_sorted_list_items` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_large` varchar(255) DEFAULT NULL,
  `image_description` varchar(255) DEFAULT NULL,
  `item_order` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_answers`
--

CREATE TABLE `quiz_answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `answer_text` varchar(500) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `assigned_result_id` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_images`
--

CREATE TABLE `quiz_images` (
  `id` int(11) NOT NULL,
  `image_default` varchar(255) DEFAULT NULL,
  `image_small` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `image_mime` varchar(20) DEFAULT 'jpg',
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `question` varchar(500) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `question_order` int(11) DEFAULT 1,
  `answer_format` varchar(30) DEFAULT 'small_image'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_results`
--

CREATE TABLE `quiz_results` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `result_title` varchar(500) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `min_correct_count` mediumint(9) DEFAULT NULL,
  `max_correct_count` mediumint(9) DEFAULT NULL,
  `result_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `re_like` int(11) DEFAULT 0,
  `re_dislike` int(11) DEFAULT 0,
  `re_love` int(11) DEFAULT 0,
  `re_funny` int(11) DEFAULT 0,
  `re_angry` int(11) DEFAULT 0,
  `re_sad` int(11) DEFAULT 0,
  `re_wow` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reading_lists`
--

CREATE TABLE `reading_lists` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `roles_permissions`
--

CREATE TABLE `roles_permissions` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `admin_panel` tinyint(1) DEFAULT NULL,
  `add_post` tinyint(1) DEFAULT NULL,
  `manage_all_posts` tinyint(1) DEFAULT NULL,
  `navigation` tinyint(1) DEFAULT NULL,
  `pages` tinyint(1) DEFAULT NULL,
  `rss_feeds` tinyint(1) DEFAULT NULL,
  `categories` tinyint(1) DEFAULT NULL,
  `widgets` tinyint(1) DEFAULT NULL,
  `polls` tinyint(1) DEFAULT NULL,
  `gallery` tinyint(1) DEFAULT NULL,
  `comments_contact` tinyint(1) DEFAULT NULL,
  `newsletter` tinyint(1) DEFAULT NULL,
  `ad_spaces` tinyint(1) DEFAULT NULL,
  `users` tinyint(1) DEFAULT NULL,
  `seo_tools` tinyint(1) DEFAULT NULL,
  `settings` tinyint(1) DEFAULT NULL,
  `reward_system` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles_permissions`
--

INSERT INTO `roles_permissions` (`id`, `role`, `role_name`, `admin_panel`, `add_post`, `manage_all_posts`, `navigation`, `pages`, `rss_feeds`, `categories`, `widgets`, `polls`, `gallery`, `comments_contact`, `newsletter`, `ad_spaces`, `users`, `seo_tools`, `settings`, `reward_system`) VALUES
(1, 'admin', 'Admin', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(2, 'moderator', 'Moderator', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1),
(3, 'author', 'Author', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'user', 'User', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `admin` varchar(100) DEFAULT 'admin',
  `profile` varchar(100) DEFAULT 'profile',
  `tag` varchar(100) DEFAULT 'tag',
  `reading_list` varchar(100) DEFAULT 'reading-list',
  `settings` varchar(100) DEFAULT 'settings',
  `social_accounts` varchar(100) DEFAULT 'social-accounts',
  `preferences` varchar(100) DEFAULT 'preferences',
  `visual_settings` varchar(100) DEFAULT 'visual-settings',
  `change_password` varchar(100) DEFAULT 'change-password',
  `forgot_password` varchar(100) DEFAULT 'forgot-password',
  `reset_password` varchar(100) DEFAULT 'reset-password',
  `delete_account` varchar(100) DEFAULT 'delete-account',
  `register` varchar(100) DEFAULT 'register',
  `posts` varchar(100) DEFAULT 'posts',
  `search` varchar(100) DEFAULT 'search',
  `rss_feeds` varchar(100) DEFAULT 'rss-feeds',
  `gallery_album` varchar(100) DEFAULT 'gallery-album',
  `earnings` varchar(100) DEFAULT 'earnings',
  `payouts` varchar(100) DEFAULT 'payouts',
  `set_payout_account` varchar(100) DEFAULT 'set-payout-account',
  `logout` varchar(100) DEFAULT 'logout'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`id`, `admin`, `profile`, `tag`, `reading_list`, `settings`, `social_accounts`, `preferences`, `visual_settings`, `change_password`, `forgot_password`, `reset_password`, `delete_account`, `register`, `posts`, `search`, `rss_feeds`, `gallery_album`, `earnings`, `payouts`, `set_payout_account`, `logout`) VALUES
(1, 'admin', 'profile', 'tag', 'reading-list', 'settings', 'social-accounts', 'preferences', 'visual-settings', 'change-password', 'forgot-password', 'reset-password', 'delete-account', 'register', 'posts', 'search', 'rss-feeds', 'gallery-album', 'earnings', 'payouts', 'set-payout-account', 'logout');

-- --------------------------------------------------------

--
-- Table structure for table `rss_feeds`
--

CREATE TABLE `rss_feeds` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `feed_name` varchar(500) DEFAULT NULL,
  `feed_url` varchar(1000) DEFAULT NULL,
  `post_limit` smallint(6) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image_saving_method` varchar(30) DEFAULT 'url',
  `auto_update` tinyint(1) DEFAULT 1,
  `read_more_button` tinyint(1) DEFAULT 1,
  `read_more_button_text` varchar(255) DEFAULT 'Read More',
  `user_id` int(11) DEFAULT NULL,
  `add_posts_as_draft` tinyint(1) DEFAULT 0,
  `is_cron_updated` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) NOT NULL DEFAULT 1,
  `site_title` varchar(255) DEFAULT NULL,
  `home_title` varchar(255) DEFAULT 'Index',
  `site_description` varchar(500) DEFAULT NULL,
  `keywords` varchar(500) DEFAULT NULL,
  `application_name` varchar(255) DEFAULT NULL,
  `primary_font` smallint(6) DEFAULT 19,
  `secondary_font` smallint(6) DEFAULT 25,
  `tertiary_font` smallint(6) DEFAULT 32,
  `facebook_url` varchar(500) DEFAULT NULL,
  `twitter_url` varchar(500) DEFAULT NULL,
  `instagram_url` varchar(500) DEFAULT NULL,
  `pinterest_url` varchar(500) DEFAULT NULL,
  `linkedin_url` varchar(500) DEFAULT NULL,
  `vk_url` varchar(500) DEFAULT NULL,
  `telegram_url` varchar(500) DEFAULT NULL,
  `youtube_url` varchar(500) DEFAULT NULL,
  `optional_url_button_name` varchar(500) DEFAULT 'Click Here To See More',
  `about_footer` varchar(1000) DEFAULT NULL,
  `contact_text` text DEFAULT NULL,
  `contact_address` varchar(500) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `copyright` varchar(500) DEFAULT NULL,
  `cookies_warning` tinyint(1) DEFAULT 0,
  `cookies_warning_text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `lang_id`, `site_title`, `home_title`, `site_description`, `keywords`, `application_name`, `primary_font`, `secondary_font`, `tertiary_font`, `facebook_url`, `twitter_url`, `instagram_url`, `pinterest_url`, `linkedin_url`, `vk_url`, `telegram_url`, `youtube_url`, `optional_url_button_name`, `about_footer`, `contact_text`, `contact_address`, `contact_email`, `contact_phone`, `copyright`, `cookies_warning`, `cookies_warning_text`) VALUES
(1, 1, 'Varient - News Magazine', 'Index', 'Varient Index Page', 'index, home, varient', 'Varient', 19, 25, 32, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Click Here To See More', NULL, NULL, NULL, NULL, NULL, 'Copyright 2020 Varient - All Rights Reserved.', 0, '<p>This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `tag_slug` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT 'name@domain.com',
  `email_status` tinyint(1) DEFAULT 0,
  `token` varchar(500) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(100) DEFAULT 'user',
  `user_type` varchar(50) DEFAULT 'registered',
  `google_id` varchar(255) DEFAULT NULL,
  `facebook_id` varchar(255) DEFAULT NULL,
  `vk_id` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `about_me` varchar(5000) DEFAULT NULL,
  `facebook_url` varchar(500) DEFAULT NULL,
  `twitter_url` varchar(500) DEFAULT NULL,
  `instagram_url` varchar(500) DEFAULT NULL,
  `pinterest_url` varchar(500) DEFAULT NULL,
  `linkedin_url` varchar(500) DEFAULT NULL,
  `vk_url` varchar(500) DEFAULT NULL,
  `telegram_url` varchar(500) DEFAULT NULL,
  `youtube_url` varchar(500) DEFAULT NULL,
  `last_seen` timestamp NULL DEFAULT NULL,
  `show_email_on_profile` tinyint(1) DEFAULT 1,
  `show_rss_feeds` tinyint(1) DEFAULT 1,
  `site_mode` varchar(10) DEFAULT NULL,
  `site_color` varchar(30) DEFAULT NULL,
  `reward_system_enabled` tinyint(1) DEFAULT 0,
  `balance` double DEFAULT 0,
  `total_pageviews` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_payout_accounts`
--

CREATE TABLE `user_payout_accounts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `payout_paypal_email` varchar(255) DEFAULT NULL,
  `iban_full_name` varchar(255) DEFAULT NULL,
  `iban_country` varchar(100) DEFAULT NULL,
  `iban_bank_name` varchar(255) DEFAULT NULL,
  `iban_number` varchar(500) DEFAULT NULL,
  `swift_full_name` varchar(255) DEFAULT NULL,
  `swift_address` varchar(500) DEFAULT NULL,
  `swift_state` varchar(255) DEFAULT NULL,
  `swift_city` varchar(255) DEFAULT NULL,
  `swift_postcode` varchar(100) DEFAULT NULL,
  `swift_country` varchar(100) DEFAULT NULL,
  `swift_bank_account_holder_name` varchar(255) DEFAULT NULL,
  `swift_iban` varchar(255) DEFAULT NULL,
  `swift_code` varchar(255) DEFAULT NULL,
  `swift_bank_name` varchar(255) DEFAULT NULL,
  `swift_bank_branch_city` varchar(255) DEFAULT NULL,
  `swift_bank_branch_country` varchar(100) DEFAULT NULL,
  `default_payout_account` varchar(30) NOT NULL DEFAULT 'paypal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `video_name` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `visual_settings`
--

CREATE TABLE `visual_settings` (
  `id` int(11) NOT NULL,
  `dark_mode` tinyint(1) NOT NULL DEFAULT 0,
  `post_list_style` varchar(100) NOT NULL DEFAULT 'vertical',
  `site_color` varchar(100) NOT NULL DEFAULT 'default',
  `site_block_color` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `logo_footer` varchar(255) DEFAULT NULL,
  `logo_email` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `visual_settings`
--

INSERT INTO `visual_settings` (`id`, `dark_mode`, `post_list_style`, `site_color`, `site_block_color`, `logo`, `logo_footer`, `logo_email`, `favicon`) VALUES
(1, 0, 'vertical', 'default', '#161616', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `widgets`
--

CREATE TABLE `widgets` (
  `id` int(11) NOT NULL,
  `lang_id` int(11) DEFAULT 1,
  `title` varchar(500) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `widget_order` int(11) DEFAULT 1,
  `visibility` int(11) DEFAULT 1,
  `is_custom` int(11) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `widgets`
--

INSERT INTO `widgets` (`id`, `lang_id`, `title`, `content`, `type`, `widget_order`, `visibility`, `is_custom`, `created_at`) VALUES
(1, 1, 'Follow Us', NULL, 'follow-us', 2, 1, 0, '2020-02-18 12:54:39'),
(2, 1, 'Popular Posts', NULL, 'popular-posts', 1, 1, 0, '2020-02-18 12:54:39'),
(3, 1, 'Recommended Posts', NULL, 'recommended-posts', 3, 1, 0, '2020-02-18 12:54:39'),
(4, 1, 'Random Posts', NULL, 'random-slider-posts', 4, 1, 0, '2020-02-18 12:54:39'),
(5, 1, 'Tags', NULL, 'tags', 5, 1, 0, '2020-02-18 12:54:39'),
(6, 1, 'Voting Poll', NULL, 'poll', 6, 1, 0, '2020-02-18 12:54:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ad_spaces`
--
ALTER TABLE `ad_spaces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audios`
--
ALTER TABLE `audios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ci_sessions`
--
ALTER TABLE `ci_sessions`
  ADD KEY `ci_sessions_timestamp` (`timestamp`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_parent_id` (`parent_id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fonts`
--
ALTER TABLE `fonts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_albums`
--
ALTER TABLE `gallery_albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `language_translations`
--
ALTER TABLE `language_translations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_lang_id` (`lang_id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payouts`
--
ALTER TABLE `payouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_votes`
--
ALTER TABLE `poll_votes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category_id` (`category_id`),
  ADD KEY `idx_is_slider` (`is_slider`),
  ADD KEY `idx_is_featured` (`is_featured`),
  ADD KEY `idx_is_recommended` (`is_recommended`),
  ADD KEY `idx_is_breaking` (`is_breaking`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_lang_id` (`lang_id`),
  ADD KEY `idx_is_scheduled` (`is_scheduled`),
  ADD KEY `idx_visibility` (`visibility`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `post_audios`
--
ALTER TABLE `post_audios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_files`
--
ALTER TABLE `post_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_gallery_items`
--
ALTER TABLE `post_gallery_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_images`
--
ALTER TABLE `post_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_pageviews_month`
--
ALTER TABLE `post_pageviews_month`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `post_pageviews_week`
--
ALTER TABLE `post_pageviews_week`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `post_sorted_list_items`
--
ALTER TABLE `post_sorted_list_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_images`
--
ALTER TABLE `quiz_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quiz_results`
--
ALTER TABLE `quiz_results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reading_lists`
--
ALTER TABLE `reading_lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rss_feeds`
--
ALTER TABLE `rss_feeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_post_id` (`post_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_payout_accounts`
--
ALTER TABLE `user_payout_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visual_settings`
--
ALTER TABLE `visual_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `widgets`
--
ALTER TABLE `widgets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ad_spaces`
--
ALTER TABLE `ad_spaces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `audios`
--
ALTER TABLE `audios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fonts`
--
ALTER TABLE `fonts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery_albums`
--
ALTER TABLE `gallery_albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gallery_categories`
--
ALTER TABLE `gallery_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `language_translations`
--
ALTER TABLE `language_translations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=820;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payouts`
--
ALTER TABLE `payouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poll_votes`
--
ALTER TABLE `poll_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_audios`
--
ALTER TABLE `post_audios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_files`
--
ALTER TABLE `post_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_gallery_items`
--
ALTER TABLE `post_gallery_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_pageviews_month`
--
ALTER TABLE `post_pageviews_month`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_pageviews_week`
--
ALTER TABLE `post_pageviews_week`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_sorted_list_items`
--
ALTER TABLE `post_sorted_list_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_images`
--
ALTER TABLE `quiz_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_results`
--
ALTER TABLE `quiz_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reading_lists`
--
ALTER TABLE `reading_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles_permissions`
--
ALTER TABLE `roles_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `rss_feeds`
--
ALTER TABLE `rss_feeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_payout_accounts`
--
ALTER TABLE `user_payout_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visual_settings`
--
ALTER TABLE `visual_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `widgets`
--
ALTER TABLE `widgets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
