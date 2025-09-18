import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import HomeScreen from "../screens/home/HomeScreen";
import CalendarScreen from "../screens/calendar/CalendarScreen";
import LibraryScreen from "../screens/library/LibraryScreen";
import MyPageScreen from "../screens/myPage/MyPageScreen";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

export type BottomTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Library: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator();

const screenOptions = ({
  route,
}: {
  route: RouteProp<ParamListBase, string>;
}) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }: { color: string; size: number }) => {
    if (route.name === "Home")
      return <Entypo name="home" size={size} color={color} />;

    if (route.name === "Calendar")
      return <FontAwesome5 name="calendar-alt" size={size} color={color} />;

    if (route.name === "Library")
      return <Ionicons name="library" size={size} color={color} />;

    if (route.name === "MyPage")
      return <FontAwesome5 name="user-alt" size={size} color={color} />;

    // 아이콘 미출력 시 물음표 아이콘 출력
    return <FontAwesome5 name="question-circle" size={size} color={color} />;
  },
  tabBarActiveTintColor: "#313131",
  tabBarInactiveTintColor: "#e1e1e1",
});

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
