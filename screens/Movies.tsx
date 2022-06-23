import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
// import Swiper from "react-native-web-swiper";
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { MovieResponse, moviesApi } from "../api";
import HMedia from "../components/HMedia";
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
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingisLoading,
    data: nowPlayingData,
    isRefetching: isRefetchinghNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const loading = nowPlayingisLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchinghNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  const onRefresh = async () => {
    queryClient.refetchQueries([]);
  };

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
  console.log(refreshing);
  //get key and types of data to create interface Movie in api.ts
  console.log(Object.keys(nowPlayingData?.results[0]));
  console.log(
    Object.values(nowPlayingData?.results[0]).map((values) => typeof values)
  );
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              ></Slide>
            ))}
          </Swiper>
          <ListTitle>Trending Movies</ListTitle>
          {trendingData ? (
            <TrendingScroll
              data={trendingData?.results}
              horizontal
              keyExtractor={movieKeyExtractor}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            ></TrendingScroll>
          ) : null}

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
  ) : null;
};

export default Movies;
