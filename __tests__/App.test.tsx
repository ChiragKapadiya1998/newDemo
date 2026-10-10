/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import HomeScreen from '../src/screens/Home/HomeScreen';

test('renders home screen', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<HomeScreen />);
  });
});
