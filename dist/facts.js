"use strict";

var _lodashLangIsBoolean2 = require("lodash/lang/isBoolean");

var _lodashLangIsBoolean3 = _interopRequireDefault(_lodashLangIsBoolean2);

var _lodashLangIsArray2 = require("lodash/lang/isArray");

var _lodashLangIsArray3 = _interopRequireDefault(_lodashLangIsArray2);

var _lodashLangIsFunction2 = require("lodash/lang/isFunction");

var _lodashLangIsFunction3 = _interopRequireDefault(_lodashLangIsFunction2);

var _lodashLangIsNull2 = require("lodash/lang/isNull");

var _lodashLangIsNull3 = _interopRequireDefault(_lodashLangIsNull2);

var _lodashLangIsNumber2 = require("lodash/lang/isNumber");

var _lodashLangIsNumber3 = _interopRequireDefault(_lodashLangIsNumber2);

var _lodashLangIsObject2 = require("lodash/lang/isObject");

var _lodashLangIsObject3 = _interopRequireDefault(_lodashLangIsObject2);

var _lodashLangIsRegExp2 = require("lodash/lang/isRegExp");

var _lodashLangIsRegExp3 = _interopRequireDefault(_lodashLangIsRegExp2);

var _lodashLangIsString2 = require("lodash/lang/isString");

var _lodashLangIsString3 = _interopRequireDefault(_lodashLangIsString2);

var _lodashLangIsUndefined2 = require("lodash/lang/isUndefined");

var _lodashLangIsUndefined3 = _interopRequireDefault(_lodashLangIsUndefined2);

var _lodashCollectionAny2 = require("lodash/collection/any");

var _lodashCollectionAny3 = _interopRequireDefault(_lodashCollectionAny2);

var _lodashCollectionAll2 = require("lodash/collection/all");

var _lodashCollectionAll3 = _interopRequireDefault(_lodashCollectionAll2);

var _lodashArrayZipWith2 = require("lodash/array/zipWith");

var _lodashArrayZipWith3 = _interopRequireDefault(_lodashArrayZipWith2);

var _lodashCollectionMap2 = require("lodash/collection/map");

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

exports.whatType = whatType;
exports.shape = shape;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BOOLEAN = Symbol("boolean");
exports.BOOLEAN = BOOLEAN;
var ARRAY = Symbol("array");
exports.ARRAY = ARRAY;
var FUNCTION = Symbol("function");
exports.FUNCTION = FUNCTION;
var NULL = Symbol("null");
exports.NULL = NULL;
var NUMBER = Symbol("number");
exports.NUMBER = NUMBER;
var OBJECT = Symbol("object");
exports.OBJECT = OBJECT;
var REGEXP = Symbol("regexp");
exports.REGEXP = REGEXP;
var STRING = Symbol("string");
exports.STRING = STRING;
var UNDEFINED = Symbol("undefined");
exports.UNDEFINED = UNDEFINED;
var UNKNOWN = Symbol("unknown");
exports.UNKNOWN = UNKNOWN;
var ANY = Symbol("any");

exports.ANY = ANY;
function checker(func, symb) {
  return function (v) {
    return func(v) || v === symb;
  };
}

var isBoolean = checker(_lodashLangIsBoolean3["default"], BOOLEAN);
exports.isBoolean = isBoolean;
var isArray = checker(_lodashLangIsArray3["default"], ARRAY);
exports.isArray = isArray;
var isFunction = checker(_lodashLangIsFunction3["default"], FUNCTION);
exports.isFunction = isFunction;
var isNull = checker(_lodashLangIsNull3["default"], NULL);
exports.isNull = isNull;
var isNumber = checker(_lodashLangIsNumber3["default"], NUMBER);
exports.isNumber = isNumber;
var isObject = checker(_lodashLangIsObject3["default"], OBJECT);
exports.isObject = isObject;
var isRegExp = checker(_lodashLangIsRegExp3["default"], REGEXP);
exports.isRegExp = isRegExp;
var isString = checker(_lodashLangIsString3["default"], STRING);
exports.isString = isString;
var isUndefined = checker(_lodashLangIsUndefined3["default"], UNDEFINED);
exports.isUndefined = isUndefined;
var isAny = function isAny(v) {
  return true;
};

