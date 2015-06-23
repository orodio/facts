import assert, { equal } from "assert"
import
{ shape
, whatType
, typeStrings
, STRING
, NUMBER
, BOOLEAN
, OBJECT
, ARRAY
, UNDEFINED
, FUNCTION
, UNKNOWN
, NULL
} from "../src/index"

describe ("whatType", () => {
  [ [ "bob"     , STRING    ]
  , [ 4         , NUMBER    ]
  , [ true      , BOOLEAN   ]
  , [ false     , BOOLEAN   ]
  , [ {}        , OBJECT    ]
  , [ []        , ARRAY     ]
  , [ undefined , UNDEFINED ]
  , [ () => {}  , FUNCTION  ]
  , [ null      , NULL      ]
  , [ STRING    , STRING    ]
  , [ NUMBER    , NUMBER    ]
  , [ BOOLEAN   , BOOLEAN   ]
  , [ OBJECT    , OBJECT    ]
  , [ ARRAY     , ARRAY     ]
  , [ UNDEFINED , UNDEFINED ]
  , [ FUNCTION  , FUNCTION  ]
  , [ UNKNOWN   , UNKNOWN   ]
  , [ NULL      , NULL      ]
  ].forEach(([ent, inv], i) => {
    it (`${i} ${typeStrings[whatType(ent)]} is ${typeStrings[inv]}`, () => {
      equal(whatType(ent), inv)
    })
  })
})

function testShape (marker, pass, ent, inv) {
  it (`${marker} ${pass ? "is" : "is not"} a valid shape`, () => {
    equal(shape(ent, inv), pass)
  })
}

describe ("shape", () => {
  //        i, pass,  ent,   shape
  testShape(1, true,  "bob", STRING)
  testShape(2, false, 5,     STRING)
  testShape(3, true,  5,     NUMBER)
  testShape(3, false, "bob", NUMBER)

  testShape(4, true,  {foo: "bar"}, {foo: STRING})
  testShape(5, false, {foo: "bar"}, {foo: NUMBER})
  testShape(6, true,  {foo: "bar"}, OBJECT)

  testShape(7, true,
    {foo: "bar", bar: 5, omg: false},
    {foo: STRING, bar: NUMBER, omg: BOOLEAN}
  )

  testShape(8, false,
    {foo: "bar", bar: 5, omg: false},
    {foo: STRING, bar: NUMBER, omg: STRING}
  )

  testShape(9,  true, [1,2,3,4,5], [NUMBER])
  testShape(10, true, ["a","b","c"], [STRING])
  testShape(11, true, {foo: [1,2,3]}, {foo: [NUMBER]})
  testShape(12, true, {foo: [1,2,3]}, {foo: ARRAY})
  testShape(13, true, {foo: [1,2,3]}, {foo: []})

  testShape(14, true, [
    { uuidOfPost: "asdf",
      uuidOfUser: "asdf",
      createdAt: 1434626263000,
      uuid: "asdf",
      comment: "this is a comment" ,
      timestamp: { year: 2015, month: 6, day: 18, hour: 11, minutes: 17 },
      user: { uuid: "asdf", username: "bob", avatar: "http://woot", karma: 6 } 
    },
    { uuidOfPost: "asdf",
      uuidOfUser: "asdf" ,
      createdAt: 1434626263000,
      uuid: "asdf",
      comment: "this is a comment",
      timestamp: { year: 2015, month: 6, day: 18 , hour: 11 , minutes: 17 },
      user: { uuid: "asdf", username: "bob", avatar: "http://woot" , karma: 6 }
    }
  ], [
    { uuidOfPost: STRING,
      uuidOfUser: STRING,
      createdAt: NUMBER,
      timestamp: { year: NUMBER, month: NUMBER , day: NUMBER , hour: NUMBER , minutes: NUMBER },
      comment: STRING,
      user: { uuid: STRING, username: STRING, avatar: STRING, karma: NUMBER }
    }
  ])
})
