import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import { Text } from 'react-native'

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  //10초 후에 앱이 실행되도록 한다.
  const startLoading = async () => {
    await new Promise(resolve => setTimeout(resolve, 10000));
  };
  /*
    만약 앱이 실행될 준비가 되어있지 않으면 AppLoading을 보여줌
    AppLoading은 splash screen을 띄우고 startAsync 함수를 호출함
    startAsync 가 완료되면 onFinish 함수를 호출하여 state를 변경함
    state가 변경되면 'we are done loading!'을 화면에 보여줌
  */
  if(!ready){
    return <AppLoading
    startAsync={startLoading}
    onFinish={onFinish} onError={console.error}/>;
  }
  //앱이 실행될 준비가 완료되었을 때 호출
  return <Text>we are done loading!</Text>;

}

