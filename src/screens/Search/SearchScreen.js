import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { searchRecipes } from "../../api/api";
import { useNavigation } from "@react-navigation/native";

const SUGGESTIONS = [
  "aguacate",
  "tostada",
  "pollo",
  "salsa",
  "ensalada",
  "mexicana",
  "pasta",
  "rápida",
  "desayuno",
  "cena",
];

export default function SearchScreen() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  async function doSearch(text) {
    try {
      setLoading(true);
      const data = await searchRecipes(text);
      setResults(Array.isArray(data) ? data : []);
    } catch (e) {
      Alert.alert("Error", "No se pudo buscar recetas");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit() {
    const term = q.trim();
    if (!term) return;
    doSearch(term);
  }

  function useSuggestion(term) {
    setQ(term);
    doSearch(term);
  }

  const renderResult = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={{ flex: 1, padding: 10 }}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        {!!item.category && <Text style={styles.category}>#{item.category}</Text>}
        <Text numberOfLines={2} style={styles.desc}>
          {item.ingredients?.replace(/\n/g, " ") || "—"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const SuggestionsRow = useMemo(
    () => (
      <View style={styles.suggestWrap}>
        <Text style={styles.suggestTitle}>Podría interesarte</Text>
        <View style={styles.tagsRow}>
          {SUGGESTIONS.map((t) => (
            <TouchableOpacity key={t} style={styles.tag} onPress={() => useSuggestion(t)}>
              <Text style={styles.tagText}>#{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header con botón Regresar a Bienvenida (misma altura que Home/Favorites) */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <Text style={styles.header}>Buscador</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          placeholder="Buscar por título, ingrediente, país, categoría..."
          value={q}
          onChangeText={setQ}
          onSubmitEditing={onSubmit}
          style={styles.input}
          returnKeyType="search"
        />
        {!!q && (
          <TouchableOpacity onPress={() => setQ("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {SuggestionsRow}

      <FlatList
        data={results}
        keyExtractor={(item) => item._id}
        renderItem={renderResult}
        ListEmptyComponent={
          !loading && <Text style={styles.empty}>Escribe algo arriba o toca una sugerencia.</Text>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E8F5E9" },

  // MISMAS MEDIDAS QUE HomeScreen (no toca barra de estado/cámara)
  headerRow: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: { padding: 6, borderRadius: 8 },
  header: { fontSize: 22, fontWeight: "bold", color: "#2E7D32", textAlign: "center" },

  searchRow: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  input: { flex: 1, marginHorizontal: 8 },

  // “Podría interesarte”
  suggestWrap: { marginTop: 12, paddingHorizontal: 12 },
  suggestTitle: { fontWeight: "bold", color: "#1B5E20", marginBottom: 6 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    backgroundColor: "#C8E6C9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { color: "#1B5E20", fontWeight: "600" },

  // Resultados
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    flexDirection: "row",
  },
  image: { width: 110, height: 110 },
  title: { fontWeight: "bold", fontSize: 16, color: "#1B5E20" },
  category: { color: "#4CAF50", fontSize: 12, marginTop: 2 },
  desc: { color: "#555", marginTop: 6 },

  empty: { textAlign: "center", color: "#666", marginTop: 24 },
});
