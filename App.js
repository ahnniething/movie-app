import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { Asset, useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import { useColorScheme } from "react-native";
import Stack from './navigation/Stack';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './styled';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((images) =>
    typeof image === 'string' ? Image.prefetch(image) : Asset.loadAsync(image)
  );

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require('./cdd.png'),
      'https://d33wubrfki0l68.cloudfront.net/b152eb4214943f96e83c4babde026b12221e68f1/a20c2/img/oss_logo.png',
    ]);
    await Promise.all([...fonts, ...images]);
  };

  const isDark = useColorScheme() === "dark";

  return ready ? (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <NavigationContainer>
    <Root/>
  </NavigationContainer>
  </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={startLoading}
      onFinish={onFinish}
      onError={console.error}
    />
  );
}

