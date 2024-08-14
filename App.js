/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PopularMovieList from './src/screen/popularMovieList';
import Checkout from './src/checkout';
import PopularMovieDetail from './src/screen/popularMovieDetails';
const App = () => {
  // Variable which is used to store stack navigator
  const RootStack = createStackNavigator();
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="popularMovieList" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="popularMovieList" component={PopularMovieList} options={{ unmountOnBlur: true }} />
        <RootStack.Screen name="movieDetail" component={PopularMovieDetail} options={{ unmountOnBlur: true }} />
      </RootStack.Navigator>
    </NavigationContainer >
  );
};

export default App;
