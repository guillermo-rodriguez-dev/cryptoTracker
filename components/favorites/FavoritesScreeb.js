import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../../res/colors';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';
import FavoriteEmpyState from './FavoriteEmpyState';
import Storage from '../../lib/storage';
import CoinsItem from '../coins/CoinItem';
const Stack = createStackNavigator();

class FavoriteScreen extends Component {
  state = {
    favorites: [],
  };
  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter(key => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map(fav => JSON.parse(fav[1]));
      this.setState({
        favorites: favorites,
      });
      console.log(favs);
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getFavorites();
    this.props.navigation.addListener('focus', this.getFavorites);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  handlePress = coin => {
    this.props.navigation.navigate('CoinsDetails', {coin});
  };

  render() {
    const {favorites} = this.state;
    return (
      <View style={styles.container}>
        {favorites.length == 0 ? <FavoriteEmpyState /> : null}

        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={({item}) => (
              <CoinsItem item={item} onPress={() => this.handlePress(item)} />
            )}
          />
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});
export default FavoriteScreen;
