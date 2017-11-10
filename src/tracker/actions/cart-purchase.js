import { formatProduct } from './util';
import {
  isArray,
  isObject,
  isValue,
  isNumber,
  isEmail,
} from 'common/util';

export default cart => payload => {

  if (!isEmail(payload.email)) {
    throw new Error('buzzi.cartPurchase: customer not identified yet');
  }

  if (!isObject(cart)) {
    console.warn('buzzi.cartPurchase: now cart object - tracking without cart information');
    return;
  }

  if (!isValue(cart.id)) {
    console.warn('buzzi.cartPurchase: missing cart order id');
    // throw new Error('buzzi.cartPurchase: missing cart order id');
  }

  if (isArray(cart.products)) {
    cart.products = cart.products.map(formatProduct);
  }

  if (!isValue(cart.total)) {
    console.warn('buzzi.cartPurchase: missing total, setting to 0 or calculating from product totals');
    cart.total = 0;
    if (isArray(cart.products)) {
      cart.total = cart.products.reduce((sum, { total }) => (sum + total), 0).toFixed(2);
    }
  } else if (isNumber(cart.total)) {
    cart.total = cart.total.toFixed(2);
  }

  payload.cart = cart;
};
