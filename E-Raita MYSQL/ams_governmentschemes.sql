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
-- Table structure for table `governmentschemes`
--

DROP TABLE IF EXISTS `governmentschemes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `governmentschemes` (
  `Scheme_id` int NOT NULL AUTO_INCREMENT,
  `Scheme_desc` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `Scheme_title` text,
  `image_url` text,
  `apply_link` text,
  PRIMARY KEY (`Scheme_id`)
) ENGINE=InnoDB AUTO_INCREMENT=523 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `governmentschemes`
--

LOCK TABLES `governmentschemes` WRITE;
/*!40000 ALTER TABLE `governmentschemes` DISABLE KEYS */;
INSERT INTO `governmentschemes` VALUES (510,'This scheme aims to upskill and reskill youth in different sectors. It was launched in 2015 and is ongoing.','2023-08-15','2023-11-11','Pradhan Mantri Kaushal Vikas Yojana (PMKVY)','https://www.pmkvyofficial.org/img/pmkvy-logo2.png','https://www.pmkvyofficial.org/'),(511,'This scheme provides financial assistance to start new businesses or expand existing ones. It was launched in 2016 and is ongoing.\n','2023-04-05','2024-02-24','Employment Generation Programme (EGP):','http://admin.risingkashmir.com/Source/News/f56aafee-030f-431c-a06f-a43b00cdb81a.jpeg','https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp'),(512,'hello','2023-10-07','2023-10-23','Pradhan Mantri Kaushal Vikas Yojana (PMKVY)','http://admin.risingkashmir.com/Source/News/f56aafee-030f-431c-a06f-a43b00cdb81a.jpeg','https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp'),(514,'Rural Employment Program','2023-02-01','2023-12-31','Employment Opportunities in Rural Areas','https://media.istockphoto.com/id/491267876/photo/cauliflower-plantation.jpg?s=612x612&w=0&k=20&c=yik3O4bFOUYvpgTw5BhpRsYPsC4KR0yXXMgRWg6Bqws=','https://rural.nic.in/en'),(515,'This scheme aims to provide financial inclusion to all Indian citizens. It covers all segments of the population, including women, senior citizens, and people with disabilities.','2023-09-29','2023-12-27','Pradhan Mantri Jan Dhan Yojana (PMJDY):','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfNj97-ed308Xb5LJiIsxhyxKdHScqpsxLnCs2qGIkxIQei0DzsaCXkqFJeG4e','https://www.pmjdy.gov.in/'),(517,'This scheme aims to provide affordable housing to all Indians. It covers both rural and urban areas. Apply link for Pradhan Mantri Awas Yojana (PMAY)','2023-08-27','2023-10-07','Pradhan Mantri Awas Yojana (PMAY):','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXK7RvVYVcjZrinTOIJh0fU1ly8bC4DRynHC-MqN4DqKIXKrvg2k-C4UnvLhW','scheme: https://pmaymis.gov.in/'),(518,'This scheme aims to provide loans to small businesses. It covers a wide range of businesses, including manufacturing, trading, and services. Apply link for Mudra Yojana scheme','2023-08-18','2023-10-07','Mudra Yojana:','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTX7FqRMqsP6Hg6TFVQL_Ruhvjo3YQJq1qogCHxi_s1TveZfiam_HCWRQnudHBx','https://www.mudra.org.in/'),(519,'This scheme aims to make India clean and hygienic. It covers all aspects of sanitation, including solid waste management, open defecation free (ODF) villages, and clean drinking water.','2023-07-12','2023-08-03','Swachh Bharat Abhiyan:','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTe7uxwLmlB5m0MHgiriZr5X52xo4cowVNz3TqDdJCHj_eXQ0rzjReQdXjEa9Rh','https://swachhbharat.mygov.in/'),(520,'This scheme aims to provide irrigation facilities to farmers. It covers all aspects of irrigation, including construction of new canals and reservoirs, renovation of old irrigation systems, and providing water management training to farmers.','2023-09-05','2023-10-19','Pradhan Mantri Krishi Sinchai Yojana (PMKSY):','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRScgpJNiLkuiao45-Fd97dbkLIboqx8p0cJ_YKW53LNigcT56RlFSs2kBxlmYH','agri.com'),(521,'This scheme is a crop insurance scheme that provides financial assistance to farmers in case of crop failure due to natural calamities.','2023-09-22','2024-02-23','Pradhan Mantri Fasal Bima Yojana (PMFBY): ','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSZShJfWpWm2__wWDOBmNdWgJ1kfT5w9asaxyxRUzCg1kaZnNPwc-97xKIDZQvu','agri.com'),(522,'This scheme aims to promote traditional farming practices. It covers a wide range of practices, including organic farming, bio-fertilizer production, and water conservation.','2023-08-29','2023-09-29','Paramparagat Krishi Vikas Yojana (PKVY): ','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRr7d3C_CezHy0R4vu16mA1ZCz5luqSkRx5BIKyobz6gKv9QSBQx-acPd3aJjIc','mkmy.com');
/*!40000 ALTER TABLE `governmentschemes` ENABLE KEYS */;
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
