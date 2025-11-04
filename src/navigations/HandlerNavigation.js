import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import BottomTabsNavigation from "./BottomTabsNavigation";
import RecipeDetail from "../screens/Home/RecipeDetail";

const Stack = createNativeStackNavigator();

export default function HandlerNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Main" component={BottomTabsNavigation} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
}
