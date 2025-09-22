import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomStatusBar from "./components/CustomStatusBar";
import RootNavigation from "./navigations/RootNavigation";

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaProvider>
          <CustomStatusBar />
          <RootNavigation />
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
