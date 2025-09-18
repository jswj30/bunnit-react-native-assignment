import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import LibraryScreen from "../screens/library/LibraryScreen";
import MyPageScreen from "../screens/myPage/MyPageScreen";

export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Library: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
