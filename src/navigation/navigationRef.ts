import {createNavigationContainerRef} from '@react-navigation/native';
import type {RootStackParamList} from './StackNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
