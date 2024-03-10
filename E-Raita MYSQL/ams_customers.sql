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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `cust_id` int NOT NULL AUTO_INCREMENT,
  `c_name` varchar(100) DEFAULT NULL,
  `c_contact` varchar(20) DEFAULT NULL,
  `c_address` varchar(200) DEFAULT NULL,
  `c_pass` varchar(10) DEFAULT NULL,
  `c_email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (203,'Sanjay G Gouda','08088827300','Nagineni Mansion No 19 13th Main Road 1st Stage Mathikere','123','sanjaygouda136@gmail.com'),(208,'Amita Gupta','9876543210','123 Main Street, Delhi, Delhi','Amita','amita@example.com'),(209,'Sanjay Verma','87','456 Elm Street, Mumbai, Maharashtra','Sanjay','sanjay@example.com'),(210,'Neha Sharma','7654321098','789 Oak Street, Bangalore, Karnataka','Neha','neha@example.com'),(211,'Rahul Singh','6543210987','101 Pine Street, Kolkata, West Bengal','Rahul','rahul@example.com'),(212,'Preeti Yadav','5432109876','202 Cedar Street, Chennai, Tamil Nadu','Preeti','preeti@example.com'),(213,'Ankur Patel','4321098765','303 Maple Street, Hyderabad, Telangana','Ankur','ankur@example.com'),(214,'Kavita Das','3210987654','404 Birch Street, Pune, Maharashtra','Kavita','kavita@example.com'),(215,'Rajiv Sharma','2109876543','505 Redwood Street, Jaipur, Rajasthan','Rajiv','rajiv@example.com'),(216,'Shilpa Verma','1098765432','606 Willow Street, Lucknow, Uttar Pradesh','Shilpa','shilpa@example.com'),(217,'Alok Kumar','9876543211','707 Oak Street, Ahmedabad, Gujarat','Alok','alok@example.com'),(218,'Manisha Gupta','8765432101','808 Elm Street, Chandigarh, Punjab','Manisha','manisha@example.com'),(219,'Rakesh Patel','7654321091','909 Pine Street, Bhopal, Madhya Pradesh','Rakesh','rakesh@example.com'),(220,'Sneha Verma','6543210981','1010 Cedar Street, Patna, Bihar','Sneha','sneha@example.com'),(221,'Amar Singh','5432109871','1111 Maple Street, Dehradun, Uttarakhand','Amar','amar@example.com'),(222,'Varun Sharma','4321098761','1212 Birch Street, Guwahati, Assam','Varun','varun@example.com'),(223,'Pooja Yadav','3210987651','1313 Redwood Street, Raipur, Chhattisgarh','Pooja','poojay@example.com'),(224,'Rajendra Das','2109876541','1414 Willow Street, Ranchi, Jharkhand','Rajendra','rajendra@example.com'),(225,'Meenakshi Sharma','1098765431','1515 Oak Street, Srinagar, Jammu and Kashmir','Meenakshi','meenakshi@example.com'),(226,'Vikram Verma','9876543222','1616 Elm Street, Jaipur, Rajasthan','Vikram','vikram@example.com'),(227,'Suman Patel','8765432112','1717 Pine Street, Ahmedabad, Gujarat','Suman','suman@example.com'),(228,'Shreya Singh','7654321102','1818 Cedar Street, Lucknow, Uttar Pradesh','Shreya','shreya@example.com'),(229,'Rajesh Gupta','6543210992','1919 Maple Street, Bhopal, Madhya Pradesh','Rajesh','rajesh@example.com'),(230,'Aarti Yadav','5432109882','2020 Birch Street, Patna, Bihar','Aarti','aarti@example.com'),(231,'Ajay Das','4321098772','2121 Redwood Street, Dehradun, Uttarakhand','Ajay','ajay@example.com'),(232,'Snehal Verma','3210987662','2222 Willow Street, Guwahati, Assam','Snehal','snehal@example.com'),(233,'Anita Sharma','2109876552','2323 Oak Street, Raipur, Chhattisgarh','Anita','anita@example.com'),(234,'Ramesh Singh','1098765442','2424 Elm Street, Ranchi, Jharkhand','Ramesh','ramesh@example.com'),(235,'Sanjay G Gouda','21','sad','ssss','sanjay@l.com'),(236,'Sanjay G Gouda','08088827300','Nagineni Mansion No 19 13th Main Road 1st Stage Mathikere','sanjay','sanjaygouda136@gmail.com');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
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
