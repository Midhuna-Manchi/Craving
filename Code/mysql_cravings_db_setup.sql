-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: cravings_db
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int DEFAULT NULL,
  `SmoothiesTitle` varchar(30) DEFAULT NULL,
  `SmoothiesName` varchar(30) DEFAULT NULL,
  `SmoothiesImage` varchar(100) DEFAULT NULL,
  `Description` varchar(30) DEFAULT NULL,
  `Calories` int DEFAULT NULL,
  `Price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Strawberry + Chacolate','Oat Bowl','almond.jpg','Tasty and Healthy',350,20),(2,'Strawberry + Chacolate','Oat Bowl','Rainbow.jpg','Tasty and Healthy',350,30),(3,'Strawberry + Chacolate','Oat Bowl','strawberrydrink.jpg','Tasty and Healthy',350,10),(4,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,20),(5,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,30),(6,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,10),(7,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,20),(8,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,30),(9,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,10),(10,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,20),(11,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,30),(12,'Strawberry + Chacolate','Oat Bowl','OIP.jpg','Tasty and Healthy',350,10);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_plans`
--

DROP TABLE IF EXISTS `subscription_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_plans` (
  `PlanID` int NOT NULL AUTO_INCREMENT,
  `PlanType` varchar(20) DEFAULT NULL,
  `PlanName` varchar(20) DEFAULT NULL,
  `PlanDescription` varchar(30) DEFAULT NULL,
  `PlanPrice` int DEFAULT NULL,
  `PlanSize` int DEFAULT NULL,
  PRIMARY KEY (`PlanID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_plans`
--

LOCK TABLES `subscription_plans` WRITE;
/*!40000 ALTER TABLE `subscription_plans` DISABLE KEYS */;
INSERT INTO `subscription_plans` VALUES (1,'Weekly Plans','Individual Plan','Includes 7 containers',25,7),(2,'Weekly Plans','Friends Plan','Includes 14 containers',50,14),(3,'Weekly Plans','Family Plan','Includes 21 containers',75,21),(4,'Monthly Plans','Individual Plan','Includes 26 containers',100,26),(5,'Monthly Plans','Family Plan','Includes 47 containers',200,47);
/*!40000 ALTER TABLE `subscription_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(30) DEFAULT NULL,
  `LastName` varchar(30) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Username` varchar(30) DEFAULT NULL,
  `Password` varchar(30) DEFAULT NULL,
  `isAdmin` char(1) DEFAULT 'N',
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Midhuna','Manchi','163 South St.','midhu','12345','N');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-06 16:46:13
