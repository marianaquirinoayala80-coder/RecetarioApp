import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { HandlerNavigation } from "./src/navigations/HandlerNavigation";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <HandlerNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
