import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Detail = ({ navigation, ...rest }) => {
  console.log(rest);
  return (
    <Container>
      <Text></Text>
    </Container>
  );
};
export default Detail;
