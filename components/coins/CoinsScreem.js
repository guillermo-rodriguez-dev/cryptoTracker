import React, {Component} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Http from '../../lib/http';
import CoinItem from './CoinItem';
import colors from '../../res/colors';
import CoinSearch from './CoinsSearch';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };

  getCoins = async () => {
    this.setState({loading: true});
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    console.log('coins', res.data);

    this.setState({coins: res.data, loading: false, allCoins: res.data});
  };
  componentDidMount = async () => {
    this.getCoins();
  };

  handlePress = coin => {
    console.log('go to details', this.props);
    this.props.navigation.navigate('CoinsDetails', {coin});
  };
  handleSearch = query => {
    const {allCoins} = this.state;
    const coinsFiltered = allCoins.filter(
      coin =>
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase()),
    );
    this.setState({coins: coinsFiltered});
  };
  render() {
    const {coins, loading} = this.state;
    return (
      <View style={styles.container}>
        <CoinSearch onChange={this.handleSearch} />

        {loading ? (
          <ActivityIndicator color="#fff" size="large" style={styles.loading} />
        ) : null}

        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loading: {
    marginTop: 60,
  },
});
export default CoinsScreen;
