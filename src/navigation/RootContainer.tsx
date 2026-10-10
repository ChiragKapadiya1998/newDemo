import React, {FC} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '@/constants/Colors';
import {GeneralStyle} from '@/constants/GeneralStyle';
import {navigationRef} from './navigationRef';
import StackNavigator from './StackNavigator';

const RootContainer: FC = () => {
  return (
    <SafeAreaView style={[GeneralStyle.flex, {backgroundColor: Colors.black}]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.black}
        translucent={false}
      />
      <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default RootContainer;
