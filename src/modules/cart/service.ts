import {Product} from '../../services';
import api from '../../services/api';

type CartItem = {
  id: number;
  quantity: number;
  name: string;
};

export type Cart = {
  total: number;
  items: CartItem[];
};

export default class CartService {
  static async addToCart(product: Product, quantity: number = 1) {
    await api.post(`/cart/${product.id}`, {quantity});
  }

  static async fetchCurrent(): Promise<Cart> {
    const {data} = await api.get('/cart');
    return data.cart;
  }
}
