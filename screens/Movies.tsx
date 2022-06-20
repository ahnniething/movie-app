import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation,
}) => (
  <Btn onPress={() => navigation.navigate("Sck", { screen: "Three" })}>
    <Title>go to Three in Stack Naigator</Title>
  </Btn>
);

export default Movies;
