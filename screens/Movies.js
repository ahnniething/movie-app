import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const Title = styled.Text`
  color: blue;
`;

const Header = styled.View``;

const Column = styled.View``;

const Footer = styled.View``;

const Movies = ({ navigation: { navigate } }) => (
  <Header>
    <Column>
      <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
        <Title>go to Three in Stack Naigator</Title>
      </Btn>
    </Column>
    <Footer></Footer>
  </Header>
);

export default Movies;
