import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  useColorScheme,
  FlatList,
  View,
  Text,
} from "react-native";
// import Swiper from "react-native-web-swiper";
import Swiper from "react-native-swiper";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Poster from "../components/Poster";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const Container = styled.ScrollView``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.titleColor};
  font-size: 18px;
  font-weight: 600;
  margin: 30px 20px;
`;

const TrendingScroll = styled.FlatList``;
const UpcomingScroll = styled.FlatList``;
const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingisLoading, data: nowPlayingData } = useQuery(
    "nowPlaying",
    moviesApi.nowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    "upcoming",
    moviesApi.upcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    "trending",
    moviesApi.trending
  );

  const loading = nowPlayingisLoading || upcomingLoading || trendingLoading;

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    ></VMedia>
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
      voteAverage={item.vote_average}
    ></HMedia>
  );

  const movieKeyExtractor = (item) => item.id + "";

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay={true}
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              ></Slide>
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          <TrendingScroll
            data={trendingData.results}
            horizontal
            keyExtractor={movieKeyExtractor}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={VSeparator}
            renderItem={renderVMedia}
          ></TrendingScroll>

          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    ></FlatList>
  );
};

export default Movies;
