import _ from "lodash"

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

export const isBoolean   = checker(_.isBoolean,   BOOLEAN);
export const isArray     = checker(_.isArray,     ARRAY);
export const isFunction  = checker(_.isFunction,  FUNCTION);
export const isNull      = checker(_.isNull,      NULL);
export const isNumber    = checker(_.isNumber,    NUMBER);
export const isObject    = checker(_.isObject,    OBJECT);
export const isRegExp    = checker(_.isRegExp,    REGEXP);
export const isString    = checker(_.isString,    STRING);
export const isUndefined = checker(_.isUndefined, UNDEFINED);

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
  return _.any([for (s of shapes) pred(s)]);
}

function shape_literal(a, b) {
  if (a === ANY || b === ANY) return true;
  return whatType(a) === whatType(b);
}

function shape_array (a, b) {
  if (!isArray(a) || !isArray(b)) return false;
  if (a.length === 0 && a.length === 0) return true;
  return _.all(_.zipWith(a, b, shape))
}

function shape_object (a, b) {
  if (!isObject(a) || !isObject(b)) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  return _.all(_.map(a, (value, key) => {
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
