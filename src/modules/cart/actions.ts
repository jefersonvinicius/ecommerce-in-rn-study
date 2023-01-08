import API, {Product} from 'app/services';
import {useCallback, useState} from 'react';
import {useQueryClient} from 'react-query';

export function useAddToCartAction() {
  const [isAddingProductToCart, setIsAddingProductToCart] = useState(false);

  const queryClient = useQueryClient();

  const addToCart = useCallback(
    async (product: Product) => {
      try {
        setIsAddingProductToCart(true);
        await API.Cart.addToCart(product);
        await queryClient.invalidateQueries('cart');
      } catch (error) {
        throw error;
      } finally {
        setIsAddingProductToCart(false);
      }
    },
    [queryClient],
  );

  return {addToCart, isAddingProductToCart};
}
