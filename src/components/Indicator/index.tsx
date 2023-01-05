import React from 'react';
import {Animated, StyleSheet, useWindowDimensions, View} from 'react-native';

type Props = {
  totalIndicators: number;
  indicatorActivedIndex: number;
  scrollX: Animated.Value;
  scrollXStarted: number;
  scrollDirection: null | 'left' | 'right';
  isScrolling: boolean;
  index: number;
};

const ACTIVED_SIZE = 9;
const NORMAL_SIZE = 7;

export default function Indicator({
  indicatorActivedIndex,
  scrollX,
  scrollXStarted,
  isScrolling,
  scrollDirection,
  totalIndicators,
  index,
}: Props) {
  const {width: windowWidth} = useWindowDimensions();

  const nextIndex =
    scrollDirection === 'right'
      ? Math.min(totalIndicators - 1, indicatorActivedIndex + 1)
      : Math.max(0, indicatorActivedIndex - 1);

  const inputRange = [scrollXStarted - windowWidth, scrollXStarted, scrollXStarted + windowWidth];

  const isActivedIndicator = indicatorActivedIndex === index;

  let size = null;
  if (isActivedIndicator) {
    size = scrollX.interpolate({
      inputRange,
      outputRange: [0, styles.indicatorInner.width, 0],
      extrapolate: 'clamp',
    });
  } else if (index === nextIndex) {
    size = scrollX.interpolate({
      inputRange,
      outputRange: [styles.indicatorInner.width, 0, styles.indicatorInner.width],
      extrapolate: 'clamp',
    });
  }

  let backgroundColor;
  if (isScrolling) {
    backgroundColor = '#999';
  } else {
    backgroundColor = isActivedIndicator ? '#fff' : '#999';
  }

  const sizeIndicator = isScrolling ? NORMAL_SIZE : isActivedIndicator ? ACTIVED_SIZE : NORMAL_SIZE;

  return (
    <View style={styles.indicatorBox}>
      <View
        style={{
          ...styles.indicator,
          backgroundColor,
          ...(sizeIndicator
            ? {
                width: sizeIndicator,
                height: sizeIndicator,
              }
            : {}),
        }}>
        {isScrolling && (
          <Animated.View
            style={{
              ...styles.indicatorInner,
              ...(size ? {width: size, height: size} : {}),
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorBox: {
    width: ACTIVED_SIZE,
    height: ACTIVED_SIZE,
    backgroundColor: 'transparent',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: NORMAL_SIZE,
    height: NORMAL_SIZE,
    borderRadius: 15,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorInner: {
    width: ACTIVED_SIZE,
    height: ACTIVED_SIZE,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
});
