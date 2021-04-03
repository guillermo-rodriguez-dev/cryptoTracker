import React, {Component} from 'react';
import CoinMarketItem from './CoinMarketItem';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import colors from '../../res/colors';
import Http from '../../lib/http';
import Storage from '../../lib/storage';

class CoinDetailsScreen extends Component {
  state = {
    coin: {},
    markets: {},
    isFavorite: false,
  };

  getMarkets = async coinId => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    this.setState({markets});
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    console.log('coin: ', coin);
    this.props.navigation.setOptions({title: coin.symbol});
    this.getMarkets(coin.id);
    this.setState({coin}, () => {
      this.getFavorite();
    });
  }

  getSymbolIcon = symbolStr => {
    if (symbolStr) {
      const symbol = symbolStr.toLowerCase().replace(' ', '-');
    }
    return `https://www.coinlore.com/img/${symbolStr}.png`;
  };

  getSection = coin => {
    const section = [
      {
        title: 'Matket Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24hs',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return section;
  };

  toogleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;
    const stored = await Storage.instance.store(key, coin);
    if (stored) {
      this.setState({isFavorite: true});
      console.log('is favorite');
    } else {
    }
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favStatus = await Storage.instance.get(key);
      if (favStatus != null) {
        this.setState({isFavorite: true});
      }
    } catch (error) {}
  };

  removeFavorite = async () => {
    Alert.alert('Remove Favorite', 'Are u sure', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          const coin = JSON.stringify(this.state.coin);

          const stored = await Storage.instance.remove(key, coin);
          if (stored) {
            this.setState({isFavorite: false});
            console.log('is favorite false');
          } else {
          }
        },
        style: 'destructive',
      },
      ,
    ]);
  };

  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subheader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{uri: this.getSymbolIcon(coin.nameid)}}
            />

            <Text style={styles.title}>{coin.name} </Text>
          </View>

          <Pressable
            onPress={this.toogleFavorite}
            style={
              (styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd)
            }>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSection(coin)}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
          keyExtractor={item => item}
        />

        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          style={styles.listStyle}
          horizontal={true}
          keyExtractor={item => `${item.base}-${item.name}-${item.quote}`}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
        {/* <CoinMarketItem item={item} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  section: {
    maxHeight: 220,
  },
  listStyle: {
    maxHeight: 120,
    paddingLeft: 16,
  },

  marketTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },

  subheader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
  iconImg: {
    height: 25,
    width: 25,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: 'white',
    fontSize: 14,
  },
  sectionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
  btnFavoriteText: {
    color: colors.white,
  },
});

export default CoinDetailsScreen;
