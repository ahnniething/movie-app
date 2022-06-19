import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate("Stack", { screen: "Three" })}
    style={styles.btn}
  >
    <Text style={styles.text}>go to Three in Stack Naigator</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
     btn : {
          flex: 1, 
          justifyContent: "center", 
          alignItems: "center" 
     },
     text: {  
          color:"blue"
     }
})
export default Movies;


