import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigation } from './stacks/AuthNavigation';
import { BottomTabNavigation } from './BottomTabNavigation/BottomTabNavigation';

const Stack = createNativeStackNavigator();

export function HandlerNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigation} />
      <Stack.Screen name="App" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
}
