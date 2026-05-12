package com.formation.produitsservice.controller;

import com.formation.produitsservice.entity.Produit;
import com.formation.produitsservice.service.ProduitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
public class ProduitController {

    private final ProduitService produitService;

    @GetMapping
    public List<Produit> getProduits(@RequestParam(required = false) Long categorieId) {
        return produitService.findAll(categorieId);
    }

    @GetMapping("/{id}")
    public Produit getProduit(@PathVariable Long id) {
        return produitService.findById(id);
    }

    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.save(produit);
    }
}