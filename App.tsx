import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigations/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
