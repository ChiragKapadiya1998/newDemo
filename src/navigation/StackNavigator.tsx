import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from './screenNames';
import HomeScreen from '@/screens/Home/HomeScreen';
import VideoScreen from '@/screens/Video/VideoScreen';

export type RootStackParamList = {
  Home: undefined;
  Video: { fileId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={SCREENS.Home}>
      <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
      <Stack.Screen name={SCREENS.Video} component={VideoScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
