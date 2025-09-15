import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigations/RootNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <RootNavigation />
    </NavigationContainer>
  );
}
