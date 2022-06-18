import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>go to Three in Stack Naigator</Text>
  </TouchableOpacity>
);
export default Movies;
