-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ams
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_amount` int DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `purchase_id` (`purchase_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`purchase_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,NULL,NULL,'2023-09-12',200,'Credit Card'),(2,NULL,NULL,'2023-09-12',2000,'PayPal'),(3,NULL,2001,'2023-09-12',2789,'PayPal'),(4,8,2001,'2023-09-12',2001,'Bank Transfer'),(5,10,2001,'2023-09-12',3000,'Credit Card'),(6,11,11,'2023-09-12',200,'Debit Card'),(7,15,2001,'2023-09-12',200,'Debit Card'),(8,16,2001,'2023-09-12',200,'Debit Card'),(9,40,2001,'2023-09-13',600,'Debit Card'),(10,42,2003,'2023-09-13',268,'Debit Card'),(11,43,2003,'2023-09-13',335,'Debit Card'),(12,43,2003,'2023-09-13',335,'Debit Card'),(13,43,2003,'2023-09-13',335,'Debit Card'),(14,44,2003,'2023-09-13',1139,'Debit Card'),(15,44,2003,'2023-09-13',1139,'Debit Card'),(16,44,2003,'2023-09-13',1139,'Debit Card'),(17,44,2003,'2023-09-13',1139,'Debit Card'),(18,44,2003,'2023-09-13',1139,'Debit Card'),(19,44,2003,'2023-09-13',1139,''),(20,44,2003,'2023-09-13',1139,'Cash'),(21,44,2003,'2023-09-13',1139,'Bank Transfer'),(22,45,2003,'2023-09-13',670,'Credit Card'),(23,46,2001,'2023-09-13',1200,'Debit Card'),(24,47,2001,'2023-09-13',600,'Debit Card'),(25,47,2001,'2023-09-13',600,'Debit Card'),(26,48,2003,'2023-09-13',268,'PayPal'),(27,49,2013,'2023-09-13',300,'Credit Card'),(28,50,2018,'2023-09-13',4500,'Cash'),(29,51,2018,'2023-09-13',180,'Cash'),(30,52,2001,'2023-09-13',1400,'Bank Transfer'),(31,53,2001,'2023-09-13',2000,'PayPal'),(32,54,2029,'2023-09-15',260,'Debit Card'),(33,55,2030,'2023-09-15',1530,'Debit Card'),(34,56,2025,'2023-09-15',3400,'Debit Card'),(35,57,2025,'2023-09-15',17600,'Debit Card'),(36,58,2025,'2023-09-15',15400,'PayPal'),(37,59,2018,'2023-09-15',7920,'Cash'),(38,60,2018,'2023-09-15',6930,'Cash'),(39,61,2010,'2023-10-13',300,'Debit Card'),(40,63,2003,'2023-10-13',670,'Debit Card'),(41,63,2003,'2023-10-13',670,'Debit Card'),(42,64,2010,'2023-10-15',300,'Debit Card'),(43,65,2010,'2023-10-15',300,'Debit Card'),(44,66,2010,'2023-10-15',30,'Credit Card'),(45,74,2003,'2023-10-18',134,'Cash');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-10  9:38:16
