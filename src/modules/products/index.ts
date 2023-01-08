import {useQuery} from 'react-query';
import API from '../../services';

export function useProductsQuery() {
  const {data, isLoading, isRefetching, refetch} = useQuery('products', () => API.fetchProducts());
  return {products: data, isLoadingProducts: isLoading, refetchProducts: refetch, isRefetchingProducts: isRefetching};
}
