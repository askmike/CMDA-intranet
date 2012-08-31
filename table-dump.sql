-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 31, 2012 at 11:04 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `cmdatweets`
--

-- --------------------------------------------------------

--
-- Table structure for table `intranet`
--

CREATE TABLE IF NOT EXISTS `intranet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` int(11) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `title` varchar(300) NOT NULL,
  `content` text NOT NULL,
  `stream` varchar(150) NOT NULL,
  `url` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `timestamp` (`timestamp`),
  UNIQUE KEY `url` (`url`),
  KEY `author` (`author`),
  KEY `title` (`title`),
  KEY `stream` (`stream`),
  FULLTEXT KEY `content` (`content`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;
