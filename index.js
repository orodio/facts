"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeStrings;

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var types = { STRING: Symbol("string"),
  NUMBER: Symbol("number"),
  BOOLEAN: Symbol("boolean"),
  OBJECT: Symbol("object"),
  ARRAY: Symbol("array"),
  UNDEFINED: Symbol("undefined"),
  FUNCTION: Symbol("function"),
  UNKNOWN: Symbol("unknown"),
  NULL: Symbol("null")
};

var typeStrings = (_typeStrings = {}, _defineProperty(_typeStrings, types.STRING, "string"), _defineProperty(_typeStrings, types.NUMBER, "number"), _defineProperty(_typeStrings, types.BOOLEAN, "boolean"), _defineProperty(_typeStrings, types.OBJECT, "object"), _defineProperty(_typeStrings, types.ARRAY, "array"), _defineProperty(_typeStrings, types.UNDEFINED, "undefined"), _defineProperty(_typeStrings, types.FUNCTION, "function"), _defineProperty(_typeStrings, types.UNKNOWN, "unknown"), _defineProperty(_typeStrings, types.NULL, "null"), _typeStrings);

var is = { STRING: function STRING(thing) {
    return typeof thing === "string";
  },
  NUMBER: function NUMBER(thing) {
    return typeof thing === "number";
  },
  OBJECT: function OBJECT(thing) {
    return typeof thing === "object";
  },
  UNDEFINED: function UNDEFINED(thing) {
    return typeof thing === "undefined";
  },
  BOOLEAN: function BOOLEAN(thing) {
    return typeof thing === "boolean";
  },
  FUNCTION: function FUNCTION(thing) {
    return typeof thing === "function";
  },
  ARRAY: function ARRAY(thing) {
    return Array.isArray(thing);
  },
  NULL: function NULL(thing) {
    return thing === null;
  }
};

function isKnownType(inv) {
  return !is.UNDEFINED(typeStrings[inv]);
}

function whatType(ent) {
  if (isKnownType(ent)) return ent;
  if (is.NULL(ent)) return types.NULL;
  if (is.ARRAY(ent)) return types.ARRAY;
  if (is.OBJECT(ent)) return types.OBJECT;
  if (is.STRING(ent)) return types.STRING;
  if (is.FUNCTION(ent)) return types.FUNCTION;
  if (is.NUMBER(ent)) return types.NUMBER;
  if (is.BOOLEAN(ent)) return types.BOOLEAN;
  if (is.UNDEFINED(ent)) return types.UNDEFINED;
  return types.UNKNOWN;
}

function shapeObject(ent, inv) {
  if (inv === types.OBJECT) return true;
  var invKeys = Object.keys(inv);
  __loop: while (true) {
    if (!invKeys.length) return true;
    var key = invKeys.pop();
    if (shape(ent[key], inv[key])) continue __loop;
    return false;
  }
}

function shapeArray(ents, inv) {
  if (inv === types.ARRAY) return true;
  if (!inv.length) return true;
  __loop: while (true) {
    if (!ents.length) return true;
    if (shape(ents.pop(), inv[0])) continue __loop;
    return false;
  }
}

function shape(ent, inv) {
  var entType = whatType(ent);
  var invType = whatType(inv);
  if (entType === invType) {
    if (invType === types.OBJECT) return shapeObject(ent, inv);
    if (invType === types.ARRAY) return shapeArray(ent, inv);
    return true;
  }

  return false;
}

exports["default"] = Object.assign({ shape: shape, whatType: whatType, typeStrings: typeStrings }, types);
module.exports = exports["default"];
