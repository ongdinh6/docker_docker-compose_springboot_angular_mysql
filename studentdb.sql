/*
 Navicat Premium Data Transfer

 Source Server         : mysql_demo
 Source Server Type    : MySQL
 Source Server Version : 100418
 Source Host           : localhost:3306
 Source Schema         : studentdb

 Target Server Type    : MySQL
 Target Server Version : 100418
 File Encoding         : 65001

 Date: 17/11/2021 12:24:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for hibernate_sequence
-- ----------------------------
DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence`  (
  `next_val` bigint(20) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hibernate_sequence
-- ----------------------------
INSERT INTO `hibernate_sequence` VALUES (9);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` int(11) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `birth_day` datetime(0) NULL DEFAULT NULL,
  `deleted` bit(1) NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, 1, 'Da Nang', '1987-10-10 12:00:00', b'1', 'Hoang Van Long');
INSERT INTO `student` VALUES (2, 1, 'Dong Nai', '2021-11-10 18:48:50', b'0', 'Nguyen Van B');
INSERT INTO `student` VALUES (3, 1, 'HCM', '2021-11-12 14:12:00', b'0', 'Nguyen Van C');
INSERT INTO `student` VALUES (4, 1, 'Vinh Thuan', '2021-11-12 14:18:49', b'0', 'Tran Khanh Hoang');
INSERT INTO `student` VALUES (5, 1, 'HCM', '2021-11-01 07:00:00', b'0', 'Nguyen Hoang Nam');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `admin` bit(1) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, b'1', 'admin@gmail.com', '12345', 'Nguyen Anh Admin', ' ');
INSERT INTO `user` VALUES (7, b'0', 'kiem.thu@gmail.com', '123abcA@', 'Nguyen Van Kiem Thu', 'Ha Noi');
INSERT INTO `user` VALUES (8, b'0', 'kiem.thu.07@gmail.com', '123abcA@', 'Nguyen Van Kiem Truong', 'HCM');

SET FOREIGN_KEY_CHECKS = 1;
