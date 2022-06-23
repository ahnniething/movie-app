import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { MovieResponse, moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

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
            <FlatList
              data={trendingData.results}
              horizontal
              keyExtractor={(item) => item.id + ""}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={VSeparator}
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path || ""}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                ></VMedia>
              )}
            ></FlatList>
          ) : null}

          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        ></HMedia>
      )}
    ></FlatList>
  ) : null;
};

export default Movies;
