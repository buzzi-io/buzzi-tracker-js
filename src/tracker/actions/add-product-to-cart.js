import { formatProduct } from './util';


export default product => payload => {
  payload.product = formatProduct(product);
};
