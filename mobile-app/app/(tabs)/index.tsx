import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";

const API_GATEWAY = "http://localhost:8090";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [avis, setAvis] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_GATEWAY}/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const loadProduits = (categorieId) => {
    setSelectedProduit(null);
    setAvis([]);

    axios
      .get(`${API_GATEWAY}/api/produits?categorieId=${categorieId}`)
      .then((res) => setProduits(res.data))
      .catch((err) => console.log(err));
  };

  const loadAvis = (produit) => {
    setSelectedProduit(produit);

    axios
      .get(`${API_GATEWAY}/api/avis/${produit.id}`)
      .then((res) => setAvis(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.logo}>🛍️</Text>

      <Text style={styles.title}>Mini Boutique</Text>

      <Text style={styles.subtitle}>Toutes les requêtes passent par API Gateway</Text>

      <Text style={styles.sectionTitle}>Catégories</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryButton}
            onPress={() => loadProduits(cat.id)}
          >
            <Text style={styles.categoryText}>{cat.nom}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Produits</Text>

      <FlatList
        scrollEnabled={false}
        data={produits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => loadAvis(item)}>
            <Text style={styles.productName}>{item.nom}</Text>

            <View style={styles.productInfo}>
              <Text style={styles.price}>{item.prix} DT</Text>
              <Text style={styles.stock}>Stock: {item.stock}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedProduit && (
        <>
          <Text style={styles.sectionTitle}>Avis sur {selectedProduit.nom}</Text>

          {avis.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Aucun avis disponible</Text>
            </View>
          ) : (
            avis.map((a) => (
              <View key={a.id} style={styles.reviewCard}>
                <View style={styles.reviewTop}>
                  <Text style={styles.author}>{a.auteur}</Text>
                  <Text style={styles.rating}>⭐ {a.note}/5</Text>
                </View>

                <Text style={styles.comment}>{a.commentaire}</Text>
              </View>
            ))
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    fontSize: 50,
    textAlign: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: 30,
    marginTop: 8,
    fontSize: 16,
  },
  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  categoryText: {
    color: "white",
    fontWeight: "bold",
  },
  productCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
  },
  productName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    color: "#22c55e",
    fontSize: 18,
    fontWeight: "bold",
  },
  stock: {
    color: "#cbd5e1",
    fontSize: 15,
  },
  reviewCard: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  reviewTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  author: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  rating: {
    color: "#facc15",
    fontWeight: "bold",
  },
  comment: {
    color: "#e2e8f0",
    lineHeight: 22,
  },
  emptyBox: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
  },
});