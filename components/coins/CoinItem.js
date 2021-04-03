import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../res/colors';
const CoinsItem = ({item, onPress}) => {
  let getImageArrow = () => {
    if (item.percent_change_1h < 0) {
      return require('../../assets/arrow_down.png');
    } else {
      return require('../../assets/arrow_up.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.priceText}>{item.price_usd}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>{item.percent_change_1h}</Text>
        <Image style={styles.image} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: 16,
    marginLeft: 16,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: 'white',
    fontSize: 14,
    margin: 12,
  },
  percentText: {
    color: 'white',
    fontSize: 12,
  },
  priceText: {
    color: 'white',
    fontSize: 14,
  },
  image: {
    height: 22,
    width: 22,
  },
});

export default CoinsItem;
