-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bons_plans
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `annonce`
--

DROP TABLE IF EXISTS `annonce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annonce` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateExpiration` date NOT NULL,
  `sousCategorie` varchar(45) NOT NULL,
  `nomMagasin` varchar(255) NOT NULL,
  `adresseMagasin` longtext NOT NULL,
  `utilisateur` int NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  `categorie` int NOT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur_idx` (`utilisateur`),
  KEY `categorie_idx` (`categorie`),
  CONSTRAINT `categorie` FOREIGN KEY (`categorie`) REFERENCES `categorie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `utilisateur` FOREIGN KEY (`utilisateur`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annonce`
--

LOCK TABLES `annonce` WRITE;
/*!40000 ALTER TABLE `annonce` DISABLE KEYS */;
INSERT INTO `annonce` VALUES (76,'Ordinateur portable HP','2022-03-21 21:48:25','2022-04-03','1','ELeclerc','https://www.e.leclerc/fp/pc-portable-hp-15s-eq2021nf-8-go-ram-512-go-ssd-0196068239282?cref=om_aff_awin_Ban_8463_2020-12-08-op-remise-30-awin_169249_128321%7C372423&awc=15135_1647893052_f11b0495d876412e54b7faf5fb62548f&utm_source=Affiliation_Awin_169249&utm_medium=leclerc&utm_campaign=Discount%20Code&utm_content=169249',35,'6238e4991410d0196068239282_1.png',3,'PC Portable HP 15s-eq2021nf - 8 Go RAM - 512 Go SSD ordinateur à -50€ et livraison gratuite!!');
/*!40000 ALTER TABLE `annonce` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-21 22:00:24
