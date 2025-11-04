import React, { useEffect, useState, useCallback } from "react";
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet,
  RefreshControl, Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { fetchRecipes } from "../../api/api";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const FAVS_KEY = "@favorites_recetario";

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const loadFavorites = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(FAVS_KEY);
      setFavorites(raw ? JSON.parse(raw) : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  const loadRecipes = useCallback(async () => {
    const data = await fetchRecipes();
    setRecipes(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    loadRecipes();
    loadFavorites();
  }, [isFocused, loadRecipes, loadFavorites]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecipes();
    await loadFavorites();
    setRefreshing(false);
  };

  const isFav = (id) => favorites?.some((r) => r._id === id);

  const toggleFavorite = async (recipe) => {
    try {
      let next = [];
      if (isFav(recipe._id)) next = favorites.filter((r) => r._id !== recipe._id);
      else next = [recipe, ...favorites];
      setFavorites(next);
      await AsyncStorage.setItem(FAVS_KEY, JSON.stringify(next));
      Alert.alert("Favoritos", isFav(recipe._id) ? "Eliminado de favoritos" : "Agregado a favoritos");
    } catch {
      Alert.alert("Error", "No se pudo actualizar favoritos");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textRow}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
          {!!item.category && <Text style={styles.category}>#{item.category}</Text>}
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Ionicons name={isFav(item._id) ? "heart" : "heart-outline"} size={24} color="#e53935" />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={2} style={styles.desc}>
        {item.ingredients?.replace(/\n/g, " ") || "Sin descripción"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header con botón Regresar a Bienvenida */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.header}>Recetas de cocina</Text>
        <View style={{ width: 24 }} />{/* balancea el espacio del back */}
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay recetas. Verifica tu API o tu conexión.</Text>
        }
      />
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
  header: { fontSize: 22, fontWeight: "bold", color: "#2E7D32", textAlign: "center" },
  card: { backgroundColor: "#fff", marginHorizontal: 12, marginBottom: 12, borderRadius: 12, overflow: "hidden", elevation: 2 },
  image: { width: "100%", height: 170 },
  textRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingTop: 10 },
  title: { fontWeight: "bold", fontSize: 16, color: "#1B5E20" },
  category: { color: "#4CAF50", fontSize: 12, marginTop: 2 },
  desc: { color: "#555", paddingHorizontal: 12, paddingTop: 6, paddingBottom: 12 },
  empty: { textAlign: "center", color: "#666", marginTop: 24 },
});
