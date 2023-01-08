import API from 'app/services';
import {useQuery} from 'react-query';
import {useIsAuthenticated} from '../auth';

export function useCartQuery() {
  const {isAuthenticated} = useIsAuthenticated();
  const {data, isFetching, isLoading, isRefetching} = useQuery('cart', () => API.Cart.fetchCurrent(), {
    enabled: isAuthenticated,
  });
  return {cart: data, isFetchingCart: isFetching, isLoadingCart: isLoading, isRefetchingCart: isRefetching};
}
