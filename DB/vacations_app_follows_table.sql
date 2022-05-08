-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations_app
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `follows_table`
--

DROP TABLE IF EXISTS `follows_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows_table` (
  `followId` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`followId`),
  KEY `followstable_idfk_1` (`userId`),
  KEY `followstable_ibfk_2` (`vacationId`),
  CONSTRAINT `follows_table_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE,
  CONSTRAINT `followstable_idfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows_table`
--

LOCK TABLES `follows_table` WRITE;
/*!40000 ALTER TABLE `follows_table` DISABLE KEYS */;
INSERT INTO `follows_table` VALUES (256,'bf7a03c4-3c85-4239-bea9-0ae57646eeff',95),(257,'bf7a03c4-3c85-4239-bea9-0ae57646eeff',96),(258,'bf7a03c4-3c85-4239-bea9-0ae57646eeff',97),(259,'1bd0d8e9-30b5-4a93-abeb-0ceefaf9cc41',95),(260,'1bd0d8e9-30b5-4a93-abeb-0ceefaf9cc41',96),(261,'247c44eb-d302-4e7a-b678-499f24525fd8',97),(262,'247c44eb-d302-4e7a-b678-499f24525fd8',95);
/*!40000 ALTER TABLE `follows_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-07 23:42:33
