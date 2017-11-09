import { formatProduct } from './util';
import {
  isArray,
  isObject,
} from 'common/util';

export default cart => payload => {

  if (!isObject(cart)) {
    throw new Error('buzzi.cartPurchase: missing cart');
  }

  if (payload.email) {
    throw new Error('buzzi.cartPurchase: customer not identified yet');
  }

  if (isArray(cart.products)) {
    cart.products = cart.products.map(formatProduct);
  }

  payload.cart = cart;
};
