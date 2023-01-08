import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  label: string;
};

export default function Button(props: Props) {
  return (
    <View style={styles.addCartBtn}>
      <Pressable
        android_ripple={{color: 'rgba(255,255,255,0.2)'}}
        style={styles.addCartBtnInner}
        onPress={props.onPress}>
        <Text style={styles.addCartLabel}>{props.label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
