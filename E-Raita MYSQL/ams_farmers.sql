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
-- Table structure for table `farmers`
--

DROP TABLE IF EXISTS `farmers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farmers` (
  `farmer_id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(100) DEFAULT NULL,
  `f_contact` varchar(20) DEFAULT NULL,
  `f_address` varchar(200) DEFAULT NULL,
  `f_pass` varchar(10) NOT NULL,
  `f_email` varchar(250) NOT NULL,
  PRIMARY KEY (`farmer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmers`
--

LOCK TABLES `farmers` WRITE;
/*!40000 ALTER TABLE `farmers` DISABLE KEYS */;
INSERT INTO `farmers` VALUES (104,'sanjay','808882730','hnr','sss','sanjaygouda136@gmail.com'),(118,'Rajesh Kumar','9876543210','123 Main Street, Delhi, Delhi','Rajesh','rajesh@example.com'),(119,'Sarika Gupta','8765432109','456 Elm Street, Mumbai, Maharashtra','Sarika','sarika@example.com'),(120,'Amit Sharma','7654321098','789 Oak Street, Bangalore, Karnataka','Amit','amit@example.com'),(121,'Priya Singh','6543210987','101 Pine Street, Kolkata, West Bengal','Priya','priya@example.com'),(122,'Rahul Verma','5432109876','202 Cedar Street, Chennai, Tamil Nadu','Rahul','rahul@example.com'),(123,'Neha Patel','4321098765','303 Maple Street, Hyderabad, Telangana','Neha','neha@example.com'),(124,'Anil Yadav','3210987654','404 Birch Street, Pune, Maharashtra','Anil','anil@example.com'),(125,'Pooja Das','2109876543','505 Redwood Street, Jaipur, Rajasthan','Pooja','pooja@example.com'),(126,'Vijay Sharma','1098765432','606 Willow Street, Lucknow, Uttar Pradesh','Vijay','vijay@example.com'),(129,'Meera Patel','7654321091','909 Pine Street, Bhopal, Madhya Pradesh','Meera','meera@example.com'),(130,'Ravi Kumar','6543210981','1010 Cedar Street, Patna, Bihar','Ravi','ravi@example.com'),(131,'Suman Gupta','5432109871','1111 Maple Street, Dehradun, Uttarakhand','Suman','suman@example.com'),(132,'Vishal Sharma','4321098761','1212 Birch Street, Guwahati, Assam','Vishal','vishal@example.com'),(133,'Anjali Yadav','3210987651','1313 Redwood Street, Raipur, Chhattisgarh','Anjali','anjali@example.com'),(134,'Neeraj Das','2109876541','1414 Willow Street, Ranchi, Jharkhand','Neeraj','neeraj@example.com'),(135,'Rita Sharma','1098765431','1515 Oak Street, Srinagar, Jammu and Kashmir','Rita','rita@example.com'),(136,'Alok Verma','9876543222','1616 Elm Street, Jaipur, Rajasthan','Alok','alok@example.com'),(137,'Seema Patel','8765432112','1717 Pine Street, Ahmedabad, Gujarat','Seema','seema@example.com'),(138,'Kunal Singh','7654321102','1818 Cedar Street, Lucknow, Uttar Pradesh','Kunal','kunal@example.com'),(139,'Preeti Gupta','6543210992','1919 Maple Street, Bhopal, Madhya Pradesh','Preeti','preeti@example.com'),(140,'Rahul Yadav','5432109882','2020 Birch Street, Patna, Bihar','Rahul','rahuly@example.com'),(141,'Sheetal Das','4321098772','2121 Redwood Street, Dehradun, Uttarakhand','Sheetal','sheetal@example.com'),(142,'Sanjay Verma','3210987662','2222 Willow Street, Guwahati, Assam','Sanjay','sanjay@example.com'),(143,'Shikha Sharma','2109876552','2323 Oak Street, Raipur, Chhattisgarh','Shikha ','shikha@example.com'),(146,'Sanjay G Gouda','08088827300','At: kadagutta','sanjay','sanjaygouda136@gmail.com');
/*!40000 ALTER TABLE `farmers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-10  9:38:18
