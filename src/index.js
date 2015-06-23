const types =
{ STRING    : Symbol("string")
, NUMBER    : Symbol("number")
, BOOLEAN   : Symbol("boolean")
, OBJECT    : Symbol("object")
, ARRAY     : Symbol("array")
, UNDEFINED : Symbol("undefined")
, FUNCTION  : Symbol("function")
, UNKNOWN   : Symbol("unknown")
, NULL      : Symbol("null")
}

const typeStrings =
{ [types.STRING]    : "string"
, [types.NUMBER]    : "number"
, [types.BOOLEAN]   : "boolean"
, [types.OBJECT]    : "object"
, [types.ARRAY]     : "array"
, [types.UNDEFINED] : "undefined"
, [types.FUNCTION]  : "function"
, [types.UNKNOWN]   : "unknown"
, [types.NULL]      : "null"
}

const is =
{ STRING    : thing => typeof thing === "string"
, NUMBER    : thing => typeof thing === "number"
, OBJECT    : thing => typeof thing === "object"
, UNDEFINED : thing => typeof thing === "undefined"
, BOOLEAN   : thing => typeof thing === "boolean"
, FUNCTION  : thing => typeof thing === "function"
, ARRAY     : thing => Array.isArray(thing)
, NULL      : thing => thing === null
}

function isKnownType(inv) {
  return !is.UNDEFINED(typeStrings[inv])
}

function whatType (ent) {
  if (isKnownType  (ent)) return ent
  if (is.NULL      (ent)) return types.NULL
  if (is.ARRAY     (ent)) return types.ARRAY
  if (is.OBJECT    (ent)) return types.OBJECT
  if (is.STRING    (ent)) return types.STRING
  if (is.FUNCTION  (ent)) return types.FUNCTION
  if (is.NUMBER    (ent)) return types.NUMBER
  if (is.BOOLEAN   (ent)) return types.BOOLEAN
  if (is.UNDEFINED (ent)) return types.UNDEFINED
  return types.UNKNOWN
}

function shapeObject (ent, inv) {
  if (inv === types.OBJECT) return true
  const invKeys = Object.keys(inv)
  __loop: while (true) {
    if (!invKeys.length) return true
    const key = invKeys.pop()
    if (shape(ent[key], inv[key])) continue __loop
    return false
  }
}

function shapeArray (ents, inv) {
  if (inv === types.ARRAY) return true
  if (!inv.length) return true
  __loop: while (true) {
    if (!ents.length) return true
    if (shape(ents.pop(), inv[0])) continue __loop
    return false
  }
}

function shape (ent, inv) {
  const entType = whatType(ent)
  const invType = whatType(inv)
  if (entType === invType) {
    if (invType === types.OBJECT) return shapeObject(ent, inv)
    if (invType === types.ARRAY)  return shapeArray(ent, inv)
    return true
  }

  return false
}

export default Object.assign({shape, whatType, typeStrings}, types)
