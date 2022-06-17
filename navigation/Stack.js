import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";
import { YELLOW_COLOR } from "../colors";

const ScreenOne = ({ navigation: { navigate } }) => (
  // <NativeStack.Screen name="Two" component={ScreenTwo} />의 "Two" = navigate("Two")}
  // screen name을 파라미터로 보냄
  <TouchableOpacity onPress={() => navigate("Two")}>
    <View>
      <Text>go to two</Text>
    </View>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <View>
      <Text>go to three</Text>
    </View>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { setOptions } }) => (
  <TouchableOpacity onPress={() => setOptions({ title: "Hello" })}>
    <View>
      <Text>Change title</Text>
    </View>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      animation:"flip",
      headerTintColor: YELLOW_COLOR,
      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} options={{ presentation:"modal"}}/>
  </NativeStack.Navigator>
);

export default Stack;