exports.isAny = isAny;
function isLiteral(v) {
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

function theTypes() {
  return [[STRING, isString], [NUMBER, isNumber], [FUNCTION, isFunction], [ARRAY, isArray], [REGEXP, isRegExp], [OBJECT, isObject], [BOOLEAN, isBoolean], [UNDEFINED, isUndefined], [NULL, isNull]];
}

function whatType(v) {
  var types = theTypes();

  __loop: while (1) {
    if (!types.length) return UNKNOWN;

    var _types$shift = types.shift();

    var _types$shift2 = _slicedToArray(_types$shift, 2);

    var type = _types$shift2[0];
    var isType = _types$shift2[1];

    if (isType(v)) return type;
    continue __loop;
  }
}

function any(pred, shapes) {
  return (0, _lodashCollectionAny3["default"])((function () {
    var _lodashCollectionAny4 = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = shapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var s = _step.value;

        _lodashCollectionAny4.push(pred(s));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _lodashCollectionAny4;
  })());
}

function shape_literal(a, b) {
  return whatType(a) === whatType(b);
}

function shape_array(a, b) {
  return (0, _lodashCollectionAll3["default"])((0, _lodashArrayZipWith3["default"])(a, b, shape));
}

function shape_object(a, b) {
  if (!isArray(a) || !isArray(b)) return false;
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  return (0, _lodashCollectionAll3["default"])((0, _lodashCollectionMap3["default"])(a, function (value, key) {
    if (b[key] == null) return false;
    return shape(a[key], b[key]);
  }));
}

function shape(a, b) {
  if (any(isLiteral, a, b)) return shape_literal(a, b);
  if (any(isArray, a, b)) return shape_array(a, b);
  if (any(isObject, a, b)) return shape_object(a, b);
  return a === b;
}

//# sourceMappingURL=data:application/json;base64,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QUFPLEtBQUssQ0FBQztBQUM3QyxNQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ2xFLFNBQU8sc0NBQU0sc0NBQU0sQ0FBQyxFQUFFLFVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBSztBQUNwQyxRQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDakMsV0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0dBQzdCLENBQUMsQ0FBQyxDQUFBO0NBQ0o7O0FBRU0sU0FBUyxLQUFLLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQixNQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyRCxNQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFJLE9BQU8sV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRCxNQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFHLE9BQU8sWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwRCxTQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDaEIiLCJmaWxlIjoiZmFjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCJcblxuZXhwb3J0IGNvbnN0IEJPT0xFQU4gICA9IFN5bWJvbChcImJvb2xlYW5cIilcbmV4cG9ydCBjb25zdCBBUlJBWSAgICAgPSBTeW1ib2woXCJhcnJheVwiKVxuZXhwb3J0IGNvbnN0IEZVTkNUSU9OICA9IFN5bWJvbChcImZ1bmN0aW9uXCIpXG5leHBvcnQgY29uc3QgTlVMTCAgICAgID0gU3ltYm9sKFwibnVsbFwiKVxuZXhwb3J0IGNvbnN0IE5VTUJFUiAgICA9IFN5bWJvbChcIm51bWJlclwiKVxuZXhwb3J0IGNvbnN0IE9CSkVDVCAgICA9IFN5bWJvbChcIm9iamVjdFwiKVxuZXhwb3J0IGNvbnN0IFJFR0VYUCAgICA9IFN5bWJvbChcInJlZ2V4cFwiKVxuZXhwb3J0IGNvbnN0IFNUUklORyAgICA9IFN5bWJvbChcInN0cmluZ1wiKVxuZXhwb3J0IGNvbnN0IFVOREVGSU5FRCA9IFN5bWJvbChcInVuZGVmaW5lZFwiKVxuZXhwb3J0IGNvbnN0IFVOS05PV04gICA9IFN5bWJvbChcInVua25vd25cIilcbmV4cG9ydCBjb25zdCBBTlkgICAgICAgPSBTeW1ib2woXCJhbnlcIilcblxuZnVuY3Rpb24gY2hlY2tlciAoZnVuYywgc3ltYikge1xuICByZXR1cm4gZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gZnVuYyh2KSB8fCB2ID09PSBzeW1iXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGlzQm9vbGVhbiAgID0gY2hlY2tlcihfLmlzQm9vbGVhbiwgICBCT09MRUFOKVxuZXhwb3J0IGNvbnN0IGlzQXJyYXkgICAgID0gY2hlY2tlcihfLmlzQXJyYXksICAgICBBUlJBWSlcbmV4cG9ydCBjb25zdCBpc0Z1bmN0aW9uICA9IGNoZWNrZXIoXy5pc0Z1bmN0aW9uLCAgRlVOQ1RJT04pXG5leHBvcnQgY29uc3QgaXNOdWxsICAgICAgPSBjaGVja2VyKF8uaXNOdWxsLCAgICAgIE5VTEwpXG5leHBvcnQgY29uc3QgaXNOdW1iZXIgICAgPSBjaGVja2VyKF8uaXNOdW1iZXIsICAgIE5VTUJFUilcbmV4cG9ydCBjb25zdCBpc09iamVjdCAgICA9IGNoZWNrZXIoXy5pc09iamVjdCwgICAgT0JKRUNUKVxuZXhwb3J0IGNvbnN0IGlzUmVnRXhwICAgID0gY2hlY2tlcihfLmlzUmVnRXhwLCAgICBSRUdFWFApXG5leHBvcnQgY29uc3QgaXNTdHJpbmcgICAgPSBjaGVja2VyKF8uaXNTdHJpbmcsICAgIFNUUklORylcbmV4cG9ydCBjb25zdCBpc1VuZGVmaW5lZCA9IGNoZWNrZXIoXy5pc1VuZGVmaW5lZCwgVU5ERUZJTkVEKVxuZXhwb3J0IGNvbnN0IGlzQW55ICAgICAgID0gdiA9PiB0cnVlXG5cbmZ1bmN0aW9uIGlzTGl0ZXJhbCAodikge1xuICBzd2l0Y2ggKHYpIHtcbiAgICBjYXNlIEJPT0xFQU46XG4gICAgY2FzZSBBUlJBWTpcbiAgICBjYXNlIEZVTkNUSU9OOlxuICAgIGNhc2UgTlVMTDpcbiAgICBjYXNlIE5VTUJFUjpcbiAgICBjYXNlIE9CSkVDVDpcbiAgICBjYXNlIFJFR0VYUDpcbiAgICBjYXNlIFNUUklORzpcbiAgICBjYXNlIFVOREVGSU5FRDpcbiAgICBjYXNlIFVOS05PV046XG4gICAgY2FzZSBBTlk6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiB0aGVUeXBlcyAoKSB7XG4gIHJldHVybiBbXG4gICAgW1NUUklORywgICAgaXNTdHJpbmddLFxuICAgIFtOVU1CRVIsICAgIGlzTnVtYmVyXSxcbiAgICBbRlVOQ1RJT04sICBpc0Z1bmN0aW9uXSxcbiAgICBbQVJSQVksICAgICBpc0FycmF5XSxcbiAgICBbUkVHRVhQLCAgICBpc1JlZ0V4cF0sXG4gICAgW09CSkVDVCwgICAgaXNPYmplY3RdLFxuICAgIFtCT09MRUFOLCAgIGlzQm9vbGVhbl0sXG4gICAgW1VOREVGSU5FRCwgaXNVbmRlZmluZWRdLFxuICAgIFtOVUxMLCAgICAgIGlzTnVsbF0sXG4gIF1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdoYXRUeXBlICh2KSB7XG4gIGxldCB0eXBlcyA9IHRoZVR5cGVzKClcblxuICBfX2xvb3A6IHdoaWxlICgxKSB7XG4gICAgaWYgKCF0eXBlcy5sZW5ndGgpIHJldHVybiBVTktOT1dOXG4gICAgY29uc3QgWyB0eXBlLCBpc1R5cGUgXSA9IHR5cGVzLnNoaWZ0KClcbiAgICBpZiAoaXNUeXBlKHYpKSByZXR1cm4gdHlwZVxuICAgIGNvbnRpbnVlIF9fbG9vcFxuICB9XG59XG5cbmZ1bmN0aW9uIGFueSAocHJlZCwgc2hhcGVzKSB7XG4gIHJldHVybiBfLmFueShbZm9yIChzIG9mIHNoYXBlcykgcHJlZChzKV0pXG59XG5cbmZ1bmN0aW9uIHNoYXBlX2xpdGVyYWwoYSwgYikge1xuICByZXR1cm4gd2hhdFR5cGUoYSkgPT09IHdoYXRUeXBlKGIpO1xufVxuXG5mdW5jdGlvbiBzaGFwZV9hcnJheSAoYSwgYikge1xuICByZXR1cm4gXy5hbGwoXy56aXBXaXRoKGEsIGIsIHNoYXBlKSlcbn1cblxuZnVuY3Rpb24gc2hhcGVfb2JqZWN0IChhLCBiKSB7XG4gIGlmICghaXNBcnJheShhKSB8fCAhaXNBcnJheShiKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoT2JqZWN0LmtleXMoYSkubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIF8uYWxsKF8ubWFwKGEsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgaWYgKGJba2V5XSA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHNoYXBlKGFba2V5XSwgYltrZXldKVxuICB9KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoYXBlIChhLCBiKSB7XG4gIGlmIChhbnkoaXNMaXRlcmFsLCBhLCBiKSkgcmV0dXJuIHNoYXBlX2xpdGVyYWwoYSwgYik7XG4gIGlmIChhbnkoaXNBcnJheSwgYSwgYikpICAgcmV0dXJuIHNoYXBlX2FycmF5KGEsIGIpO1xuICBpZiAoYW55KGlzT2JqZWN0LCBhLCBiKSkgIHJldHVybiBzaGFwZV9vYmplY3QoYSwgYik7XG4gIHJldHVybiBhID09PSBiO1xufVxuIl19