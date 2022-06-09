import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import { Text, Image } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';

/**
 * 함수
 *
 */
const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));
const loadImages = (images) => images.map(image => typeof image === "string" ? Image.prefetch(image) : Asset.loadAsync(image));

/**
 *  1. 만약 앱이 실행될 준비가 되어있지 않으면 AppLoading을 보여줌
 *  2. AppLoading은 splash screen을 띄우고 startAsync 함수를 호출함
 *  3. startAsync 가 완료되면 onFinish 함수를 호출하여 state를 변경함
 *  4. state가 변경되면 'we are done loading!'을 화면에 보여줌
 */
export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    //10초 뒤에 앱 실행
    // await new Promise(resolve => setTimeout(resolve, 10000));

    //preload font
    const fonts = loadFonts([Ionicons.font]);

    //preload image
    const images = loadImages([require('./cdd.png'), 'https://d33wubrfki0l68.cloudfront.net/b152eb4214943f96e83c4babde026b12221e68f1/a20c2/img/oss_logo.png']);
    await Promise.all([...fonts, ...images]);
  };

  if(!ready){
    return <AppLoading
    startAsync={startLoading}
    onFinish={onFinish} onError={console.error}/>;
  }
  //앱이 실행될 준비가 완료되었을 때 호출
  return <Text>we are done loading!</Text>;

}

