import React from 'react';
import CoinsScreen from './CoinsScreem';
import {createStackNavigator} from '@react-navigation/stack';
import CoinDetailScreem from '../coinDetails/CoinDetailsScreen';
import colors from '../../res/colors';
const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinsDetails" component={CoinDetailScreem} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
