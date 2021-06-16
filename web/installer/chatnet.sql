SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatnet`
--

-- --------------------------------------------------------

--
-- Table structure for table `cn_chat_groups`
--

DROP TABLE IF EXISTS `cn_chat_groups`;
CREATE TABLE IF NOT EXISTS `cn_chat_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chat_room` int(11) NOT NULL,
  `cover_image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_protected` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'True = 1, False = 0',
  `password` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1' COMMENT 'ACTIVE = 1, INACTIVE = 2',
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cn_chat_groups_idx_id` (`id`),
  KEY `cn_chat_groups_idx_chat_room_slug` (`chat_room`,`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_chat_rooms`
--

DROP TABLE IF EXISTS `cn_chat_rooms`;
CREATE TABLE IF NOT EXISTS `cn_chat_rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover_image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_protected` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'True = 1, False = 0',
  `password` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'True = 1, False = 0',
  `chat_validity` int(11) DEFAULT NULL COMMENT 'hours',
  `slug` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `allowed_users` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` smallint(6) NOT NULL DEFAULT '1' COMMENT 'ACTIVE = 1, INACTIVE = 2',
  `created_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cn_chat_rooms_idx_created_by` (`created_by`),
  KEY `cn_chat_rooms_idx_status_is_visible` (`status`,`is_visible`),
  KEY `cn_chat_rooms_idx_slug` (`slug`),
  KEY `cn_chat_rooms_idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_group_chats`
--

DROP TABLE IF EXISTS `cn_group_chats`;
CREATE TABLE IF NOT EXISTS `cn_group_chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `type` smallint(6) NOT NULL DEFAULT '1' COMMENT 'text= 1, image= 2, gif= 3',
  `message` text COLLATE utf8mb4_unicode_ci,
  `status` smallint(6) NOT NULL DEFAULT '1' COMMENT 'send= 1, seen = 2, deleted = 3',
  `time` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cn_group_chats_idx_id_group_id_sender_id` (`id`,`group_id`,`sender_id`),
  KEY `cn_group_chats_idx_group_id_room_id` (`group_id`,`room_id`),
  KEY `cn_group_chats_idx_id_group_id_room_id` (`id`,`group_id`,`room_id`),
  KEY `cn_group_chats_idx_updated_at_group_id` (`updated_at`,`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_group_users`
--

DROP TABLE IF EXISTS `cn_group_users`;
CREATE TABLE IF NOT EXISTS `cn_group_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `chat_group` int(11) NOT NULL,
  `user_type` smallint(6) NOT NULL DEFAULT '2' COMMENT 'Group admin = 1, Group user = 2, Guest user = 3',
  `status` smallint(6) NOT NULL DEFAULT '1' COMMENT 'Active = 1, Inactive = 2',
  `is_typing` tinyint(1) NOT NULL DEFAULT '0',
  `is_muted` tinyint(4) NOT NULL DEFAULT '0',
  `unread_count` int(11) NOT NULL DEFAULT '0',
  `is_mod` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `cn_group_users_idx_chat_group` (`chat_group`),
  KEY `cn_group_users_idx_user` (`user`),
  KEY `cn_group_users_idx_user_chat_group` (`user`,`chat_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_languages`
--

DROP TABLE IF EXISTS `cn_languages`;
CREATE TABLE IF NOT EXISTS `cn_languages` (
  `code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direction` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ltr',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_lang_terms`
--

DROP TABLE IF EXISTS `cn_lang_terms`;
CREATE TABLE IF NOT EXISTS `cn_lang_terms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `term` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_private_chats`
--

DROP TABLE IF EXISTS `cn_private_chats`;
CREATE TABLE IF NOT EXISTS `cn_private_chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_1` int(11) NOT NULL,
  `user_2` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `type` smallint(6) NOT NULL DEFAULT '1' COMMENT 'text=1, image=2, gif=3',
  `message` text COLLATE utf8mb4_unicode_ci,
  `status` smallint(6) NOT NULL DEFAULT '1' COMMENT 'send= 1, seen = 2, deleted = 3',
  `time` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cn_private_chats_idx_id` (`id`),
  KEY `cn_private_chats_idx_user_1_user_2_room_id_sender_id` (`user_1`,`user_2`,`room_id`,`sender_id`),
  KEY `cn_private_chats_idx_user_1_user_2_room_id` (`user_1`,`user_2`,`room_id`),
  KEY `cn_private_chats_idx_id_user_1_user_2_room_id` (`id`,`user_1`,`user_2`,`room_id`),
  KEY `cn_private_chats_idx_updated_at_user_1_user_2_room_id` (`updated_at`,`user_1`,`user_2`,`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_private_chat_meta`
--

DROP TABLE IF EXISTS `cn_private_chat_meta`;
CREATE TABLE IF NOT EXISTS `cn_private_chat_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user` int(11) NOT NULL,
  `to_user` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `is_typing` tinyint(1) DEFAULT '0',
  `is_blocked` tinyint(1) DEFAULT '0',
  `is_favourite` tinyint(1) DEFAULT '0',
  `is_muted` tinyint(4) DEFAULT '0',
  `unread_count` int(11) DEFAULT '0',
  `last_chat_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cn_private_chat_me_idx_to_user_room_id_from_user` (`to_user`,`room_id`,`from_user`),
  KEY `cn_private_chat_me_idx_from_user_to_user` (`from_user`,`to_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_push_devices`
--

DROP TABLE IF EXISTS `cn_push_devices`;
CREATE TABLE IF NOT EXISTS `cn_push_devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `device` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `perm_group` tinyint(1) NOT NULL DEFAULT '0',
  `perm_private` tinyint(1) NOT NULL DEFAULT '1',
  `perm_mentions` tinyint(1) NOT NULL DEFAULT '1',
  `perm_notice` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_radio_stations`
--

DROP TABLE IF EXISTS `cn_radio_stations`;
CREATE TABLE IF NOT EXISTS `cn_radio_stations` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_settings`
--

DROP TABLE IF EXISTS `cn_settings`;
CREATE TABLE IF NOT EXISTS `cn_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_social_logins`
--

DROP TABLE IF EXISTS `cn_social_logins`;
CREATE TABLE IF NOT EXISTS `cn_social_logins` (
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_key` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret_key` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_translations`
--

DROP TABLE IF EXISTS `cn_translations`;
CREATE TABLE IF NOT EXISTS `cn_translations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lang_code` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `term_id` int(11) DEFAULT NULL,
  `translation` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `cn_translations_idx_term_id_lang_code` (`term_id`,`lang_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cn_users`
--

DROP TABLE IF EXISTS `cn_users`;
CREATE TABLE IF NOT EXISTS `cn_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `sex` smallint(6) DEFAULT NULL COMMENT 'MALE = 1, FEMALE = 2, OTHER = 3',
  `avatar` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `about` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_status` smallint(6) DEFAULT '1' COMMENT 'ONLINE = 1, OFFLINE = 2, BUSY = 3',
  `available_status` smallint(6) DEFAULT '1' COMMENT 'ACTIVE = 1, INACTIVE = 2',
  `last_seen` timestamp NULL DEFAULT NULL,
  `user_type` smallint(6) NOT NULL DEFAULT '2' COMMENT 'Admin = 1, Chat User = 2',
  `reset_key` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `timezone` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Asia/Colombo',
  `country` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`,`email`),
  KEY `cn_users_idx_id` (`id`),
  KEY `cn_users_idx_user_type` (`user_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cn_settings`
--

INSERT INTO `cn_settings` (`id`, `name`, `value`) VALUES
(1, 'timezone', 'Asia/Colombo'),
(2, 'chat_receive_seconds', '3'),
(3, 'user_list_check_seconds', '5'),
(4, 'chat_status_check_seconds', '3'),
(5, 'online_status_check_seconds', '10'),
(6, 'typing_status_check_seconds', '3'),
(7, 'current_version', '1.4'),
(8, 'enable_gif', '1'),
(9, 'enable_stickers', '1'),
(10, 'enable_images', '1'),
(11, 'member_registration', '1'),
(12, 'homepage_chat_room_view', 'small'),
(13, 'site_name', 'ChatNet'),
(14, 'sent_animation', 'animate__fadeIn animate__slow'),
(15, 'replies_animation', 'animate__fadeInLeft'),
(16, 'radio', '0'),
(17, 'enable_social_login', '0'),
(18, 'push_notifications', '0'),
(19, 'pwa_enabled', '0');


INSERT INTO `cn_languages` (`code`, `name`, `country`) VALUES
('en', 'English', 'us');



COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
