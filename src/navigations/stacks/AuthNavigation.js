import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStartScreen } from "../../screens/Auth/AuthStartScreen";
import { LoginScreen } from "../../screens/Auth/LoginScreen";
import { RegisterScreen } from "../../screens/Auth/RegisterScreen";

const Stack = createNativeStackNavigator();

export function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthStartScreen" component={AuthStartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
