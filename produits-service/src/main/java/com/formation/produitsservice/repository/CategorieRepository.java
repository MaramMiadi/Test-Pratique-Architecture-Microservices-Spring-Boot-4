package com.formation.produitsservice.repository;

import com.formation.produitsservice.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}