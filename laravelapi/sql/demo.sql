-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 22, 2023 at 09:00 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `block`
--

CREATE TABLE `block` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sent_from` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sent_to` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `block`
--

INSERT INTO `block` (`id`, `sent_from`, `sent_to`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '2', '3', '2023-09-20 06:35:46', '2023-09-20 06:35:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sent_from` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sent_to` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_read` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `block_flage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `sent_from_delete` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `sent_to_delete` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `sent_from`, `sent_to`, `message`, `is_read`, `block_flage`, `sent_from_delete`, `sent_to_delete`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '2', '3', 'hello', '0', '0', '0', '0', '2023-09-20 06:32:39', '2023-09-20 06:34:58', '2023-09-20 06:34:58'),
(2, '3', '2', 'Hello', '0', '0', '0', '0', '2023-09-20 06:33:20', '2023-09-20 06:35:21', '2023-09-20 06:35:21'),
(3, '2', '3', 'Getting Error ?', '1', '0', '0', '0', '2023-09-20 06:33:56', '2023-09-20 06:35:21', '2023-09-20 06:35:21'),
(4, '3', '2', 'plz check', '0', '0', '0', '0', '2023-09-20 06:34:37', '2023-09-20 06:35:21', '2023-09-20 06:35:21'),
(5, '3', '2', 'hello i am block', '0', '1', '0', '0', '2023-09-20 06:36:42', '2023-09-20 06:37:41', NULL),
(6, '2', '3', 'Yes Sorry', '1', '0', '0', '0', '2023-09-20 06:41:29', '2023-09-20 06:41:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `chat_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`id`, `chat_id`, `type`, `file`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '3', 'files', '8hLulepXPkLelpwua5W7nViTgQBPgM8qirpGgu1S.png', '2023-09-20 06:33:56', '2023-09-20 06:33:56', NULL),
(2, '3', 'files', 'Et9mxPkOgRfA8HsaJtDAvyCOwuiBRzyIX5SE69D7.png', '2023-09-20 06:33:56', '2023-09-20 06:33:56', NULL),
(3, '3', 'files', 'X5bPHoQY6g3slexTMIhNCJvMSa6l2HGDCVmKTzbR.png', '2023-09-20 06:33:56', '2023-09-20 06:33:56', NULL),
(4, '3', 'files', 'bmr20NRwCs1jFKXyeEZbZWNWey2G5ivvV8XKnq4H.png', '2023-09-20 06:33:56', '2023-09-20 06:33:56', NULL),
(5, '3', 'files', '3knJNOjOklYlZLTqLJutm8juFcOopAFlHtUXbVCw.png', '2023-09-20 06:33:56', '2023-09-20 06:33:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log_activity`
--

CREATE TABLE `log_activity` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `table_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `table_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `response` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `log_activity`
--

INSERT INTO `log_activity` (`id`, `subject`, `url`, `method`, `ip`, `agent`, `status`, `user_id`, `table_name`, `table_id`, `response`, `created_at`, `updated_at`) VALUES
(1, 'Message Create SucessFully', 'http://127.0.0.1:8000/index.php/api/message-save/', 'POST', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '2', 'chat', '1', '{\"message\":\"hello\",\"sent_from\":\"2\",\"sent_to\":\"3\",\"block_flage\":\"0\",\"is_read\":\"1\",\"updated_at\":\"2023-09-20T12:02:39.000000Z\",\"created_at\":\"2023-09-20T12:02:39.000000Z\",\"id\":1}', '2023-09-20 06:32:39', '2023-09-20 06:32:39'),
(2, 'Message Create SucessFully', 'http://127.0.0.1:8000/index.php/api/message-save/', 'POST', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '3', 'chat', '2', '{\"message\":\"Hello\",\"sent_from\":\"3\",\"sent_to\":\"2\",\"block_flage\":\"0\",\"is_read\":\"1\",\"updated_at\":\"2023-09-20T12:03:20.000000Z\",\"created_at\":\"2023-09-20T12:03:20.000000Z\",\"id\":2}', '2023-09-20 06:33:20', '2023-09-20 06:33:20'),
(3, 'Message Create SucessFully', 'http://127.0.0.1:8000/index.php/api/message-save/', 'POST', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '2', 'chat', '3', '{\"message\":\"Getting Error\",\"sent_from\":\"2\",\"sent_to\":\"3\",\"block_flage\":\"0\",\"is_read\":\"1\",\"updated_at\":\"2023-09-20T12:03:56.000000Z\",\"created_at\":\"2023-09-20T12:03:56.000000Z\",\"id\":3}', '2023-09-20 06:33:56', '2023-09-20 06:33:56'),
(4, 'Edit Message SucessFully', 'http://127.0.0.1:8000/index.php/api/edit-chat/', 'POST', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '2', 'chat', '3', '{\"id\":3,\"sent_from\":\"2\",\"sent_to\":\"3\",\"message\":\"Getting Error\",\"is_read\":\"1\",\"block_flage\":\"0\",\"sent_from_delete\":\"0\",\"sent_to_delete\":\"0\",\"created_at\":\"2023-09-20T12:03:56.000000Z\",\"updated_at\":\"2023-09-20T12:03:56.000000Z\",\"deleted_at\":\"\"}', '2023-09-20 06:34:10', '2023-09-20 06:34:10'),
(5, 'Message Create SucessFully', 'http://127.0.0.1:8000/index.php/api/message-save/', 'POST', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '3', 'chat', '4', '{\"message\":\"plz check\",\"sent_from\":\"3\",\"sent_to\":\"2\",\"block_flage\":\"0\",\"is_read\":\"1\",\"updated_at\":\"2023-09-20T12:04:37.000000Z\",\"created_at\":\"2023-09-20T12:04:37.000000Z\",\"id\":4}', '2023-09-20 06:34:37', '2023-09-20 06:34:37'),
(6, 'Delete Message SucessFully', 'http://127.0.0.1:8000/index.php/api/get-deleteChat/1', 'GET', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '2', 'chat', '1', '{\"id\":1,\"sent_from\":\"2\",\"sent_to\":\"3\",\"message\":\"hello\",\"is_read\":\"0\",\"block_flage\":\"0\",\"sent_from_delete\":\"0\",\"sent_to_delete\":\"0\",\"created_at\":\"2023-09-20T12:02:39.000000Z\",\"updated_at\":\"2023-09-20T12:03:13.000000Z\",\"deleted_at\":\"\"}', '2023-09-20 06:34:58', '2023-09-20 06:34:58'),
(7, 'Delete All Message SucessFully', 'http://127.0.0.1:8000/index.php/api/get-deleteUserChat/3/2', 'GET', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '3', 'chat', '2', '{\"id\":2,\"sent_from\":\"3\",\"sent_to\":\"2\",\"message\":\"Hello\",\"is_read\":\"0\",\"block_flage\":\"0\",\"sent_from_delete\":\"0\",\"sent_to_delete\":\"0\",\"created_at\":\"2023-09-20T12:03:20.000000Z\",\"updated_at\":\"2023-09-20T12:03:41.000000Z\",\"deleted_at\":\"\"}', '2023-09-20 06:35:21', '2023-09-20 06:35:21'),
(8, 'Delete All Message SucessFully', 'http://127.0.0.1:8000/index.php/api/get-deleteUserChat/3/2', 'GET', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '3', 'chat', '4', '{\"id\":4,\"sent_from\":\"3\",\"sent_to\":\"2\",\"message\":\"plz check\",\"is_read\":\"0\",\"block_flage\":\"0\",\"sent_from_delete\":\"0\",\"sent_to_delete\":\"0\",\"created_at\":\"2023-09-20T12:04:37.000000Z\",\"updated_at\":\"2023-09-20T12:04:43.000000Z\",\"deleted_at\":\"\"}', '2023-09-20 06:35:21', '2023-09-20 06:35:21'),
(9, 'Delete All Message SucessFully', 'http://127.0.0.1:8000/index.php/api/get-deleteUserChat/3/2', 'GET', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '3', 'chat', '3', '{\"id\":3,\"sent_from\":\"2\",\"sent_to\":\"3\",\"message\":\"Getting Error ?\",\"is_read\":\"1\",\"block_flage\":\"0\",\"sent_from_delete\":\"0\",\"sent_to_delete\":\"0\",\"created_at\":\"2023-09-20T12:03:56.000000Z\",\"updated_at\":\"2023-09-20T12:04:10.000000Z\",\"deleted_at\":\"\"}', '2023-09-20 06:35:21', '2023-09-20 06:35:21'),
(10, 'Your item has been Block', 'http://127.0.0.1:8000/index.php/api/get-bolckUserDelete/2/3', 'GET', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '2', 'block', '1', '{\"sent_from\":\"2\",\"sent_to\":\"3\",\"updated_at\":\"2023-09-20T12:05:46.000000Z\",\"created_at\":\"2023-09-20T12:05:46.000000Z\",\"id\":1}', '2023-09-20 06:35:47', '2023-09-20 06:35:47'),
(11, 'Message Create SucessFully', 'http://127.0.0.1:8000/index.php/api/message-save/', 'POST', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '3', 'chat', '5', '{\"message\":\"hello i am block\",\"sent_from\":\"3\",\"sent_to\":\"2\",\"block_flage\":\"1\",\"is_read\":\"1\",\"updated_at\":\"2023-09-20T12:06:42.000000Z\",\"created_at\":\"2023-09-20T12:06:42.000000Z\",\"id\":5}', '2023-09-20 06:36:42', '2023-09-20 06:36:42'),
(12, 'Message Create SucessFully', 'http://127.0.0.1:8000/index.php/api/message-save/', 'POST', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36', 'success', '2', 'chat', '6', '{\"message\":\"Yes Sorry\",\"sent_from\":\"2\",\"sent_to\":\"3\",\"block_flage\":\"0\",\"is_read\":\"1\",\"updated_at\":\"2023-09-20T12:11:29.000000Z\",\"created_at\":\"2023-09-20T12:11:29.000000Z\",\"id\":6}', '2023-09-20 06:41:29', '2023-09-20 06:41:29');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
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
(5, '2023_09_04_135109_create_block_table', 1),
(6, '2023_09_04_135212_create_chat_table', 1),
(7, '2023_09_04_135421_create_document_table', 1),
(8, '2023_09_04_135535_create_notes_table', 1),
(9, '2023_09_20_093416_create_log_activity_table', 1),
(10, '2023_09_20_102530_create_settings_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('BOOLEAN','NUMBER','DATE','TEXT','FILE','TEXTAREA') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hidden` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `code`, `type`, `label`, `value`, `hidden`, `created_at`, `updated_at`) VALUES
(1, 'site_logo', 'FILE', 'Site Logo', 'site_logo.png', '0', '2023-09-20 06:31:57', '2023-09-20 06:31:57'),
(2, 'project_title', 'TEXT', 'Project Title', 'Project Title', '0', '2023-09-20 06:31:57', '2023-09-20 06:31:57'),
(3, 'favicon_logo', 'FILE', 'Favicon Logo', 'favicon_logo.png', '0', '2023-09-20 06:31:57', '2023-09-20 06:31:57'),
(4, 'copyright', 'TEXT', 'Copy Right', 'Inspinia we app framework base on Bootstrap 3', '0', '2023-09-20 06:31:57', '2023-09-20 06:31:57'),
(5, 'thankyou', 'TEXT', 'Thank You', 'Thank You', '0', '2023-09-20 06:31:57', '2023-09-20 06:31:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.png',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'users',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `available` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `avatar`, `name`, `last_name`, `mobile_number`, `birth_date`, `website`, `address`, `email`, `email_verified_at`, `password`, `user_type`, `status`, `available`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'default.png', 'Alex', 'Smith', '0000000000', '00/00/0000', 'http://localhost:3000/Profile', 'Address', 'admin@admin.com', NULL, '$2y$10$Hc63cQXx4GtNUsmMqslCxuF7ga4lwotJq569lcLdRMBoRWBAqwT6W', 'superadmin', 'active', 'on', NULL, '2023-09-20 06:31:57', '2023-09-20 06:31:57', NULL),
(2, 'jaymin.png', 'jaymin', 'modi', '9876543210', '30/05/1994', 'http://localhost:3000/Profile', '4/2/25 salviwado patan', 'jaymin@gmail.com', NULL, '$2y$10$Ol3JJQDwma3cMhwh37q1nuA/jCj5OjTWOsGbt2rnMTzmX77YQ3GMy', 'users', 'active', 'on', NULL, '2023-08-20 06:31:57', '2023-09-20 06:31:57', NULL),
(3, 'bharat.png', 'bharat', 'Patel', '8488080145', '03/05/1996', 'http://localhost:3000/Profile', 'Shilp Corporate Park, B - 1009 to 1014, behind Rajpath Rangoli Road, Bodakdev, Ahmedabad, Gujarat 380054', 'bharat@gmail.com', NULL, '$2y$10$v/5KwEHq44O5AnIpyR/TD.mIrXhq2OuNU13XwvRRvCmkU7Tvii.yq', 'users', 'active', 'on', NULL, '2023-07-20 06:31:57', '2023-09-21 04:47:42', NULL),
(4, 'bharat.png', 'sagar', 'Patel', '9876543210', '03/05/1996', 'http://localhost:3000/Profile', 'Shilp Corporate Park, B - 1009 to 1014, behind Rajpath Rangoli Road, Bodakdev, Ahmedabad, Gujarat 380054', 'sagar@gmail.com', NULL, '$2y$10$v/5KwEHq44O5AnIpyR/TD.mIrXhq2OuNU13XwvRRvCmkU7Tvii.yq', 'users', 'active', 'on', NULL, '2023-07-20 06:31:57', '2023-09-21 04:47:42', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `block`
--
ALTER TABLE `block`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log_activity`
--
ALTER TABLE `log_activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `block`
--
ALTER TABLE `block`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log_activity`
--
ALTER TABLE `log_activity`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
