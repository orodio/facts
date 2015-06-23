## Some initial work to a bigger picture, still needs quite a bit of work

# TODO
- [] throw errors in a way that tell you where things dont match the shape

# Install

```
$ npm install facts
```

# Basic Usage

```
  // import shape and the types you want
  // available types include STRING NUMBER BOOLEAN OBJECT ARRAY UNDEFINED FUNCTION NULL
  import { shape, STRING, NUMBER } from "facts"

  // Basic Usage to check types
  shape("bob", STRING) // true
  shape(5,     STRING) // false
  shape("bob", NUMBER) // false
  shape(5,     NUMBER) // true

  // Almost basic usage
  shape([1,2,3],      [NUMBER])      // true
  shape(["a","b"],    [STRING])      // true
  shape([1,"a",3],    ARRAY)         // true
  shape({foo: "bar"}, {foo: STRING}) // true
  shape({foo: 5},     {foo: NUMBER}) // true
  shape({foo: "bar"}, OBJECT)        // true

  // Advanced Usage

  var boosh = [
    { uuid: 1, name: "Bob", job: "Builder", age: 92 },
    { uuid: 2, name: "Pat", job: "Postman", age: 73 }
  ]
  shape(boosh, [{uuid: NUMBER, name: STRING, job: STRING, age: NUMBER}])
```


