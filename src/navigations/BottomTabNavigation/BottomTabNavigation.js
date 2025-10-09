import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeScreen } from "../../screens/Home/HomeScreen";
import { FavoriteScreen } from "../../screens/Favorites/FavoriteScreen";
import { SettingsScreen } from "../../screens/Settings/SettingsScreen";

const Tab = createBottomTabNavigator();

export function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f0f0f",
          borderTopColor: "#222",
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#00b300",
        tabBarInactiveTintColor: "#aaa",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "silverware-fork-knife";
          else if (route.name === "Favorites") iconName = "heart-outline";
          else if (route.name === "Settings") iconName = "cog-outline";

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Recetario" }} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} options={{ title: "Favoritos" }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Configuración" }} />
    </Tab.Navigator>
  );
}
