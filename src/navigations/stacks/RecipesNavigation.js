import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../../screens/Home";
import { FavoritesScreen } from "../../screens/Favorites";
import { screens } from "../../utils";

const Stack = createNativeStackNavigator();

export function RecipesNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.tab.recipes.homeScreen}
        component={HomeScreen}
        options={{ title: "Recetas" }}
      />
      <Stack.Screen
        name={screens.tab.recipes.favoritesScreen}
        component={FavoritesScreen}
        options={{ title: "Favoritos" }}
      />
    </Stack.Navigator>
  );
}
