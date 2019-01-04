-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2017 at 09:57 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `go-mini-social-network`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `Follow` (
  `FollowID` int(11) NOT NULL,
  `FollowBy` int(11) NOT NULL,
  `FollowTo` int(11) NOT NULL,
  `FollowTime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Follow`
--

INSERT INTO `Follow` (`FollowID`, `FollowBy`, `FollowTo`, `FollowTime`) VALUES
(7, 6, 5, '2017-09-25 10:15:53.957231'),
(9, 5, 6, '2017-09-25 11:13:03.499015'),
(10, 7, 6, '2017-09-25 15:34:00.040075'),
(11, 8, 6, '2017-09-25 15:46:39.580505'),
(12, 6, 7, '2017-09-25 19:42:57.891789');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `Likes` (
  `LikeID` int(11) NOT NULL,
  `PostID` int(11) NOT NULL,
  `LikeBy` int(11) NOT NULL,
  `LikeTime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `Likes` (`LikeID`, `PostID`, `LikeBy`, `LikeTime`) VALUES
(6, 9, 5, '2017-09-25 16:35:50.840949'),
(7, 9, 6, '2017-09-25 19:10:00.3598');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `Posts` (
  `PostID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `Posts` (`PostID`, `Title`, `Content`, `CreatedBy`, `CreatedAt`) VALUES
(2, 'second', 'second_content', 6, '2017-09-23 10:43:5.941602'),
(5, 'third', 'third content..', 6, '2017-09-23 11:32:45.941602'),
(9, 'Hello,', 'World!!', 6, '2017-09-24 19:09:37.024131'),
(10, 'my title..', 'my content...', 5, '2017-09-25 14:20:35.959114'),
(11, 'ghalib''s first title..', 'and this is content!!!', 7, '2017-09-25 15:38:51.705595'),
(12, 'jkj', 'kj', 8, '2017-09-25 15:43:24.782827');

-- --------------------------------------------------------

--
-- Table structure for table `profile_views`
--

CREATE TABLE `Profile_views` (
  `ViewID` int(11) NOT NULL,
  `ViewBy` int(11) NOT NULL,
  `ViewTo` int(11) NOT NULL,
  `ViewTime` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_views`
--

INSERT INTO `profile_views` (`ViewID`, `ViewBy`, `ViewTo`, `ViewTime`) VALUES
(14, 6, 5, '2017-09-25 10:49:21.373119'),
(15, 5, 6, '2017-09-25 11:13:01.246732'),
(16, 5, 6, '2017-09-25 11:13:03.912177'),
(17, 5, 6, '2017-09-25 11:13:11.465508'),
(18, 6, 5, '2017-09-25 11:30:52.987842'),
(19, 7, 6, '2017-09-25 15:33:58.973987'),
(20, 7, 6, '2017-09-25 15:34:00.460281'),
(21, 8, 6, '2017-09-25 15:46:37.855424'),
(22, 8, 6, '2017-09-25 15:46:40.10399'),
(23, 6, 7, '2017-09-25 19:42:12.359235'),
(24, 6, 7, '2017-09-25 19:42:56.505978'),
(25, 6, 7, '2017-09-25 19:42:58.333437');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(32) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Bio` text,
  `Joined` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Username`, `Email`, `Password`, `Bio`, `Joined`) VALUES
(5, 'takkar', 'takkar@gmail.com', '$2a$10$ttnsVDOPgMlA5vvDE33eneqVO3BHE/zif/axxI5AwNpOuRetkxFk6', '', '2017-09-23 7:02:14.941602'),
(6, 'faiyaz', 'faiyaz@gmail.com', '$2a$10$.Wx2jBjYPiMFgWGCW.USze.qFMwrgN1TWOf50CQgqHDBzpcYV2uSa', '', '2017-09-23 1:22:41.941602'),
(7, 'ghalib', 'ghalib@gmail.com', '$2a$10$ziw6cqTgpSBIvASZOjTheey8sQYf1iW3HW4N.Xjq4GX6faKqzIrE.', '', '2017-09-23 1:22:41.941602'),
(8, 'nature', 'nature@gmail.com', '$2a$10$nBi64BlbJMlzuSJfOhPlXevwdCgHOXKLZQUbJQ1q2Y7Ltbpaf1Woa', '', '2017-09-25 15:43:08.675349');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Follow`
--
ALTER TABLE `Follow`
  ADD PRIMARY KEY (`FollowID`);

--
-- Indexes for table `likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`LikeID`);

--
-- Indexes for table `posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`PostID`);

--
-- Indexes for table `profile_views`
--
ALTER TABLE `Profile_views`
  ADD PRIMARY KEY (`ViewID`);

--
-- Indexes for table `users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `Follow`
  MODIFY `FollowID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `Likes`
  MODIFY `LikeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `Posts`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `profile_views`
--
ALTER TABLE `Profile_views`
  MODIFY `ViewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
