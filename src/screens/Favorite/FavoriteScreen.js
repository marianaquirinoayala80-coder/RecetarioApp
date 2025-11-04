import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const FAVS_KEY = "@favorites_recetario";

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const load = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(FAVS_KEY);
      setFavorites(raw ? JSON.parse(raw) : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [isFocused, load]);

  const removeFav = async (id) => {
    const next = favorites.filter((r) => r._id !== id);
    setFavorites(next);
    await AsyncStorage.setItem(FAVS_KEY, JSON.stringify(next));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.row}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <TouchableOpacity onPress={() => removeFav(item._id)}>
          <Ionicons name="trash" size={22} color="#e53935" />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={2} style={styles.desc}>
        {item.ingredients?.replace(/\n/g, " ")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>Favoritos</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(it) => it._id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Aún no tienes favoritos.</Text>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E8F5E9" },
  headerBox: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  image: { width: "100%", height: 160 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1B5E20",
    flex: 1,
    paddingRight: 8,
  },
  desc: { color: "#555", paddingHorizontal: 12, paddingTop: 6, paddingBottom: 12 },
  empty: { textAlign: "center", color: "#666", marginTop: 24 },
});
