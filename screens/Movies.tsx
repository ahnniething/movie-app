import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { MovieResponse, moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

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
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingisLoading,
    data: nowPlayingData,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "upcoming"],
    moviesApi.upcoming, 
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  console.log("pages:", upcomingData?.pages.map(page=> page.page));
  const {
    isLoading: trendingLoading,
    data: trendingData,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries([]);
    setRefreshing(false);
  };

  const loading = nowPlayingisLoading || upcomingLoading || trendingLoading;
  const loadMore = () => {
    if(hasNextPage){
      fetchNextPage();
    } 
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
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
                fullData={movie}
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
                  fullData={item}
                ></VMedia>
              )}
            ></FlatList>
          ) : null}

          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
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
          fullData={item}
        ></HMedia>
      )}
    ></FlatList>
  ) : null;
};

export default Movies;


