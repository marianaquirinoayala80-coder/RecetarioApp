import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function RecipeDetail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const recipe = params?.recipe;

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#2E7D32" />
          </TouchableOpacity>
          <Text style={styles.header}>Detalle</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={{ textAlign: "center", marginTop: 24 }}>No se encontró la receta.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.header}>{recipe.title || "Detalle"}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {!!recipe.image && <Image source={{ uri: recipe.image }} style={styles.image} />}

        <View style={styles.box}>
          <Text style={styles.label}>Ingredientes</Text>
          <Text style={styles.text}>{recipe.ingredients || "—"}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Pasos</Text>
          <Text style={styles.text}>{recipe.steps || "—"}</Text>
        </View>

        <View style={styles.metaRow}>
          {!!recipe.category && <Text style={styles.meta}>#{recipe.category}</Text>}
          {!!recipe.country && <Text style={styles.meta}>· {recipe.country}</Text>}
          {Array.isArray(recipe.tags) && recipe.tags.length > 0 && (
            <Text style={styles.meta}> · {recipe.tags.join(", ")}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E8F5E9" },
  headerRow: {
    paddingHorizontal: 12, paddingTop: 4, paddingBottom: 8,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  backBtn: { padding: 6, borderRadius: 8 },
  header: { fontSize: 20, fontWeight: "bold", color: "#2E7D32", textAlign: "center", flex: 1, marginHorizontal: 6 },
  image: { width: "100%", height: 220, backgroundColor: "#ddd" },
  box: { backgroundColor: "#fff", margin: 12, padding: 12, borderRadius: 12, elevation: 1 },
  label: { fontWeight: "bold", color: "#1B5E20", marginBottom: 6 },
  text: { color: "#333", lineHeight: 20 },
  metaRow: { marginHorizontal: 12, marginTop: 4, color: "#4CAF50", flexDirection: "row", flexWrap: "wrap" },
  meta: { color: "#4CAF50" },
});
