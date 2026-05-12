package com.formation.avisservice.service;

import com.formation.avisservice.Feignclient.ProduitClient;
import com.formation.avisservice.Repository.AvisRepository;
import com.formation.avisservice.entity.Avis;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AvisService {

    private final AvisRepository avisRepository;
    private final ProduitClient produitClient;

    public List<Avis> findByProduitId(Long produitId) {
        return avisRepository.findByProduitId(produitId);
    }

    public Avis save(Avis avis) {
        try {
            produitClient.getProduitById(avis.getProduitId());
        } catch (Exception e) {
            throw new RuntimeException("Produit introuvable");
        }

        return avisRepository.save(avis);
    }
}
