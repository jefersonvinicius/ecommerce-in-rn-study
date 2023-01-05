import React from 'react';
import {Dimensions, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {Product} from '../../services/api';
import {brl} from '../../utils/currency';

type ProductItemProps = {
  item: Product;
  onAddCartPress: (product: Product) => void;
};

export default function ProductItem({item, onAddCartPress}: ProductItemProps) {
  return (
    <ImageBackground style={styles.container} source={{uri: item.imageUrl}}>
      <View style={styles.footer}>
        <View style={styles.priceBox}>
          <Text>{item.name}</Text>
          <Text>{brl(item.price)}</Text>
        </View>
        <View style={styles.descriptionBox}>
          <Text>{item.description}</Text>
          <View style={styles.addCartBtn}>
            <Pressable
              android_ripple={{color: 'rgba(255,255,255,0.2)'}}
              style={styles.addCartBtnInner}
              onPress={() => onAddCartPress(item)}>
              <Text style={styles.addCartLabel}>Add Cart</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    justifyContent: 'flex-end',
  },
  imageBox: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addCartBtn: {
    backgroundColor: '#1e88e5',
    borderRadius: 5,
  },
  addCartBtnInner: {
    padding: 5,
    paddingHorizontal: 10,
  },
  addCartLabel: {
    color: '#fff',
  },
});
