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
import styled from "styled-components/native";
import HMedia from "../components/HMedia";
import Poster from "../components/Poster";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const API_KEY = "babd9d44a661b74fe4939712438ad188";

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
  const isDark = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setTrending(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
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
            {nowPlaying.map((movie) => (
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
            data={trending}
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
      data={upcoming}
      keyExtractor={movieKeyExtractor}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    ></FlatList>
  );
};

export default Movies;
