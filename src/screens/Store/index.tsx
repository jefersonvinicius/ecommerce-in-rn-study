import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Indicator from 'app/components/Indicator';
import ProductItem from 'app/components/ProductItem';
import {useIsAuthenticated} from 'app/modules/auth';
import {useAddToCartAction, useCartQuery} from 'app/modules/cart';
import {StackParamList} from 'app/routes';
import {Product} from 'app/services';
import LogInModal from 'app/components/LogInModal';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useProductsQuery} from 'app/modules/products';
import {COLORS} from 'app/config/theme';

type ScreenNavigationParams = NativeStackNavigationProp<StackParamList, 'Store'>;

export default function StoreScreen() {
  const {width: windowWidth} = useWindowDimensions();

  const navigation = useNavigation<ScreenNavigationParams>();

  const scrollXStarted = useRef(0);
  const scrollDirection = useRef<'left' | 'right' | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isScrolling, setIsScrolling] = useState(false);
  const [activedProductIndex, setActivedProductIndex] = useState(0);
  const [productAddingToCart, setProductAddingToCart] = useState<Product | null>(null);
  const {isAuthenticated} = useIsAuthenticated();

  const {addToCart, isAddingProductToCart} = useAddToCartAction();

  const {cart, isRefetchingCart} = useCartQuery();
  const {products, isLoadingProducts, refetchProducts, isRefetchingProducts} = useProductsQuery();

  console.log({isRefetchingCart});

  async function handleAddCartPress(product: Product) {
    if (!isAuthenticated) {
      setProductAddingToCart(product);
      return;
    }
    addToCart(product);
  }

  async function handleLogInFinished() {
    const product = productAddingToCart;
    setProductAddingToCart(null);
    if (product) await addToCart(product);
  }

  const points = useMemo(() => {
    return products?.map((_, index) => ({width: Math.floor(windowWidth * index), index})) || [];
  }, [products, windowWidth]);

  const reversedPoints = useMemo(() => Array.from(points).reverse(), [points]);

  const momentumEndTimeout = useRef<number | null>(null);
  function handleMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (momentumEndTimeout.current !== null) clearTimeout(momentumEndTimeout.current);
    const offset = event.nativeEvent.contentOffset.x;
    momentumEndTimeout.current = setTimeout(() => {
      const pointFound = reversedPoints.find(point => offset >= point.width);
      if (pointFound) setActivedProductIndex(pointFound.index);
      setIsScrolling(false);
    }, 100);
  }

  const lastScrollOffsetX = useRef<number | null>(null);
  function handleOnScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const offsetX = event.nativeEvent.contentOffset.x;
    if (lastScrollOffsetX.current !== null) {
      scrollDirection.current = offsetX >= lastScrollOffsetX.current ? 'left' : 'right';
    }
    lastScrollOffsetX.current = offsetX;
  }

  function handleScrollBeginDrag(event: NativeSyntheticEvent<NativeScrollEvent>) {
    scrollXStarted.current = event.nativeEvent.contentOffset.x;
    setIsScrolling(true);
  }

  function handleCartPress() {
    navigation.navigate('Cart');
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <ProductItem item={item} onAddCartPress={handleAddCartPress} />}
          pagingEnabled
          horizontal
          onScrollBeginDrag={handleScrollBeginDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onRefresh={refetchProducts}
          refreshing={isRefetchingProducts}
          ListEmptyComponent={
            <>
              {!isLoadingProducts && (
                <View style={styles.noProductsBox}>
                  <Text style={styles.noProductsText}>Nenhum produto encontrado!</Text>
                </View>
              )}
            </>
          }
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {listener: handleOnScroll, useNativeDriver: false},
          )}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={3}
          maxToRenderPerBatch={1}
        />
        <View style={styles.header}>
          <View style={styles.indicatorsBox}>
            {products?.map((product, index) => (
              <Indicator
                key={product.id}
                index={index}
                indicatorActivedIndex={activedProductIndex}
                isScrolling={isScrolling}
                scrollDirection={scrollDirection.current}
                scrollXStarted={scrollXStarted.current}
                scrollX={scrollX}
                totalIndicators={products.length}
              />
            ))}
          </View>
          <View style={styles.cartButton}>
            <Pressable
              onPress={handleCartPress}
              style={styles.cartButtonInner}
              android_ripple={{color: 'rgba(0, 0, 0, 0.2)', borderless: true}}>
              <Icon name="shopping-cart" size={16} />
            </Pressable>
            {cart && (
              <View style={styles.cartCountBox}>
                {isAddingProductToCart || isRefetchingCart ? (
                  <ActivityIndicator size={5} color="#fff" />
                ) : (
                  <Text style={styles.cartCountText}>{cart.items.length}</Text>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
      <LogInModal
        isVisible={!!productAddingToCart}
        onClose={() => setProductAddingToCart(null)}
        onLogInFinished={handleLogInFinished}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    width: '100%',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 10,
  },
  cartButtonInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noProductsBox: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  noProductsText: {
    textAlign: 'center',
  },
  cartCountBox: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    position: 'absolute',
    top: -3,
    right: -3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 10,
  },
});
