import {useCallback} from 'react';
import {useQuery} from 'react-query';
import API, {Product} from '../../services';

export function useAddToCartAction() {
  return useCallback(async (product: Product) => {
    await API.Cart.addToCart(product);
  }, []);
}

export function useFetchCart() {
  const {data, isFetching, isLoading, isRefetching} = useQuery('cart', () => API.Cart.fetchCurrent());
  console.log({isLoading});
  return {cart: data, isFetchingCart: isFetching, isLoadingCart: isLoading, isRefetchingCart: isRefetching};
}
