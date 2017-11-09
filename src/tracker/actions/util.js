import { getCurrentPageUrl } from 'common/browser';
import {
  isObject,
  isNumber,
  isString,
  isUrl,
} from 'common/util';


export function formatProduct(product) {

  if (!isObject(product)) {
    throw new Error('buzzi.product: missing product');
  }

  if (!(isNumber(product.code) || isString(product.code))) {
    throw new Error('buzzi.product: invalid product code');
  }

  if (!isString(product.name)) {
    throw new Error('buzzi.product: invalid product name');
  }

  if (!isUrl(product.image)) {
    throw new Error('buzzi.product: invalid product image url');
  }

  if (!isUrl(product.url)) {
    console.warn('buzzi.product: no product url, defaulting to current location');
    product.url = getCurrentPageUrl();
  }

  if (!(isString(product.price) || isNumber(product.price))) {
    console.warn('buzzi.product: no product price, defaulting to 1');
    product.price = 0;
  }

  if (!isNumber(product.quantity)) {
    console.warn('buzzi.product: no product quantity, defaulting to 1');
    product.quantity = 1;
  }

  if (!(isString(product.total) || isNumber(product.total))) {
    console.warn('buzzi.product: no product total, defaulting to product price times quantity');
    product.total = (+product.price) * (+product.quantity);
  }

  return product;
}
