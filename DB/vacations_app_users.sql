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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` varchar(100) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `role` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1bd0d8e9-30b5-4a93-abeb-0ceefaf9cc41','ori','sol','ori@gmail.com','203c4cef45a745eef55aa2757325b2cd3af218f847f12a47bc5e91b715f78051938e3c898d2425ab7672d4c855050058c9809758ab2ab5ad54495f5559bf2c1c',0),('247c44eb-d302-4e7a-b678-499f24525fd8','yulia','blous','yulia@gmail.com','203c4cef45a745eef55aa2757325b2cd3af218f847f12a47bc5e91b715f78051938e3c898d2425ab7672d4c855050058c9809758ab2ab5ad54495f5559bf2c1c',0),('3ac8cb36-d350-4bd1-8849-ce3911b8908f','omri','ben shalom','omribenshalom@gmail.com','203c4cef45a745eef55aa2757325b2cd3af218f847f12a47bc5e91b715f78051938e3c898d2425ab7672d4c855050058c9809758ab2ab5ad54495f5559bf2c1c',0),('806e2587-fde5-41cd-af02-dbfb6555beaa','admin','admin','admin@gmail.com','46e7f1cb50e90ba908cbd384f70a8dd67c38e88eed5d14dfa1cfed1aab466669a3dd275ce946d6fee15963f1245d122fcdcb5883569854deee65a0bd1ce5a377',1),('ab69e9c1-67c0-4309-8001-06d4243e791f','omri','ben','omrik@gmail.com','203c4cef45a745eef55aa2757325b2cd3af218f847f12a47bc5e91b715f78051938e3c898d2425ab7672d4c855050058c9809758ab2ab5ad54495f5559bf2c1c',0),('bf7a03c4-3c85-4239-bea9-0ae57646eeff','omri','ben','omri@gmail.com','203c4cef45a745eef55aa2757325b2cd3af218f847f12a47bc5e91b715f78051938e3c898d2425ab7672d4c855050058c9809758ab2ab5ad54495f5559bf2c1c',0);
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

-- Dump completed on 2022-05-09 20:49:29
