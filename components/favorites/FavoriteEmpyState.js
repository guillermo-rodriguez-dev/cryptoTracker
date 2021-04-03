import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinDetailScreem from '../coinDetails/CoinDetailsScreen';
import colors from '../../res/colors';
import FavoriteScreen from './FavoritesScreeb';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';

const FavoriteEmpyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites Screen is empty</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FavoriteEmpyState;
