FROM maven:3-eclipse-temurin-25 AS build
WORKDIR /app
COPY . .
RUN mvn -pl avis-service -am clean package -DskipTests

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=build /app/avis-service/target/*.jar app.jar
EXPOSE 8092
ENTRYPOINT ["java", "-jar", "app.jar"]