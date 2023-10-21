-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 21, 2023 at 10:33 AM
-- Server version: 11.0.3-MariaDB-log
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thi`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT 'users/default.png',
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `role_id`, `avatar`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 1, 'users/default.png', 'admin@admin.com', NULL, '$2y$10$a.nZvJYX.BgFOxFt5trfTOexgXnYyhWL8mq0NMWbGjIDnZJFe6VRW', 'RxVfgxQZnU5JxIDo9FSIgoKS4W7oWSMriYYatGdxFwgIehOSMBwYT9tZpQiE', '2023-10-13 05:54:20', '2023-10-13 05:54:20');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `order`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, NULL, 1, 'Category 1', 'category-1', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(2, NULL, 1, 'Category 2', 'category-2', '2023-10-13 05:31:15', '2023-10-13 05:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `data_rows`
--

CREATE TABLE `data_rows` (
  `id` int(10) UNSIGNED NOT NULL,
  `data_type_id` int(10) UNSIGNED NOT NULL,
  `field` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `required` tinyint(1) NOT NULL DEFAULT 0,
  `browse` tinyint(1) NOT NULL DEFAULT 1,
  `read` tinyint(1) NOT NULL DEFAULT 1,
  `edit` tinyint(1) NOT NULL DEFAULT 1,
  `add` tinyint(1) NOT NULL DEFAULT 1,
  `delete` tinyint(1) NOT NULL DEFAULT 1,
  `details` text DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `data_rows`
--

INSERT INTO `data_rows` (`id`, `data_type_id`, `field`, `type`, `display_name`, `required`, `browse`, `read`, `edit`, `add`, `delete`, `details`, `order`) VALUES
(1, 1, 'id', 'number', 'ID', 1, 0, 0, 0, 0, 0, NULL, 1),
(2, 1, 'name', 'text', 'Name', 1, 1, 1, 1, 1, 1, NULL, 2),
(3, 1, 'email', 'text', 'Email', 1, 1, 1, 1, 1, 1, NULL, 3),
(4, 1, 'password', 'password', 'Password', 1, 0, 0, 1, 1, 0, NULL, 4),
(5, 1, 'remember_token', 'text', 'Remember Token', 0, 0, 0, 0, 0, 0, NULL, 5),
(6, 1, 'created_at', 'timestamp', 'Created At', 0, 1, 1, 0, 0, 0, NULL, 6),
(7, 1, 'updated_at', 'timestamp', 'Updated At', 0, 0, 0, 0, 0, 0, NULL, 7),
(8, 1, 'avatar', 'image', 'Avatar', 0, 1, 1, 1, 1, 1, NULL, 8),
(9, 1, 'user_belongsto_role_relationship', 'relationship', 'Role', 0, 1, 1, 1, 1, 0, '{\"model\":\"TCG\\\\Voyager\\\\Models\\\\Role\",\"table\":\"roles\",\"type\":\"belongsTo\",\"column\":\"role_id\",\"key\":\"id\",\"label\":\"display_name\",\"pivot_table\":\"roles\",\"pivot\":0}', 10),
(10, 1, 'user_belongstomany_role_relationship', 'relationship', 'Roles', 0, 1, 1, 1, 1, 0, '{\"model\":\"TCG\\\\Voyager\\\\Models\\\\Role\",\"table\":\"roles\",\"type\":\"belongsToMany\",\"column\":\"id\",\"key\":\"id\",\"label\":\"display_name\",\"pivot_table\":\"user_roles\",\"pivot\":\"1\",\"taggable\":\"0\"}', 11),
(11, 1, 'settings', 'hidden', 'Settings', 0, 0, 0, 0, 0, 0, NULL, 12),
(12, 2, 'id', 'number', 'ID', 1, 0, 0, 0, 0, 0, NULL, 1),
(13, 2, 'name', 'text', 'Name', 1, 1, 1, 1, 1, 1, NULL, 2),
(14, 2, 'created_at', 'timestamp', 'Created At', 0, 0, 0, 0, 0, 0, NULL, 3),
(15, 2, 'updated_at', 'timestamp', 'Updated At', 0, 0, 0, 0, 0, 0, NULL, 4),
(16, 3, 'id', 'number', 'ID', 1, 0, 0, 0, 0, 0, NULL, 1),
(17, 3, 'name', 'text', 'Name', 1, 1, 1, 1, 1, 1, NULL, 2),
(18, 3, 'created_at', 'timestamp', 'Created At', 0, 0, 0, 0, 0, 0, NULL, 3),
(19, 3, 'updated_at', 'timestamp', 'Updated At', 0, 0, 0, 0, 0, 0, NULL, 4),
(20, 3, 'display_name', 'text', 'Display Name', 1, 1, 1, 1, 1, 1, NULL, 5),
(21, 1, 'role_id', 'text', 'Role', 1, 1, 1, 1, 1, 1, NULL, 9),
(22, 4, 'id', 'number', 'ID', 1, 0, 0, 0, 0, 0, NULL, 1),
(23, 4, 'parent_id', 'select_dropdown', 'Parent', 0, 0, 1, 1, 1, 1, '{\"default\":\"\",\"null\":\"\",\"options\":{\"\":\"-- None --\"},\"relationship\":{\"key\":\"id\",\"label\":\"name\"}}', 2),
(24, 4, 'order', 'text', 'Order', 1, 1, 1, 1, 1, 1, '{\"default\":1}', 3),
(25, 4, 'name', 'text', 'Name', 1, 1, 1, 1, 1, 1, NULL, 4),
(26, 4, 'slug', 'text', 'Slug', 1, 1, 1, 1, 1, 1, '{\"slugify\":{\"origin\":\"name\"}}', 5),
(27, 4, 'created_at', 'timestamp', 'Created At', 0, 0, 1, 0, 0, 0, NULL, 6),
(28, 4, 'updated_at', 'timestamp', 'Updated At', 0, 0, 0, 0, 0, 0, NULL, 7),
(29, 5, 'id', 'number', 'ID', 1, 0, 0, 0, 0, 0, NULL, 1),
(30, 5, 'author_id', 'text', 'Author', 1, 0, 1, 1, 0, 1, NULL, 2),
(31, 5, 'category_id', 'text', 'Category', 1, 0, 1, 1, 1, 0, NULL, 3),
(32, 5, 'title', 'text', 'Title', 1, 1, 1, 1, 1, 1, NULL, 4),
(33, 5, 'excerpt', 'text_area', 'Excerpt', 1, 0, 1, 1, 1, 1, NULL, 5),
(34, 5, 'body', 'rich_text_box', 'Body', 1, 0, 1, 1, 1, 1, NULL, 6),
(35, 5, 'image', 'image', 'Post Image', 0, 1, 1, 1, 1, 1, '{\"resize\":{\"width\":\"1000\",\"height\":\"null\"},\"quality\":\"70%\",\"upsize\":true,\"thumbnails\":[{\"name\":\"medium\",\"scale\":\"50%\"},{\"name\":\"small\",\"scale\":\"25%\"},{\"name\":\"cropped\",\"crop\":{\"width\":\"300\",\"height\":\"250\"}}]}', 7),
(36, 5, 'slug', 'text', 'Slug', 1, 0, 1, 1, 1, 1, '{\"slugify\":{\"origin\":\"title\",\"forceUpdate\":true},\"validation\":{\"rule\":\"unique:posts,slug\"}}', 8),
(37, 5, 'meta_description', 'text_area', 'Meta Description', 1, 0, 1, 1, 1, 1, NULL, 9),
(38, 5, 'meta_keywords', 'text_area', 'Meta Keywords', 1, 0, 1, 1, 1, 1, NULL, 10),
(39, 5, 'status', 'select_dropdown', 'Status', 1, 1, 1, 1, 1, 1, '{\"default\":\"DRAFT\",\"options\":{\"PUBLISHED\":\"published\",\"DRAFT\":\"draft\",\"PENDING\":\"pending\"}}', 11),
(40, 5, 'created_at', 'timestamp', 'Created At', 0, 1, 1, 0, 0, 0, NULL, 12),
(41, 5, 'updated_at', 'timestamp', 'Updated At', 0, 0, 0, 0, 0, 0, NULL, 13),
(42, 5, 'seo_title', 'text', 'SEO Title', 0, 1, 1, 1, 1, 1, NULL, 14),
(43, 5, 'featured', 'checkbox', 'Featured', 1, 1, 1, 1, 1, 1, NULL, 15),
(44, 6, 'id', 'number', 'ID', 1, 0, 0, 0, 0, 0, NULL, 1),
(45, 6, 'author_id', 'text', 'Author', 1, 0, 0, 0, 0, 0, NULL, 2),
(46, 6, 'title', 'text', 'Title', 1, 1, 1, 1, 1, 1, NULL, 3),
(47, 6, 'excerpt', 'text_area', 'Excerpt', 1, 0, 1, 1, 1, 1, NULL, 4),
(48, 6, 'body', 'rich_text_box', 'Body', 1, 0, 1, 1, 1, 1, NULL, 5),
(49, 6, 'slug', 'text', 'Slug', 1, 0, 1, 1, 1, 1, '{\"slugify\":{\"origin\":\"title\"},\"validation\":{\"rule\":\"unique:pages,slug\"}}', 6),
(50, 6, 'meta_description', 'text', 'Meta Description', 1, 0, 1, 1, 1, 1, NULL, 7),
(51, 6, 'meta_keywords', 'text', 'Meta Keywords', 1, 0, 1, 1, 1, 1, NULL, 8),
(52, 6, 'status', 'select_dropdown', 'Status', 1, 1, 1, 1, 1, 1, '{\"default\":\"INACTIVE\",\"options\":{\"INACTIVE\":\"INACTIVE\",\"ACTIVE\":\"ACTIVE\"}}', 9),
(53, 6, 'created_at', 'timestamp', 'Created At', 1, 1, 1, 0, 0, 0, NULL, 10),
(54, 6, 'updated_at', 'timestamp', 'Updated At', 1, 0, 0, 0, 0, 0, NULL, 11),
(55, 6, 'image', 'image', 'Page Image', 0, 1, 1, 1, 1, 1, NULL, 12),
(56, 7, 'id', 'text', 'Id', 1, 0, 0, 0, 0, 0, '{}', 1),
(57, 7, 'name', 'text', 'Tên môn', 1, 1, 1, 1, 1, 1, '{}', 2),
(58, 7, 'slug', 'text', 'Slug', 1, 1, 1, 1, 1, 1, '{\"slugify\":{\"origin\":\"name\"}}', 3),
(59, 7, 'created_at', 'timestamp', 'Created At', 0, 1, 1, 1, 0, 1, '{}', 4),
(60, 7, 'updated_at', 'timestamp', 'Updated At', 0, 0, 0, 0, 0, 0, '{}', 5),
(61, 8, 'id', 'text', 'Id', 1, 0, 0, 0, 0, 0, '{}', 1),
(63, 8, 'a', 'text', 'A', 0, 1, 1, 1, 1, 1, '{\"display\":{\"width\":\"3\"}}', 3),
(64, 8, 'b', 'text', 'B', 0, 1, 1, 1, 1, 1, '{\"display\":{\"width\":\"3\"}}', 4),
(65, 8, 'c', 'text', 'C', 0, 1, 1, 1, 1, 1, '{\"display\":{\"width\":\"3\"}}', 5),
(66, 8, 'd', 'text', 'D', 0, 1, 1, 1, 1, 1, '{\"display\":{\"width\":\"3\"}}', 6),
(67, 8, 'answer', 'select_dropdown', 'Kết quả', 0, 1, 1, 1, 1, 1, '{\"default\":\"a\",\"display\":{\"width\":\"6\"},\"options\":{\"a\":\"A\",\"b\":\"B\",\"c\":\"C\",\"d\":\"D\"}}', 7),
(68, 8, 'type', 'select_dropdown', 'Loại câu hỏi', 0, 1, 1, 1, 1, 1, '{\"default\":\"abcd\",\"display\":{\"width\":\"6\"},\"options\":{\"abcd\":\"ABCD\",\"audio\":\"audio\"}}', 8),
(69, 8, 'created_at', 'timestamp', 'Created At', 0, 1, 1, 1, 0, 1, '{}', 10),
(70, 8, 'updated_at', 'timestamp', 'Updated At', 0, 0, 0, 0, 0, 0, '{}', 11),
(71, 9, 'id', 'text', 'Id', 1, 0, 0, 0, 0, 0, '{}', 1),
(72, 9, 'subject_id', 'text', 'Subject Id', 1, 1, 1, 1, 1, 1, '{}', 2),
(73, 9, 'title', 'text', 'Tiêu đề', 1, 1, 1, 1, 1, 1, '{}', 3),
(74, 9, 'description', 'text_area', 'Mô tả', 0, 1, 1, 1, 1, 1, '{}', 5),
(75, 9, 'time', 'text', 'Thời gian thi', 1, 1, 1, 1, 1, 1, '{\"display\":{\"width\":\"6\"},\"default\":60}', 6),
(76, 9, 'number', 'text', 'Số lượt đã thi', 1, 1, 0, 0, 0, 0, '{\"display\":{\"width\":\"6\"},\"default\":0}', 7),
(77, 9, 'created_at', 'timestamp', 'Created At', 0, 1, 1, 1, 0, 1, '{}', 10),
(78, 9, 'updated_at', 'timestamp', 'Updated At', 0, 0, 0, 0, 0, 0, '{}', 11),
(79, 9, 'test_hasone_subject_relationship', 'relationship', 'Môn', 1, 1, 1, 1, 1, 1, '{\"model\":\"App\\\\Models\\\\Subject\",\"table\":\"subjects\",\"type\":\"belongsTo\",\"column\":\"subject_id\",\"key\":\"id\",\"label\":\"name\",\"pivot_table\":\"admins\",\"pivot\":\"0\",\"taggable\":\"0\"}', 9),
(80, 8, 'question_belongsto_test_relationship', 'relationship', 'Bài kiểm tra', 0, 1, 1, 1, 1, 1, '{\"model\":\"App\\\\Models\\\\Test\",\"table\":\"tests\",\"type\":\"belongsTo\",\"column\":\"test_id\",\"key\":\"id\",\"label\":\"title\",\"pivot_table\":\"admins\",\"pivot\":\"0\",\"taggable\":\"0\"}', 9),
(81, 8, 'test_id', 'text', 'Test Id', 1, 1, 1, 1, 1, 1, '{}', 12),
(82, 8, 'content', 'rich_text_box', 'Nội dung', 0, 1, 1, 1, 1, 1, '{}', 2),
(84, 9, 'code', 'text', 'Mã đề', 1, 1, 1, 1, 1, 1, '{\"placeholder\":\"D\\u1eef li\\u1ec7u tr\\u01b0\\u1eddng n\\u00e0y s\\u1ebd \\u0111\\u01b0\\u1ee3c t\\u1ea1o t\\u1ef1 \\u0111\\u1ed9ng\",\"disabled\":true}', 4),
(85, 9, 'question_number', 'number', 'Số lượng câu hỏi', 1, 1, 1, 1, 1, 1, '{\"default\":10}', 8);

-- --------------------------------------------------------

--
-- Table structure for table `data_types`
--

CREATE TABLE `data_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `display_name_singular` varchar(255) NOT NULL,
  `display_name_plural` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `model_name` varchar(255) DEFAULT NULL,
  `policy_name` varchar(255) DEFAULT NULL,
  `controller` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `generate_permissions` tinyint(1) NOT NULL DEFAULT 0,
  `server_side` tinyint(4) NOT NULL DEFAULT 0,
  `details` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `data_types`
