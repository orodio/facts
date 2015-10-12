## Some initial work to a bigger picture, still needs quite a bit of work

# TODO
- [ ] Typed Arrays
- [ ] Multiple length arrays

# Install

```
$ npm install facts
```

# Basic Usage

```
  // import shape and types you want
  import shape, {
    STRING,
    NUMBER
  } from "facts"

  shape("bob", "bob")                               // true
  shape(STRING, "bob")                              // true
  shape(STRING, 5)                                  // false
  shape(1, 1)                                       // true
  shape(NUMBER, 5)                                  // true
  shape(NUMBER, "bob")                              // false
  shape([1,2,3], [1,2,3])                           // true
  shape([1,"bob",3], [[1,2,3]])                     // false
  shapw(["ok", NUMBER], ["ok", 5])                  // true
  shapw(["ok", NUMBER], ["ok", "bob"])              // false
  shape(ARRAY, [])                                  // true
  shape(ARRAY, [1,2,3])                             // true
  shape({foo: [1,2,3]}, {foo: [NUMBER, NUMBER, 3]}) // true
```

## License

**facts** is Copyright (c) 2015 James Hunter [@cccc00](https://twitter.com/cccc00) and licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
