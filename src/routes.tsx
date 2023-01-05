import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from './screens/Cart';
import StoreScreen from './screens/Store';

export type StackParamList = {
  Store: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Store" component={StoreScreen} options={{headerShown: false}} />
        <Stack.Screen name="Cart" component={CartScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
