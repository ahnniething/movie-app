import React, { useState } from "react";
import {View, Text} from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi } from "../api";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
     background-color: white;
     padding: 10px 15px;
     border-radius: 15px;
     width: 90%;
     margin: 10px auto;
`;

const Search = () =>{
     const [query, setQuery] = useState("");
     const {isLoading, data} = useQuery(["searchMovies", query], moviesApi.search);
     const onChangeText = (text:string) => setQuery(text);
     const onSubmit = () => {
          if(query === ""){
               return;
          }
          alert("search");
     };
     console.log(data);
     return(
          <Container>
          <SearchBar
          placeholder="Search for Movie or TV show"
          placeholderTextColor={"grey"}
          returnKeyType="search"
          autoFocus
          autoCorrect
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}></SearchBar>
         </Container>

     )
}

export default Search;