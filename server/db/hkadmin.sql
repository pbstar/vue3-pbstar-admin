/*
 Navicat MySQL Data Transfer

 Source Server         : hkadmin
 Source Server Type    : MySQL
 Source Server Version : 50562
 Source Host           : 43.138.29.120:3306
 Source Schema         : hkadmin

 Target Server Type    : MySQL
 Target Server Version : 50562
 File Encoding         : 65001

 Date: 23/12/2023 15:32:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_delete` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `section` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门',
  `make_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配镜日期',
  `name_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '品名型号',
  `luminosity_left` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '光度',
  `luminosity_right` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `luminosity_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '光型',
  `pd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'PD',
  `user_id` int(12) NULL DEFAULT NULL,
  `urgent` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '加急',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, '测试订单', '没什么备注的', '2023-12-19 22:42:35', '0', '0', '六部', '12.9', '酷客2521', 'L:-6.00/-1.00*130;R:5.75/-0.75*35', '1', NULL, '61', 4, '1');
INSERT INTO `order` VALUES (2, '测试订单2', '没什么备注的', '2023-12-19 22:42:35', '0', '0', '六部', '12.9', '酷客2521', 'L:-6.00/-1.00*130;R:5.75/-0.75*35', '1', NULL, '61', 4, '1');
INSERT INTO `order` VALUES (3, '测试订单3', '没什么备注的', '2023-12-19 22:42:35', '1', '1', '六部', '12.9', '酷客2521', 'L:-6.00/-1.00*130;R:5.75/-0.75*35', '1', NULL, '61', 4, NULL);
INSERT INTO `order` VALUES (4, '测试订单4', '没什么备注的', '2023-12-19 22:42:35', '0', '1', '六部', '12.9', '酷客2521', 'L:-6.00/-1.00*130;R:5.75/-0.75*35', '1', NULL, '61', 4, '2');
INSERT INTO `order` VALUES (5, '测试订单', '没什么备注的', '2023-12-19 22:42:35', '0', '0', '六部', '12.9', '酷客2521', 'L:-6.00/-1.00*130;R:5.75/-0.75*35', '1', NULL, '61', 4, NULL);
INSERT INTO `order` VALUES (6, '测试订单', '12', '2023-12-21 19:07:46', '0', '0', '测试部门', '12.21', '12', '12', '1', NULL, '12', 1, NULL);
INSERT INTO `order` VALUES (7, '1', '1', '2023-12-21 19:15:03', '0', '0', '1', '1', '1', '1', '1', NULL, '1', 1, NULL);
INSERT INTO `order` VALUES (8, '123', '11', '2023-12-22 19:42:21', '0', '1', NULL, '1', '1', '11', '11', '1', '11', 1, '1');
INSERT INTO `order` VALUES (9, '111', '1', '2023-12-22 21:00:38', '0', '0', NULL, '2023-12-13T16:00:00.000Z', '1', '1', '1', '1', '1', 1, '1');
INSERT INTO `order` VALUES (10, '测试', '1', '2023-12-22 21:18:27', '0', '0', NULL, '2023-12-22', '1', '', '', '', '1', 1, '2');

-- ----------------------------
-- Table structure for report
-- ----------------------------
DROP TABLE IF EXISTS `report`;
CREATE TABLE `report`  (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `report_template_id` int(12) NULL DEFAULT NULL,
  `json` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(12) NULL DEFAULT NULL,
  `is_delete` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of report
-- ----------------------------
INSERT INTO `report` VALUES (1, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-19 20:52:05', 4, '0');
INSERT INTO `report` VALUES (2, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-19 20:52:05', 5, '0');
INSERT INTO `report` VALUES (3, 2, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-19 20:52:05', 6, '0');
INSERT INTO `report` VALUES (4, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 6, '0');
INSERT INTO `report` VALUES (5, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 7, '0');
INSERT INTO `report` VALUES (6, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 7, '0');
INSERT INTO `report` VALUES (7, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 7, '0');
INSERT INTO `report` VALUES (8, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 6, '1');
INSERT INTO `report` VALUES (9, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '1');
INSERT INTO `report` VALUES (10, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (11, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (12, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (13, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (14, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (15, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (16, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (17, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (18, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (19, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (20, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (21, 1, '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (22, 1, '[{\"que\":\"姓名\",\"ans\":\"张三\"},{\"que\":\"年龄\",\"ans\":\"18\"}]', '2023-12-20 21:30:22', 5, '0');
INSERT INTO `report` VALUES (23, 1, '[{\"que\":\"姓名\",\"ans\":\"李强\"},{\"que\":\"年龄\",\"ans\":\"12\"}]', '2023-12-21 13:17:12', 1, '0');
INSERT INTO `report` VALUES (24, 1, '[{\"que\":\"姓名\",\"ans\":\"李11\"},{\"que\":\"年龄\",\"ans\":\"2\"}]', '2023-12-21 13:39:08', 1, '1');
INSERT INTO `report` VALUES (25, 5, '[{\"que\":\"业绩目标（元）\",\"ans\":\"35000\"},{\"que\":\"今日业绩（元）\",\"ans\":\"1000\"},{\"que\":\"累计达成（元）\",\"ans\":\"1000\"},{\"que\":\"今日进店客户\",\"ans\":\"5\"},{\"que\":\"今日成交客户\",\"ans\":\"2\"},{\"que\":\"流失客户说明\",\"ans\":\"无法满意购置商品\"}]', '2023-12-22 11:23:01', 4, '0');

-- ----------------------------
-- Table structure for report_template
-- ----------------------------
DROP TABLE IF EXISTS `report_template`;
CREATE TABLE `report_template`  (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `json` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_delete` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of report_template
-- ----------------------------
INSERT INTO `report_template` VALUES (1, '生产报表', '生产每日报表', '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-19 20:50:02', '0');
INSERT INTO `report_template` VALUES (2, '进货报表', '进货每日报表', '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-19 20:50:02', '0');
INSERT INTO `report_template` VALUES (4, '测试报表', '测试备注', '[{\"que\":\"姓名\",\"ans\":\"\"},{\"que\":\"年龄\",\"ans\":\"\"}]', '2023-12-20 20:45:13', '0');
INSERT INTO `report_template` VALUES (5, '业绩报表', '', '[{\"que\":\"业绩目标（元）\",\"ans\":\"\"},{\"que\":\"今日业绩（元）\",\"ans\":\"\"},{\"que\":\"累计达成（元）\",\"ans\":\"\"},{\"que\":\"今日进店客户\",\"ans\":\"\"},{\"que\":\"今日成交客户\",\"ans\":\"\"},{\"que\":\"流失客户说明\",\"ans\":\"\"}]', '2023-12-22 11:21:31', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_delete` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `child` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '开发', 'root', '12345678', '-1', '2023-12-19 18:52:12', '0', NULL);
INSERT INTO `user` VALUES (2, '超管', 'admin', '12345678', '1', '2023-12-19 18:52:12', '0', NULL);
INSERT INTO `user` VALUES (3, '店铺管理员', 'dianpu', '12345678', '2', '2023-12-19 18:52:12', '0', '7,6');
INSERT INTO `user` VALUES (4, '店长1', 'dianzhang1', '12345678', '3', '2023-12-19 18:52:12', '0', NULL);
INSERT INTO `user` VALUES (5, '店长2', 'dianzhang2', '12345678', '3', '2023-12-19 18:52:12', '0', NULL);
INSERT INTO `user` VALUES (6, '店长3', 'dianzhang3', '12345678', '3', '2023-12-19 18:52:12', '0', NULL);
INSERT INTO `user` VALUES (7, '店长4', 'dianzhang4', '12345678', '3', '2023-12-19 18:52:12', '0', NULL);
INSERT INTO `user` VALUES (8, '1111', '111', '111', '2', '2023-12-20 16:57:48', '0', NULL);

SET FOREIGN_KEY_CHECKS = 1;