--

INSERT INTO `data_types` (`id`, `name`, `slug`, `display_name_singular`, `display_name_plural`, `icon`, `model_name`, `policy_name`, `controller`, `description`, `generate_permissions`, `server_side`, `details`, `created_at`, `updated_at`) VALUES
(1, 'users', 'users', 'User', 'Users', 'voyager-person', 'TCG\\Voyager\\Models\\User', 'TCG\\Voyager\\Policies\\UserPolicy', 'TCG\\Voyager\\Http\\Controllers\\VoyagerUserController', '', 1, 0, NULL, '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(2, 'menus', 'menus', 'Menu', 'Menus', 'voyager-list', 'TCG\\Voyager\\Models\\Menu', NULL, '', '', 1, 0, NULL, '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(3, 'roles', 'roles', 'Role', 'Roles', 'voyager-lock', 'TCG\\Voyager\\Models\\Role', NULL, 'TCG\\Voyager\\Http\\Controllers\\VoyagerRoleController', '', 1, 0, NULL, '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(4, 'categories', 'categories', 'Category', 'Categories', 'voyager-categories', 'TCG\\Voyager\\Models\\Category', NULL, '', '', 1, 0, NULL, '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(5, 'posts', 'posts', 'Post', 'Posts', 'voyager-news', 'TCG\\Voyager\\Models\\Post', 'TCG\\Voyager\\Policies\\PostPolicy', '', '', 1, 0, NULL, '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(6, 'pages', 'pages', 'Page', 'Pages', 'voyager-file-text', 'TCG\\Voyager\\Models\\Page', NULL, '', '', 1, 0, NULL, '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(7, 'subjects', 'subjects', 'Subject', 'Subjects', NULL, 'App\\Models\\Subject', NULL, NULL, NULL, 1, 0, '{\"order_column\":null,\"order_display_column\":null,\"order_direction\":\"asc\",\"default_search_key\":null,\"scope\":null}', '2023-10-18 00:07:28', '2023-10-18 18:24:22'),
(8, 'questions', 'questions', 'Câu hỏi', 'Câu hỏi', NULL, 'App\\Models\\Question', NULL, NULL, NULL, 1, 0, '{\"order_column\":null,\"order_display_column\":null,\"order_direction\":\"asc\",\"default_search_key\":null,\"scope\":null}', '2023-10-18 00:11:50', '2023-10-18 18:26:49'),
(9, 'tests', 'tests', 'Bài kiểm tra', 'Bài kiểm tra', NULL, 'App\\Models\\Test', NULL, 'App\\Http\\Controllers\\Admin\\TestController', NULL, 1, 0, '{\"order_column\":null,\"order_display_column\":null,\"order_direction\":\"asc\",\"default_search_key\":null,\"scope\":null}', '2023-10-18 00:15:52', '2023-10-20 01:34:10');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '2023-10-13 05:31:14', '2023-10-13 05:31:14');

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `menu_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `target` varchar(255) NOT NULL DEFAULT '_self',
  `icon_class` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `parameters` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`id`, `menu_id`, `title`, `url`, `target`, `icon_class`, `color`, `parent_id`, `order`, `created_at`, `updated_at`, `route`, `parameters`) VALUES
(1, 1, 'Dashboard', '', '_self', 'voyager-boat', NULL, NULL, 1, '2023-10-13 05:31:14', '2023-10-13 05:31:14', 'voyager.dashboard', NULL),
(2, 1, 'Media', '', '_self', 'voyager-images', NULL, NULL, 4, '2023-10-13 05:31:14', '2023-10-18 01:10:00', 'voyager.media.index', NULL),
(3, 1, 'Users', '', '_self', 'voyager-person', NULL, NULL, 3, '2023-10-13 05:31:14', '2023-10-13 05:31:14', 'voyager.users.index', NULL),
(4, 1, 'Roles', '', '_self', 'voyager-lock', NULL, NULL, 2, '2023-10-13 05:31:14', '2023-10-13 05:31:14', 'voyager.roles.index', NULL),
(5, 1, 'Tools', '', '_self', 'voyager-tools', NULL, NULL, 9, '2023-10-13 05:31:14', '2023-10-18 01:10:57', NULL, NULL),
(6, 1, 'Menu Builder', '', '_self', 'voyager-list', NULL, 5, 1, '2023-10-13 05:31:14', '2023-10-18 01:10:01', 'voyager.menus.index', NULL),
(7, 1, 'Database', '', '_self', 'voyager-data', NULL, 5, 2, '2023-10-13 05:31:14', '2023-10-18 01:10:01', 'voyager.database.index', NULL),
(8, 1, 'Compass', '', '_self', 'voyager-compass', NULL, 5, 3, '2023-10-13 05:31:14', '2023-10-18 01:10:01', 'voyager.compass.index', NULL),
(9, 1, 'BREAD', '', '_self', 'voyager-bread', NULL, 5, 4, '2023-10-13 05:31:14', '2023-10-18 01:10:01', 'voyager.bread.index', NULL),
(10, 1, 'Settings', '', '_self', 'voyager-settings', NULL, NULL, 10, '2023-10-13 05:31:14', '2023-10-18 01:10:57', 'voyager.settings.index', NULL),
(11, 1, 'Categories', '', '_self', 'voyager-categories', NULL, NULL, 7, '2023-10-13 05:31:15', '2023-10-18 01:10:01', 'voyager.categories.index', NULL),
(12, 1, 'Posts', '', '_self', 'voyager-news', NULL, NULL, 5, '2023-10-13 05:31:15', '2023-10-18 01:10:00', 'voyager.posts.index', NULL),
(13, 1, 'Pages', '', '_self', 'voyager-file-text', NULL, NULL, 6, '2023-10-13 05:31:15', '2023-10-18 01:10:00', 'voyager.pages.index', NULL),
(14, 1, 'Môn học', '', '_self', NULL, '#000000', 17, 1, '2023-10-18 00:07:28', '2023-10-18 01:10:13', 'voyager.subjects.index', 'null'),
(15, 1, 'Câu hỏi', '', '_self', NULL, NULL, 17, 3, '2023-10-18 00:11:50', '2023-10-18 01:10:06', 'voyager.questions.index', NULL),
(16, 1, 'Bài kiểm tra', '', '_self', NULL, '#000000', 17, 2, '2023-10-18 00:15:52', '2023-10-18 01:10:44', 'voyager.tests.index', 'null'),
(17, 1, 'Thi', '', '_self', 'voyager-book', '#000000', NULL, 8, '2023-10-18 01:09:56', '2023-10-18 01:11:35', NULL, '');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2016_06_01_000001_create_oauth_auth_codes_table', 2),
(6, '2016_06_01_000002_create_oauth_access_tokens_table', 2),
(7, '2016_06_01_000003_create_oauth_refresh_tokens_table', 2),
(8, '2016_06_01_000004_create_oauth_clients_table', 2),
(9, '2016_06_01_000005_create_oauth_personal_access_clients_table', 2),
(10, '2016_01_01_000000_add_voyager_user_fields', 3),
(11, '2016_01_01_000000_create_data_types_table', 3),
(12, '2016_05_19_173453_create_menu_table', 3),
(13, '2016_10_21_190000_create_roles_table', 3),
(14, '2016_10_21_190000_create_settings_table', 3),
(15, '2016_11_30_135954_create_permission_table', 3),
(16, '2016_11_30_141208_create_permission_role_table', 3),
(17, '2016_12_26_201236_data_types__add__server_side', 3),
(18, '2017_01_13_000000_add_route_to_menu_items_table', 3),
(19, '2017_01_14_005015_create_translations_table', 3),
(20, '2017_01_15_000000_make_table_name_nullable_in_permissions_table', 3),
(21, '2017_03_06_000000_add_controller_to_data_types_table', 3),
(22, '2017_04_21_000000_add_order_to_data_rows_table', 3),
(23, '2017_07_05_210000_add_policyname_to_data_types_table', 3),
(24, '2017_08_05_000000_add_group_to_settings_table', 3),
(25, '2017_11_26_013050_add_user_role_relationship', 3),
(26, '2017_11_26_015000_create_user_roles_table', 3),
(27, '2018_03_11_000000_add_user_settings', 3),
(28, '2018_03_14_000000_add_details_to_data_types_table', 3),
(29, '2018_03_16_000000_make_settings_value_nullable', 3),
(30, '2016_01_01_000000_create_pages_table', 4),
(31, '2016_01_01_000000_create_posts_table', 4),
(32, '2016_02_15_204651_create_categories_table', 4),
(33, '2017_04_11_000000_alter_post_nullable_fields_table', 4),
(34, '2014_10_12_000000_create_admins_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0162452b04fabb1601035272eab7042d7a5761bcc1b8c60da7199ab7125b5fc81dde1c32f44ef6d0', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:06:21', '2023-10-14 00:06:21', '2024-10-14 07:06:21'),
('058cb45a109e89ea5812485ec88828fd0492ac25423cf94468c10752f34638d30d97d94ba92ce0f4', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:06:11', '2023-10-14 00:06:11', '2024-10-14 07:06:11'),
('0cbf0e71962021f01dd6e233dd1e94966c938fbf1b89eb80e80faa0bfae40be0d35fe8507f15676f', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:14:57', '2023-10-14 00:14:57', '2024-10-14 07:14:57'),
('1dc96235af16e894ae38969da5b954ceb357a5bca4b2425b9ed23b05b6fbfcc7234c539e4f53dbe7', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:14:41', '2023-10-14 00:14:41', '2024-10-14 07:14:41'),
('4bc8f73410137443e67142ad5a72758b16e365c5a0dac309f8799fffef41f395e934c5eb11ac3ff7', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 01:05:39', '2023-10-14 01:05:39', '2024-10-14 08:05:39'),
('50701c7525eacb59e80fab55f06ecc09cfd05fdff0e8c2e84b68c0d9bcaf3df7d665a90080465c38', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:05:37', '2023-10-14 00:05:38', '2024-10-14 07:05:37'),
('6a91da2872dfe39174275889fb999b4693b895e925326d6f8037f87e177e5161a3f1e540a440cadd', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:14:14', '2023-10-14 00:14:14', '2024-10-14 07:14:14'),
('7f93b880443946a7e013891c00cca1439ef0888acaf6bf005561d4e81375d6de6ed694603f0ff3fb', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:12:10', '2023-10-14 00:12:10', '2024-10-14 07:12:10'),
('8c51f9cbdac16a1e2c23478c227d4ab81c54622a4fa07ebfbf3c3fd2303779a3251e923c5d28572c', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:24:03', '2023-10-14 00:24:03', '2024-10-14 07:24:03'),
('8eca7bd7a6398573f5e1d2eab93a6fe419deed7127f0d5498279d7e47a4bccee83311d4dac30aa51', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-13 18:19:31', '2023-10-13 18:19:31', '2024-10-14 01:19:31'),
('9bfa5201945d9eb7b4b5dba22ff3381a9b7e8085b6f3e4347e82cc1fc68509ede8412332c8cb0b59', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:06:43', '2023-10-14 00:06:43', '2024-10-14 07:06:43'),
('a90f3d17b0d0f956de8ab889fe3f82d51b9474e50e7429d4d19a6cacd5da5a24e138d27ca32b84d4', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-13 18:06:53', '2023-10-13 18:06:53', '2024-10-14 01:06:53'),
('ba793c0ac89462268fc2aa13f8141ff556db311bfc07f1977cfd0ab5c36c8ce0fb7e8e16d43b27d1', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-18 19:42:04', '2023-10-18 19:42:04', '2024-10-19 02:42:04'),
('bcf7bc6cd15e1d6ce68ee48badb4cbdffb8248a31157a0f866d56572cafc86afd9b1bd3b731e4134', 1, 1, 'viethungit', '[]', 0, '2023-10-13 05:51:21', '2023-10-13 05:51:21', '2024-10-13 12:51:21'),
('c360f1b5b42f79e07ea80260de09b928abae55ed8eb3c976de980c5481fa8d05cc1d3c1eb7781f49', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:13:20', '2023-10-14 00:13:21', '2024-10-14 07:13:20'),
('dde8e325f078f94eb53e226de729b9c496f0b446710f6e33e1f5f86a7489a7ffdf4b2f1295972f5b', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:07:02', '2023-10-14 00:07:02', '2024-10-14 07:07:02'),
('e9041f697c21e9cd98f0873047a09f19a183ce7dc952aed8b3137fe944c7c342fc229a54e0e57184', 1, 1, 'fsdaklffjksadfkjhwi', '[]', 0, '2023-10-14 00:16:00', '2023-10-14 00:16:00', '2024-10-14 07:16:00'),
('ef216aa66115cc7a6fdbae61ff635aa89f1a0e8140d6162806b108a1946bcd706a6831018d7aaedc', 1, 1, 'viethungit', '[]', 0, '2023-10-13 05:52:05', '2023-10-13 05:52:05', '2024-10-13 12:52:05');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'dViB0zxXBeXrxf4iPVWYia4tuOB5yqCo1RIs6Xfw', NULL, 'http://localhost', 1, 0, 0, '2023-10-13 05:22:51', '2023-10-13 05:22:51'),
(2, NULL, 'Laravel Password Grant Client', '8ldsnqdXAVKEIWhjuQWmchGJmMJcLfhPwtTEkdtN', 'users', 'http://localhost', 0, 1, 0, '2023-10-13 05:22:51', '2023-10-13 05:22:51');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2023-10-13 05:22:51', '2023-10-13 05:22:51');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `body` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_keywords` text DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'INACTIVE',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `author_id`, `title`, `excerpt`, `body`, `image`, `slug`, `meta_description`, `meta_keywords`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 'Hello World', 'Hang the jib grog grog blossom grapple dance the hempen jig gangway pressgang bilge rat to go on account lugger. Nelsons folly gabion line draught scallywag fire ship gaff fluke fathom case shot. Sea Legs bilge rat sloop matey gabion long clothes run a shot across the bow Gold Road cog league.', '<p>Hello World. Scallywag grog swab Cat o\'nine tails scuttle rigging hardtack cable nipper Yellow Jack. Handsomely spirits knave lad killick landlubber or just lubber deadlights chantey pinnace crack Jennys tea cup. Provost long clothes black spot Yellow Jack bilged on her anchor league lateen sail case shot lee tackle.</p>\n<p>Ballast spirits fluke topmast me quarterdeck schooner landlubber or just lubber gabion belaying pin. Pinnace stern galleon starboard warp carouser to go on account dance the hempen jig jolly boat measured fer yer chains. Man-of-war fire in the hole nipperkin handsomely doubloon barkadeer Brethren of the Coast gibbet driver squiffy.</p>', 'pages/page1.jpg', 'hello-world', 'Yar Meta Description', 'Keyword1, Keyword2', 'ACTIVE', '2023-10-13 05:31:15', '2023-10-13 05:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `table_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `key`, `table_name`, `created_at`, `updated_at`) VALUES
(1, 'browse_admin', NULL, '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(2, 'browse_bread', NULL, '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(3, 'browse_database', NULL, '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(4, 'browse_media', NULL, '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(5, 'browse_compass', NULL, '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(6, 'browse_menus', 'menus', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(7, 'read_menus', 'menus', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(8, 'edit_menus', 'menus', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(9, 'add_menus', 'menus', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(10, 'delete_menus', 'menus', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(11, 'browse_roles', 'roles', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(12, 'read_roles', 'roles', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(13, 'edit_roles', 'roles', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(14, 'add_roles', 'roles', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(15, 'delete_roles', 'roles', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(16, 'browse_users', 'users', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(17, 'read_users', 'users', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(18, 'edit_users', 'users', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(19, 'add_users', 'users', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(20, 'delete_users', 'users', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(21, 'browse_settings', 'settings', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(22, 'read_settings', 'settings', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(23, 'edit_settings', 'settings', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(24, 'add_settings', 'settings', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(25, 'delete_settings', 'settings', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(26, 'browse_categories', 'categories', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(27, 'read_categories', 'categories', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(28, 'edit_categories', 'categories', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(29, 'add_categories', 'categories', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(30, 'delete_categories', 'categories', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(31, 'browse_posts', 'posts', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(32, 'read_posts', 'posts', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(33, 'edit_posts', 'posts', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(34, 'add_posts', 'posts', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(35, 'delete_posts', 'posts', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(36, 'browse_pages', 'pages', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(37, 'read_pages', 'pages', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(38, 'edit_pages', 'pages', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(39, 'add_pages', 'pages', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(40, 'delete_pages', 'pages', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(41, 'browse_subjects', 'subjects', '2023-10-18 00:07:28', '2023-10-18 00:07:28'),
(42, 'read_subjects', 'subjects', '2023-10-18 00:07:28', '2023-10-18 00:07:28'),
(43, 'edit_subjects', 'subjects', '2023-10-18 00:07:28', '2023-10-18 00:07:28'),
(44, 'add_subjects', 'subjects', '2023-10-18 00:07:28', '2023-10-18 00:07:28'),
(45, 'delete_subjects', 'subjects', '2023-10-18 00:07:28', '2023-10-18 00:07:28'),
(46, 'browse_questions', 'questions', '2023-10-18 00:11:50', '2023-10-18 00:11:50'),
(47, 'read_questions', 'questions', '2023-10-18 00:11:50', '2023-10-18 00:11:50'),
(48, 'edit_questions', 'questions', '2023-10-18 00:11:50', '2023-10-18 00:11:50'),
(49, 'add_questions', 'questions', '2023-10-18 00:11:50', '2023-10-18 00:11:50'),
(50, 'delete_questions', 'questions', '2023-10-18 00:11:50', '2023-10-18 00:11:50'),
(51, 'browse_tests', 'tests', '2023-10-18 00:15:52', '2023-10-18 00:15:52'),
(52, 'read_tests', 'tests', '2023-10-18 00:15:52', '2023-10-18 00:15:52'),
(53, 'edit_tests', 'tests', '2023-10-18 00:15:52', '2023-10-18 00:15:52'),
(54, 'add_tests', 'tests', '2023-10-18 00:15:52', '2023-10-18 00:15:52'),
(55, 'delete_tests', 'tests', '2023-10-18 00:15:52', '2023-10-18 00:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(29, 1),
(30, 1),
(31, 1),
(32, 1),
(33, 1),
(34, 1),
(35, 1),
(36, 1),
(37, 1),
(38, 1),
(39, 1),
(40, 1),
(41, 1),
(42, 1),
(43, 1),
(44, 1),
(45, 1),
(46, 1),
(47, 1),
(48, 1),
(49, 1),
(50, 1),
(51, 1),
(52, 1),
(53, 1),
(54, 1),
(55, 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'viethungit', '6a9ead701f0fb3320e1149a1485e90f5bab4f2c84dba0c0a135a8acc47f70932', '[\"*\"]', NULL, '2023-10-13 05:43:32', '2023-10-13 05:43:32'),
(2, 'App\\Models\\User', 1, 'viethungit', 'fd93606797d4f62014a37b01eb030ac1c9ed4119c2d2dc9e8e10a4961cec54dc', '[\"*\"]', NULL, '2023-10-13 05:44:13', '2023-10-13 05:44:13'),
(3, 'App\\Models\\User', 1, 'viethungit', '231d6a00e874407b5e3cafc1395784c1979c9083b032340e27ae686ac837b75d', '[\"*\"]', NULL, '2023-10-13 05:47:43', '2023-10-13 05:47:43'),
(4, 'App\\Models\\User', 1, 'viethungit', '9b883d6364129f56708c4aa17db493716024c4f2d38ed7ae8912a4bc77b6b0fc', '[\"*\"]', NULL, '2023-10-13 05:48:28', '2023-10-13 05:48:28');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `body` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `meta_description` text DEFAULT NULL,
  `meta_keywords` text DEFAULT NULL,
  `status` enum('PUBLISHED','DRAFT','PENDING') NOT NULL DEFAULT 'DRAFT',
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `author_id`, `category_id`, `title`, `seo_title`, `excerpt`, `body`, `image`, `slug`, `meta_description`, `meta_keywords`, `status`, `featured`, `created_at`, `updated_at`) VALUES
(1, 0, NULL, 'Lorem Ipsum Post', NULL, 'This is the excerpt for the Lorem Ipsum Post', '<p>This is the body of the lorem ipsum post</p>', 'posts/post1.jpg', 'lorem-ipsum-post', 'This is the meta description', 'keyword1, keyword2, keyword3', 'PUBLISHED', 0, '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(2, 0, NULL, 'My Sample Post', NULL, 'This is the excerpt for the sample Post', '<p>This is the body for the sample post, which includes the body.</p>\n                <h2>We can use all kinds of format!</h2>\n                <p>And include a bunch of other stuff.</p>', 'posts/post2.jpg', 'my-sample-post', 'Meta Description for sample post', 'keyword1, keyword2, keyword3', 'PUBLISHED', 0, '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(3, 0, NULL, 'Latest Post', NULL, 'This is the excerpt for the latest post', '<p>This is the body for the latest post</p>', 'posts/post3.jpg', 'latest-post', 'This is the meta description', 'keyword1, keyword2, keyword3', 'PUBLISHED', 0, '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(4, 0, NULL, 'Yarr Post', NULL, 'Reef sails nipperkin bring a spring upon her cable coffer jury mast spike marooned Pieces of Eight poop deck pillage. Clipper driver coxswain galleon hempen halter come about pressgang gangplank boatswain swing the lead. Nipperkin yard skysail swab lanyard Blimey bilge water ho quarter Buccaneer.', '<p>Swab deadlights Buccaneer fire ship square-rigged dance the hempen jig weigh anchor cackle fruit grog furl. Crack Jennys tea cup chase guns pressgang hearties spirits hogshead Gold Road six pounders fathom measured fer yer chains. Main sheet provost come about trysail barkadeer crimp scuttle mizzenmast brig plunder.</p>\n<p>Mizzen league keelhaul galleon tender cog chase Barbary Coast doubloon crack Jennys tea cup. Blow the man down lugsail fire ship pinnace cackle fruit line warp Admiral of the Black strike colors doubloon. Tackle Jack Ketch come about crimp rum draft scuppers run a shot across the bow haul wind maroon.</p>\n<p>Interloper heave down list driver pressgang holystone scuppers tackle scallywag bilged on her anchor. Jack Tar interloper draught grapple mizzenmast hulk knave cable transom hogshead. Gaff pillage to go on account grog aft chase guns piracy yardarm knave clap of thunder.</p>', 'posts/post4.jpg', 'yarr-post', 'this be a meta descript', 'keyword1, keyword2, keyword3', 'PUBLISHED', 0, '2023-10-13 05:31:15', '2023-10-13 05:31:15');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(10) UNSIGNED NOT NULL,
  `content` text DEFAULT NULL,
  `a` varchar(255) DEFAULT NULL,
  `b` varchar(255) DEFAULT NULL,
  `c` varchar(255) DEFAULT NULL,
  `d` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `test_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `content`, `a`, `b`, `c`, `d`, `answer`, `type`, `created_at`, `updated_at`, `test_id`) VALUES
(1, '<p>JavaScript l&agrave; ng&ocirc;n ngữ xử l&yacute; ở:</p>', 'Client', 'Server', 'Server / Client', 'Không có dạng nào', 'c', 'abcd', '2023-10-18 19:10:23', '2023-10-18 19:10:23', 1),
(2, '<p>Javascript l&agrave; ng&ocirc;n ngữ th&ocirc;ng dịch hay bi&ecirc;n dịch</p>', 'Thông dịch', 'Biên dịch', 'Cả hai dạng', 'Không có dạng nào ở trên', 'b', 'abcd', '2023-10-18 19:12:09', '2023-10-18 19:12:09', 1),
(3, '<p>Phương thức viết chương tr&igrave;nh của Javascript như thế n&agrave;o?</p>', 'Viết riêng một trang', 'Viết chung với HTML', 'Cả hai dạng A và B', 'Không có dạng nào.', 'c', 'abcd', '2023-10-18 19:13:13', '2023-10-18 19:13:13', 1),
(4, '<p>Javascript l&agrave; ng&ocirc;n ngữ kịch bản c&oacute; dấu được m&atilde; nguồn kh&ocirc;ng?</p>', 'Không dấu được vì các kịch bản chạy ở client.', 'Dấu được vì chương trình hoạt động độc lập với trình duyệt', 'Hai phát biểu đều sai.', 'Hai phát biểu đều đúng', 'a', 'abcd', '2023-10-18 19:15:10', '2023-10-18 19:15:10', 1),
(5, '<p>JavaScript được bắt đầu bằng?</p>', '<scritp> …</script>', '<Javascript> …<Javascript>', '<java>  </java>', 'Tất cả các dạng trên.', 'a', 'abcd', '2023-10-18 19:36:48', '2023-10-18 19:36:48', 1),
(6, '<p>Javascript c&oacute; c&aacute;c dạng biến?</p>', 'Number, String, Boolean', 'Number, Integer, char', 'Number, String, Boolean, Null', 'Tất cả các loại trên.', 'd', 'abcd', '2023-10-18 19:37:39', '2023-10-18 19:37:39', 1),
(7, '<p>Trong Javascript hàm parseInt() dùng để làm gì?</p>', 'Chuyển một chuỗi thành số', 'Chuyển một chuỗi thành số nguyên', 'Chuyển một chuỗi thành số thực', 'Chuyển một số nguyên thành một chuỗi', 'b', 'abcd', '2023-10-18 19:40:30', '2023-10-18 19:40:30', 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Administrator', '2023-10-13 05:31:14', '2023-10-13 05:31:14'),
(2, 'user', 'Normal User', '2023-10-13 05:31:14', '2023-10-13 05:31:14');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 1,
  `group` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `display_name`, `value`, `details`, `type`, `order`, `group`) VALUES
(1, 'site.title', 'Site Title', 'Site Title', '', 'text', 1, 'Site'),
(2, 'site.description', 'Site Description', 'Site Description', '', 'text', 2, 'Site'),
(3, 'site.logo', 'Site Logo', '', '', 'image', 3, 'Site'),
(4, 'site.google_analytics_tracking_id', 'Google Analytics Tracking ID', '', '', 'text', 4, 'Site'),
(5, 'admin.bg_image', 'Admin Background Image', '', '', 'image', 5, 'Admin'),
(6, 'admin.title', 'Admin Title', 'Voyager', '', 'text', 1, 'Admin'),
(7, 'admin.description', 'Admin Description', 'Welcome to Voyager. The Missing Admin for Laravel', '', 'text', 2, 'Admin'),
(8, 'admin.loader', 'Admin Loader', '', '', 'image', 3, 'Admin'),
(9, 'admin.icon_image', 'Admin Icon Image', '', '', 'image', 4, 'Admin'),
(10, 'admin.google_analytics_client_id', 'Google Analytics Client ID (used for admin dashboard)', '', '', 'text', 1, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Toán', 'toan', '2023-10-18 00:16:47', '2023-10-18 00:16:47'),
(2, 'Tiếng anh', 'tieng-anh', '2023-10-18 00:16:53', '2023-10-18 00:16:53'),
(3, 'Web', 'web', '2023-10-18 18:22:11', '2023-10-18 18:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `id` int(10) UNSIGNED NOT NULL,
  `subject_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `time` int(11) NOT NULL DEFAULT 60,
  `number` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `question_number` int(11) NOT NULL DEFAULT 10
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `subject_id`, `title`, `description`, `time`, `number`, `created_at`, `updated_at`, `code`, `question_number`) VALUES
(1, 3, 'Kiểm tra kết quả thực tập team IT', NULL, 60, 0, '2023-10-18 00:18:00', '2023-10-20 01:41:56', 'N3hhvf', 50);

-- --------------------------------------------------------

--
-- Table structure for table `test_histories`
--

CREATE TABLE `test_histories` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `correct` int(11) DEFAULT NULL,
  `wrong` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`answers`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `point` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `test_histories`
--

INSERT INTO `test_histories` (`id`, `user_id`, `test_id`, `correct`, `wrong`, `time`, `answers`, `created_at`, `updated_at`, `point`) VALUES
(1, 1, 1, 1, 6, 1159, '[{\"questionId\":1,\"value\":\"c\"},{\"questionId\":6,\"value\":null},{\"questionId\":4,\"value\":null},{\"questionId\":5,\"value\":null},{\"questionId\":2,\"value\":null},{\"questionId\":7,\"value\":null},{\"questionId\":3,\"value\":null}]', '2023-10-21 02:03:41', '2023-10-21 02:03:41', 0.25);

-- --------------------------------------------------------

--
-- Table structure for table `translations`
--

CREATE TABLE `translations` (
  `id` int(10) UNSIGNED NOT NULL,
  `table_name` varchar(255) NOT NULL,
  `column_name` varchar(255) NOT NULL,
  `foreign_key` int(10) UNSIGNED NOT NULL,
  `locale` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `translations`
--

INSERT INTO `translations` (`id`, `table_name`, `column_name`, `foreign_key`, `locale`, `value`, `created_at`, `updated_at`) VALUES
(1, 'data_types', 'display_name_singular', 5, 'pt', 'Post', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(2, 'data_types', 'display_name_singular', 6, 'pt', 'Página', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(3, 'data_types', 'display_name_singular', 1, 'pt', 'Utilizador', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(4, 'data_types', 'display_name_singular', 4, 'pt', 'Categoria', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(5, 'data_types', 'display_name_singular', 2, 'pt', 'Menu', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(6, 'data_types', 'display_name_singular', 3, 'pt', 'Função', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(7, 'data_types', 'display_name_plural', 5, 'pt', 'Posts', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(8, 'data_types', 'display_name_plural', 6, 'pt', 'Páginas', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(9, 'data_types', 'display_name_plural', 1, 'pt', 'Utilizadores', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(10, 'data_types', 'display_name_plural', 4, 'pt', 'Categorias', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(11, 'data_types', 'display_name_plural', 2, 'pt', 'Menus', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(12, 'data_types', 'display_name_plural', 3, 'pt', 'Funções', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(13, 'categories', 'slug', 1, 'pt', 'categoria-1', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(14, 'categories', 'name', 1, 'pt', 'Categoria 1', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(15, 'categories', 'slug', 2, 'pt', 'categoria-2', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(16, 'categories', 'name', 2, 'pt', 'Categoria 2', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(17, 'pages', 'title', 1, 'pt', 'Olá Mundo', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(18, 'pages', 'slug', 1, 'pt', 'ola-mundo', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(19, 'pages', 'body', 1, 'pt', '<p>Olá Mundo. Scallywag grog swab Cat o\'nine tails scuttle rigging hardtack cable nipper Yellow Jack. Handsomely spirits knave lad killick landlubber or just lubber deadlights chantey pinnace crack Jennys tea cup. Provost long clothes black spot Yellow Jack bilged on her anchor league lateen sail case shot lee tackle.</p>\r\n<p>Ballast spirits fluke topmast me quarterdeck schooner landlubber or just lubber gabion belaying pin. Pinnace stern galleon starboard warp carouser to go on account dance the hempen jig jolly boat measured fer yer chains. Man-of-war fire in the hole nipperkin handsomely doubloon barkadeer Brethren of the Coast gibbet driver squiffy.</p>', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(20, 'menu_items', 'title', 1, 'pt', 'Painel de Controle', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(21, 'menu_items', 'title', 2, 'pt', 'Media', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(22, 'menu_items', 'title', 12, 'pt', 'Publicações', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(23, 'menu_items', 'title', 3, 'pt', 'Utilizadores', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(24, 'menu_items', 'title', 11, 'pt', 'Categorias', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(25, 'menu_items', 'title', 13, 'pt', 'Páginas', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(26, 'menu_items', 'title', 4, 'pt', 'Funções', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(27, 'menu_items', 'title', 5, 'pt', 'Ferramentas', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(28, 'menu_items', 'title', 6, 'pt', 'Menus', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(29, 'menu_items', 'title', 7, 'pt', 'Base de dados', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(30, 'menu_items', 'title', 10, 'pt', 'Configurações', '2023-10-13 05:31:15', '2023-10-13 05:31:15'),
(31, 'data_rows', 'display_name', 71, 'en', 'Id', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(32, 'data_rows', 'display_name', 72, 'en', 'Subject Id', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(33, 'data_rows', 'display_name', 73, 'en', 'Title', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(34, 'data_rows', 'display_name', 74, 'en', 'Description', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(35, 'data_rows', 'display_name', 75, 'en', 'Time', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(36, 'data_rows', 'display_name', 76, 'en', 'Number', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(37, 'data_rows', 'display_name', 77, 'en', 'Created At', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(38, 'data_rows', 'display_name', 78, 'en', 'Updated At', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(39, 'data_rows', 'display_name', 79, 'en', 'subjects', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(40, 'data_types', 'display_name_singular', 9, 'en', 'Test', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(41, 'data_types', 'display_name_plural', 9, 'en', 'Tests', '2023-10-18 00:18:00', '2023-10-18 00:18:00'),
(42, 'data_rows', 'display_name', 61, 'en', 'Id', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(43, 'data_rows', 'display_name', 62, 'en', 'Title', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(44, 'data_rows', 'display_name', 63, 'en', 'A', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(45, 'data_rows', 'display_name', 64, 'en', 'B', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(46, 'data_rows', 'display_name', 65, 'en', 'C', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(47, 'data_rows', 'display_name', 66, 'en', 'D', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(48, 'data_rows', 'display_name', 67, 'en', 'Answer', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(49, 'data_rows', 'display_name', 68, 'en', 'Type', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(50, 'data_rows', 'display_name', 69, 'en', 'Created At', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(51, 'data_rows', 'display_name', 70, 'en', 'Updated At', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(52, 'data_rows', 'display_name', 80, 'en', 'tests', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(53, 'data_types', 'display_name_singular', 8, 'en', 'Câu hỏi', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(54, 'data_types', 'display_name_plural', 8, 'en', 'Câu hỏi', '2023-10-18 01:08:46', '2023-10-18 01:08:46'),
(55, 'menu_items', 'title', 14, 'en', 'Môn học', '2023-10-18 01:10:13', '2023-10-18 18:21:44'),
(56, 'menu_items', 'title', 16, 'en', 'Bài kiểm tra', '2023-10-18 01:10:44', '2023-10-18 18:21:51'),
(57, 'menu_items', 'title', 17, 'en', 'Thi', '2023-10-18 01:11:35', '2023-10-18 01:11:35'),
(58, 'data_rows', 'display_name', 81, 'en', 'Test Id', '2023-10-18 18:23:53', '2023-10-18 18:23:53'),
(59, 'data_rows', 'display_name', 56, 'en', 'Id', '2023-10-18 18:24:22', '2023-10-18 18:24:22'),
(60, 'data_rows', 'display_name', 57, 'en', 'Name', '2023-10-18 18:24:22', '2023-10-18 18:24:22'),
(61, 'data_rows', 'display_name', 58, 'en', 'Slug', '2023-10-18 18:24:22', '2023-10-18 18:24:22'),
(62, 'data_rows', 'display_name', 59, 'en', 'Created At', '2023-10-18 18:24:22', '2023-10-18 18:24:22'),
(63, 'data_rows', 'display_name', 60, 'en', 'Updated At', '2023-10-18 18:24:22', '2023-10-18 18:24:22'),
(64, 'data_types', 'display_name_singular', 7, 'en', 'Subject', '2023-10-18 18:24:22', '2023-10-18 18:24:22'),
(65, 'data_types', 'display_name_plural', 7, 'en', 'Subjects', '2023-10-18 18:24:22', '2023-10-18 18:24:22'),
(66, 'data_rows', 'display_name', 84, 'en', 'Code', '2023-10-20 01:04:25', '2023-10-20 01:04:25'),
(67, 'data_rows', 'display_name', 85, 'en', 'Số lượng câu hỏi', '2023-10-20 01:04:25', '2023-10-20 01:04:25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT 'users/default.png',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `settings` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `avatar`, `email_verified_at`, `password`, `remember_token`, `settings`, `created_at`, `updated_at`) VALUES
(1, 1, 'Việt Hùng', 'viet.hung.2898@gmail.com', 'users/default.png', NULL, '$2y$10$bEVOJf9rmTiH4ZLZG6txS.qZLgDXnUpD9K.pTgsrzC.wQ78ywfl/e', 'AiMzNBbCv62zZwd2pJOIC9MIiNUDU3rimrCynpgQ5wo7rvs8mle6tVTkUUUn', '{\"locale\":\"vi\"}', '2023-10-13 05:31:15', '2023-10-18 18:27:11');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `data_rows`
--
ALTER TABLE `data_rows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `data_rows_data_type_id_foreign` (`data_type_id`);

--
-- Indexes for table `data_types`
--
ALTER TABLE `data_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `data_types_name_unique` (`name`),
  ADD UNIQUE KEY `data_types_slug_unique` (`slug`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menus_name_unique` (`name`);

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_items_menu_id_foreign` (`menu_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permissions_key_index` (`key`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_permission_id_index` (`permission_id`),
  ADD KEY `permission_role_role_id_index` (`role_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `posts_slug_unique` (`slug`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_histories`
--
ALTER TABLE `test_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `translations_table_name_column_name_foreign_key_locale_unique` (`table_name`,`column_name`,`foreign_key`,`locale`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `user_roles_user_id_index` (`user_id`),
  ADD KEY `user_roles_role_id_index` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `data_rows`
--
ALTER TABLE `data_rows`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `data_types`
--
ALTER TABLE `data_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `test_histories`
--
ALTER TABLE `test_histories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `translations`
--
ALTER TABLE `translations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `data_rows`
--
ALTER TABLE `data_rows`
  ADD CONSTRAINT `data_rows_data_type_id_foreign` FOREIGN KEY (`data_type_id`) REFERENCES `data_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD CONSTRAINT `menu_items_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
