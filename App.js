import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HandlerNavigation from "./src/navigations/HandlerNavigation";

export default function App() {
  console.log("✅ App cargando NavigationContainer...");
  return (
    <NavigationContainer>
      <HandlerNavigation />
    </NavigationContainer>
  );
}
