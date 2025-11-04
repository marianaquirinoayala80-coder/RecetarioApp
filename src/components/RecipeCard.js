import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";

export default function RecipeCard({ recipe, onPress, onToggleFav, isFav }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}
    >
      {!!recipe.image && (
        <Image source={{ uri: recipe.image }} style={{ width: "100%", height: 200 }} />
      )}
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#1B5E20" }}>
          {recipe.title}
        </Text>
        {!!recipe.category && (
          <Text style={{ marginTop: 4, color: "#666" }}>{recipe.category}</Text>
        )}
      </View>
      {onToggleFav && (
        <View style={{ position: "absolute", right: 14, bottom: 14 }}>
          <Text style={{ fontSize: 22 }}>{isFav ? "❤️" : "🤍"}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
