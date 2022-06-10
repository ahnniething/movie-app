import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';

/**
 *  이미지와 폰트가 불러와지지 않았다면 <AppLoading>을 리턴함
 */
export default function App() {
  const [assets] = useAssets([require("./cdd.png")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  if(!assets||!!loaded){
    return <AppLoading/>;
  }
  //앱이 실행될 준비가 완료되었을 때(=이미지와 폰트가 불러와졌을 때) 화면에 'we are done loading!'을 보여줌
  return <Text>we are done loading!</Text>;

}

