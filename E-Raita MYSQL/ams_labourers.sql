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
-- Table structure for table `labourers`
--

DROP TABLE IF EXISTS `labourers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labourers` (
  `labour_id` int NOT NULL AUTO_INCREMENT,
  `l_name` varchar(100) DEFAULT NULL,
  `l_contact` varchar(20) DEFAULT NULL,
  `l_address` varchar(200) DEFAULT NULL,
  `l_wage` int DEFAULT NULL,
  `l_pass` varchar(20) DEFAULT NULL,
  `l_email` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`labour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labourers`
--

LOCK TABLES `labourers` WRITE;
/*!40000 ALTER TABLE `labourers` DISABLE KEYS */;
INSERT INTO `labourers` VALUES (7,'Rajendra Yadav','9876543201','123 Elm Street, Delhi, Delhi',500,'Rajendra','rajendra@example.com'),(8,'Suman Verma','8765432102','456 Oak Street, Mumbai, Maharashtra',450,'Suman','suman@example.com'),(9,'Amita Sharma','7654321093','789 Cedar Street, Bangalore, Karnataka',550,'Amita','amita@example.com'),(10,'Vishal Kumar','6543210984','101 Pine Street, Kolkata, West Bengal',480,'Vishal','vishal@example.com'),(12,'Deepak Gupta','4321098766','303 Birch Street, Hyderabad, Telangana',510,'Deepak','deepak@example.com'),(13,'Meera Singh','3210987657','404 Redwood Street, Pune, Maharashtra',490,'Meera','meera@example.com'),(14,'Alok Verma','2109876548','505 Willow Street, Jaipur, Rajasthan',530,'Alok','alok@example.com'),(15,'Shikha Sharma','1098765439','606 Elm Street, Lucknow, Uttar Pradesh',540,'Shikha','shikha@example.com'),(16,'Arun Das','9876543210','707 Oak Street, Ahmedabad, Gujarat',500,'Arun','arun@example.com'),(17,'Kavita Yadav','8765432101','808 Pine Street, Chandigarh, Punjab',450,'Kavita','kavita@example.com'),(18,'Rahul Kumar','7654321092','909 Cedar Street, Bhopal, Madhya Pradesh',550,'Rahul','rahul@example.com'),(19,'Anita Verma','6543210983','1010 Maple Street, Patna, Bihar',480,'Anita','anita@example.com'),(20,'Ajay Sharma','5432109874','1111 Birch Street, Dehradun, Uttarakhand',520,'Ajay','ajay@example.com'),(21,'Sarika Yadav','4321098765','1212 Redwood Street, Guwahati, Assam',510,'Sarika','sarika@example.com'),(22,'Amar Singh','3210987656','1313 Willow Street, Raipur, Chhattisgarh',490,'Amar','amar@example.com'),(23,'Varun Patel','2109876547','1414 Elm Street, Ranchi, Jharkhand',530,'Varun','varun@example.com'),(24,'Rita Sharma','1098765438','1515 Pine Street, Srinagar, Jammu and Kashmir',540,'Rita','rita@example.com'),(25,'Manoj Verma','9876543219','1616 Cedar Street, Jaipur, Rajasthan',500,'Manoj','manoj@example.com'),(26,'Neha Gupta','8765432100','1717 Maple Street, Ahmedabad, Gujarat',450,'Neha','neha@example.com'),(27,'Rajesh Patel','7654321091','1818 Birch Street, Lucknow, Uttar Pradesh',550,'Rajesh','rajesh@example.com'),(28,'Anjali Das','6543210982','1919 Redwood Street, Bhopal, Madhya Pradesh',480,'Anjali','anjali@example.com'),(29,'Vikram Verma','5432109873','2020 Willow Street, Patna, Bihar',520,'Vikram','vikram@example.com'),(30,'Preeti Yadav','4321098764','2121 Elm Street, Dehradun, Uttarakhand',510,'Preeti','preeti@example.com'),(31,'Sanjay Kumar','3210987655','2222 Pine Street, Guwahati, Assam',490,'Sanjay','sanjay@example.com'),(32,'Sarita Gupta','2109876546','2323 Cedar Street, Raipur, Chhattisgarh',530,'Sarita','sarita@example.com'),(33,'Rajendra Das','1098765437','2424 Maple Street, Ranchi, Jharkhand',540,'Rajendra','rajendra@example.com'),(34,'Sanjay G Gouda','08088827300','Nagineni Mansion No 19 13th Main Road 1st Stage Mathikere',1000,'12345','sanjaygouda136@gmail.com'),(35,'Sanjay G Gouda','08088827300','Nagineni Mansion No 19 13th Main Road 1st Stage Mathikere',444,'sanjay22','sanjaygouda136@gmail.com'),(36,'s','99','kkdsa',980,'ssss','s@gmail.com');
/*!40000 ALTER TABLE `labourers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-10  9:38:17
