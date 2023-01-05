import React from 'react';
import {Text, View} from 'react-native';
import {useFetchCart} from '../../modules/cart';
import {brl} from '../../utils/currency';

export default function CartScreen() {
  const {cart} = useFetchCart();

  return (
    <View>
      <Text>CART</Text>
      {cart && (
        <>
          {cart.items.map(item => (
            <Text key={item.id}>
              {item.name} x{item.quantity}
            </Text>
          ))}
          <Text>TOTAL: {brl(cart?.total)}</Text>
        </>
      )}
    </View>
  );
}
