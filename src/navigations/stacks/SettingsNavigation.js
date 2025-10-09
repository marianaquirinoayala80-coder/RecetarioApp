import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "../../screens/Settings";
import { screens } from "../../utils";

const Stack = createNativeStackNavigator();

export function SettingsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.tab.settings.settingsScreen}
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
