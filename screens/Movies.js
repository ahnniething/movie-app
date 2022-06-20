import React from "react";

import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => (props.selected ? "blue" : "red")};
`;

const Movies = ({ navigation: { navigate } }) => (
      <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
        <Title selected={true} >go to Three in Stack Naigator</Title>
        <Title selected={false} >go to Three in Stack Naigator</Title>
      </Btn>
);

export default Movies;
