import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { View, Text } from "react-native";
import { useColorScheme } from "react-native";
import { YELLOW_COLOR, IVORY_COLOR, CHARCOAL_COLOR, GRAY_COLOR, DEEP_YELLOW_COLOR } from '../colors'

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      initialRouteName="Tv"
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? CHARCOAL_COLOR : IVORY_COLOR },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : CHARCOAL_COLOR ,
        tabBarInactiveTintColor: isDark ? DEEP_YELLOW_COLOR : GRAY_COLOR,
        headerStyle: { backgroundColor: isDark ? CHARCOAL_COLOR : IVORY_COLOR },
        headerTitleStyle: { color : isDark ? YELLOW_COLOR : CHARCOAL_COLOR },

      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarStyle: { backgroundColor: "lavender" },
          headerStyle: { backgroundColor: "lavender" },
          headerTitleStyle: { color: "tomato" },
          headerRight: () => (
            <View>
              <Text>more</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
