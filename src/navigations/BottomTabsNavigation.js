import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import FavoritesScreen from "../screens/Favorite/FavoriteScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2e7d32",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: { backgroundColor: "#fff", height: 64, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          const map = {
            Inicio: "home",
            Buscador: "search",
            Favoritos: "heart",
          };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Buscador" component={SearchScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
