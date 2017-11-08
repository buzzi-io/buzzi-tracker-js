
const SIMPLE_EMAIL_REGEX = /@/;
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/; // eslint-disable-line no-useless-escape
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const exists = v => (v != null);
export const isUrl = s => (URL_REGEX.test(s));
export const isUuid = s => (UUID_REGEX.test(s));
export const isEmail = s => (SIMPLE_EMAIL_REGEX.test(s));
export const isString = s => (typeof s === 'string');
export const isFunction = f => (typeof f === 'function');
export const isArray = a => (Array.isArray(a));
export const isObject = o => (Object.prototype.toString.call(o) === '[object Object]');
export const isNumber = n => (!Number.isNan(parseFloat(n)) && Number.isFinite(n));
export const isInteger = n => (Number.isInteger(n));
export const isPositive = n => (n > 0);
export const isNegative = n => (n < 0);

export const isPlainObject = o => (
  (o !== null) && (typeof o === 'object') &&
  (Object.getPrototypeOf(o) === Object.prototype)
);
