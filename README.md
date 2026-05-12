# Projet Boutique - Architecture Microservices

Ce projet est une application de boutique basée sur une architecture microservices utilisant Spring Boot et Spring Cloud.

## Structure du Projet

- `eureka-server/` : Serveur de découverte (Service Discovery).
- `api-gateway/` : Passerelle API (API Gateway).
- `produits-service/` : Microservice de gestion des produits.
- `avis-service/` : Microservice de gestion des avis clients.
- `mobile-app/` : Application mobile (Frontend).

## Technologies Utilisées

- **Backend** : Java 25, Spring Boot 4.0.6, Spring Cloud 2025.1.1.
- **Base de données** : PostgreSQL.
- **Conteneurisation** : Docker, Docker Compose.
- **Découverte de services** : Netflix Eureka.
- **Passerelle** : Spring Cloud Gateway.

## Comment lancer le projet

1. Assurez-vous d'avoir Docker et Java 25 installés.
2. Compilez les projets avec Maven : `mvn clean install`.
3. Lancez l'infrastructure avec Docker Compose : `docker-compose up --build`.

## Auteurs
- Maram Miadi
