FROM maven:3-eclipse-temurin-25 AS build
WORKDIR /app
COPY . .
RUN mvn -pl produits-service -am clean package -DskipTests

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=build /app/produits-service/target/*.jar app.jar
EXPOSE 8091
ENTRYPOINT ["java", "-jar", "app.jar"]