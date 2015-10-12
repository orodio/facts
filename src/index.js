import _isBoolean   from "lodash/lang/isBoolean"
import _isArray     from "lodash/lang/isArray"
import _isFunction  from "lodash/lang/isFunction"
import _isNull      from "lodash/lang/isNull"
import _isNumber    from "lodash/lang/isNumber"
import _isObject    from "lodash/lang/isObject"
import _isRegExp    from "lodash/lang/isRegExp"
import _isString    from "lodash/lang/isString"
import _isUndefined from "lodash/lang/isUndefined"
import _map         from "lodash/collection/map"
import _any         from "lodash/collection/any"
import _all         from "lodash/collection/all"
import _zipWith     from "lodash/array/zipWith"

export const BOOLEAN   = Symbol("boolean");
export const ARRAY     = Symbol("array");
export const FUNCTION  = Symbol("function");
export const NULL      = Symbol("null");
export const NUMBER    = Symbol("number");
export const OBJECT    = Symbol("object");
export const REGEXP    = Symbol("regexp");
export const STRING    = Symbol("string");
export const UNDEFINED = Symbol("undefined");
export const UNKNOWN   = Symbol("unknown");
export const ANY       = Symbol("any");

function checker (func, symb) {
  return function (v) {
    return func(v) || v === symb;
  }
}

export const isBoolean   = checker(_isBoolean,   BOOLEAN);
export const isArray     = checker(_isArray,     ARRAY);
export const isFunction  = checker(_isFunction,  FUNCTION);
export const isNull      = checker(_isNull,      NULL);
export const isNumber    = checker(_isNumber,    NUMBER);
export const isObject    = checker(_isObject,    OBJECT);
export const isRegExp    = checker(_isRegExp,    REGEXP);
export const isString    = checker(_isString,    STRING);
export const isUndefined = checker(_isUndefined, UNDEFINED);

function isLiteral (v) {
  switch (v) {
    case BOOLEAN:
    case ARRAY:
    case FUNCTION:
    case NULL:
    case NUMBER:
    case OBJECT:
    case REGEXP:
    case STRING:
    case UNDEFINED:
    case UNKNOWN:
    case ANY:
      return true;
    default:
      return false;
  }
}

function theTypes () {
  return [
    [STRING,    isString],
    [NUMBER,    isNumber],
    [FUNCTION,  isFunction],
    [ARRAY,     isArray],
    [REGEXP,    isRegExp],
    [OBJECT,    isObject],
    [BOOLEAN,   isBoolean],
    [UNDEFINED, isUndefined],
    [NULL,      isNull],
  ]
}

export function whatType (v) {
  let types = theTypes();

  __loop: while (1) {
    if (!types.length) return UNKNOWN;
    const [ type, isType ] = types.shift();
    if (isType(v)) return type;
    continue __loop;
  }
}

function any (pred, ...shapes) {
  return _any([for (s of shapes) pred(s)]);
}

function shape_literal(a, b) {
  if (a === ANY || b === ANY) return true;
  return whatType(a) === whatType(b);
}

function shape_array (a, b) {
  if (!isArray(a) || !isArray(b)) return false;
  if (a.length === 0 && a.length === 0) return true;
  return _all(_zipWith(a, b, shape))
}

function shape_object (a, b) {
  if (!isObject(a) || !isObject(b)) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  return _all(_map(a, (value, key) => {
    if (b[key] == null) return false;
    return shape(a[key], b[key])
  }))
}

export default function shape (a, b) {
  if (any(isLiteral, a, b)) return shape_literal(a, b);
  if (any(isArray, a, b))   return shape_array(a, b);
  if (any(isObject, a, b))  return shape_object(a, b);
  return a === b;
}
