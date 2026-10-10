import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootContainer from '@/navigation/RootContainer';
import {store} from '@/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootContainer />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
