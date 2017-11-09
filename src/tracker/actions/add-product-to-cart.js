
import { getCurrentPageUrl } from 'common/browser';
import {
  isObject,
  isNumber,
  isString,
  isUrl,
} from 'common/util';


export default product => payload => {
  payload.product = processProduct(product);
};


function processProduct(product) {

  if (!isObject(product)) {
    throw new Error('buzzi.addProductToCart: missing product');
  }

  if (!(isNumber(product.code) || isString(product.code))) {
    throw new Error('buzzi.addProductToCart: invalid product code');
  }

  if (!isString(product.name)) {
    throw new Error('buzzi.addProductToCart: invalid product name');
  }

  if (!isUrl(product.image)) {
    throw new Error('buzzi.addProductToCart: invalid product image url');
  }

  if (!isUrl(product.url)) {
    console.warn('buzzi.addProductToCart: no product url, defaulting to current location');
    product.url = getCurrentPageUrl();
  }

  if (!(isString(product.price) || isNumber(product.price))) {
    console.warn('buzzi.addProductToCart: no product price, defaulting to 1');
    product.price = 0;
  }

  if (!isNumber(product.quantity)) {
    console.warn('buzzi.addProductToCart: no product quantity, defaulting to 1');
    product.quantity = 1;
  }

  if (!(isString(product.total_price) || isNumber(product.total_price))) {
    console.warn('buzzi.addProductToCart: no product total_price, defaulting to product price times quantity');
    product.total_price = (+product.price) * (+product.quantity);
  }

  return product;
}
