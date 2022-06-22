import React from "react";
import styled from "styled-components/native";

interface VotesProps {
  votes: number;
}

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 10px;
  margin-top: 7px;
`;

const Votes: React.FC<VotesProps> = ({ votes }) => (
  <Text>{votes > 0 ? `⭐️ ${votes}/10` : `Coming soon`}</Text>
);
export default Votes;
