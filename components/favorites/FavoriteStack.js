import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinDetailScreem from '../coinDetails/CoinDetailsScreen';
import colors from '../../res/colors';
import FavoriteScreen from './FavoritesScreeb';
const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
