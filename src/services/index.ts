import CartService from '../modules/cart/service';
import api from './api';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type LogInPayload = {
  email: string;
  password: string;
};

export default class API {
  static async logIn(payload: LogInPayload) {
    const {data} = await api.post('/login', payload);
    return {accessToken: data.access_token, refreshToken: data.refresh_token, user: data.user};
  }

  static async fetchProducts(): Promise<Product[]> {
    const {data} = await api.get('/products');
    return data.products.map((product: any) => ({...product, imageUrl: product.image_url} as Product));
  }

  static get Cart() {
    return CartService;
  }
}
