import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
/**
 *  이미지와 폰트가 불러와지지 않았다면 <AppLoading>을 리턴함
 */
export default function App() {
  const [assets] = useAssets([require("./cdd.png")]);
  const [loaded] = Font.useFonts(Ionicons.font);

  if(!assets||!loaded){
    return <AppLoading/>;
  }
  return <NavigationContainer>
    <Tabs/>
  </NavigationContainer>
}

