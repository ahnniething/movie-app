import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  justify-content: center;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;

const OverView = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.9)"};
`;

const Votes = styled(OverView)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View>
      <BgImg
        source={{ uri: makeImgPath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster source={{ uri: makeImgPath(posterPath) }} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            {voteAverage > 0 && (
              <Votes isDark={isDark}>⭐️ {voteAverage}/10</Votes>
            )}
            <OverView isDark={isDark}>{overview.slice(0, 90)}...</OverView>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
