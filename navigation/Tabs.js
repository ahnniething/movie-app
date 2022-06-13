import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { View, Text } from "react-native";


const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Tv"
    screenOptions={{
      tabBarStyle: { backgroundColor: "lavender" },
      tabBarLabelStyle: {
        backgroundColor: "pink",
      },
      tabBarLabelPosition: "below-icon",
      tabBarActiveTintColor: "magenta",
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{
        tabBarLabelStyle: {
          backgroundColor: "yellow",
        },
      }}
    />
    <Tab.Screen name="Tv" component={Tv} options={{ tabBarBadge: 5, tabBarStyle:{backgroundColor:"cyan"}, headerStyle:{backgroundColor:"cyan"}, headerTitleStyle:{color:"tomato"}, headerRight: () => <View><Text>more</Text></View> }} />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{ tabBarBadge: "click!" }}
    />
  </Tab.Navigator>
);

export default Tabs;
