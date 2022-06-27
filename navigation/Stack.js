import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../screens/Detail";
import { useColorScheme } from "react-native";
import {CHARCOAL_COLOR, IVORY_COLOR, YELLOW_COLOR } from '../colors'

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: isDark ? CHARCOAL_COLOR : IVORY_COLOR },
        headerTitleStyle: { color : isDark ? YELLOW_COLOR : CHARCOAL_COLOR },
      }}
    >
      <NativeStack.Screen
        name="Detail"
        component={Detail}
        options={{ presentation: "modal" }}
      />
    </NativeStack.Navigator>
  );
};

export default Stack;
