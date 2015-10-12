import { equal } from "assert"
import _ from "lodash"

import shape, {
  STRING,
  NUMBER,
  OBJECT,
  ARRAY,
} from "../src"

describe("facts", () => {
  describe("shape", () => {
    _.each([

      ["bob vs bob", // Description
        "bob",       // a
        "bob",       // b
        true],       // result of shape(a, b)

      ["bob vs pat",
        "bob",
        "pat",
        false],

      ["STRING vs bob",
        STRING,
        "bob",
        true],

      ["bob vs STRING",
        "bob",
        STRING,
        true],

      ["STRING vs 1",
        STRING,
        1,
        false],

      ["STRING vs true",
        STRING,
        true,
        false],

      ["STRING vs false",
        STRING,
        false,
        false],

      ["1 vs 1",
        1,
        1,
        true],

      ["1 vs 2",
        1,
        2,
        false],

      ["NUMBER vs 1",
        NUMBER,
        1,
        true],

      ["NUMBER vs 1.0",
        NUMBER,
        1.0,
        true],

      ["NUMBER vs -1",
        NUMBER,
        -1,
        true],

      ["NUMBER vs -1.0",
        NUMBER,
        -1.0,
        true],

      ["true vs true",
        true,
        true,
        true],

      ["false vs false",
        false,
        false,
        true],

      ["true vs false",
        true,
        false,
        false],

      ["[] vs []",
        [],
        [],
        true],

      ["[1] vs [bob]",
        [1],
        ["bob"],
        false],

      ["[1] vs [1,2]",
        [1],
        [1,2],
        false],

      ["[1,2,3] vs [1, NUMBER, 3]",
        [1,2,3],
        [1, NUMBER, 3],
        true],

      ["[1,2,3] vs [1, STRING, 3]",
        [1,2,3],
        [1, STRING, 3],
        false],

      ["[1, [2, [3]]] vs [1, [2, [3]]]",
        [1, [2, [3]]],
        [1, [2, [3]]],
        true],

      ["[1, [2, [3]]] vs [1, [2, [4]]]",
        [1, [2, [3]]],
        [1, [2, [4]]],
        false],

      ["[NUMBER, [NUMBER, [NUMBER]]] vs [1, [2, [3]]]",
        [NUMBER, [NUMBER, [NUMBER]]],
        [1, [2, [4]]],
        true],

      ["[NUMBER, [NUMBER, [NUMBER]]] vs [1, [bob, [3]]]",
        [NUMBER, [NUMBER, [NUMBER]]],
        [1, ["bob", [4]]],
        false],

      ["{} vs {}",
        {},
        {},
        true],

      ["{foo: bar} vs {foo: bar}",
        {foo: "bar"},
        {foo: "bar"},
        true],

      ["{foo: bar} vs {foo: 1}",
        {foo: "bar"},
        {foo: 1},
        false],

      ["{foo: 1, bar: 1} vs {foo: 1}",
        {foo:1, bar:1},
        {foo: 1},
        false],

      ["{foo: [1,2,3]} vs {foo: [NUMBER, NUMBER, 3]}",
        {foo: [1,2,3]},
        {foo: [NUMBER, NUMBER, 3]},
        true],

      ["{foo: [1,bob,3]} vs {foo: [NUMBER, NUMBER, 3]}",
        {foo: [1,"bob",3]},
        {foo: [NUMBER, NUMBER, 3]},
        false],

      ["COMPLEX - 1",
        {foo: {bar: [1,2,3]}},
        {foo: {bar: [1,2,3]}},
        true],

      ["COMPLEX - 2",
        {foo: {bar: [3,2,1]}},
        {foo: {bar: [1,2,3]}},
        false],

      ["COMPLEX - 3",
        ["bob", {foo:1}, {bar:1}],
        ["bob", {foo:1}, {bar:1}],
        true],

      ["COMPLEX - 4",
        ["bob", {foo:2}, {bar:1}],
        ["bob", {foo:1}, {bar:1}],
        false],

      ["COMPLEX - 5",
        ["pat", {foo:1}, {bar:1}],
        ["bob", {foo:1}, {bar:1}],
        false],

      ["COMPLEX - 6",
        {
          uuidOfPost: "asdf",
          uuidOfUser: "asdf",
          createdAt: 1434626263000,
          uuid: "asdf",
          comment: "this is a comment" ,
          timestamp: { year: 2015, month: 6, day: 18, hour: 11, minutes: 17 },
          user: { uuid: "asdf", username: "bob", avatar: "http://woot", karma: 6 },
        },
        {
          uuidOfPost: STRING,
          uuidOfUser: STRING,
          createdAt: NUMBER,
          uuid: STRING,
          comment: STRING,
          timestamp: { year: NUMBER, month: NUMBER, day: NUMBER, hour: NUMBER, minutes: NUMBER },
          user: { uuid: STRING, username: STRING, avatar: STRING, karma: NUMBER },
        },
        true]

    ], ([desc, a, b, r]) => it(desc, () => equal(shape(a, b), r)))
  })
})
