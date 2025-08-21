import { expect, test } from "vitest";
import { fixJson } from "./fixJson";

test("adds quotes to unquoted keys", () => {
  expect(fixJson("{foo: 1}")).toBe('{"foo": 1}');
  expect(fixJson("{foo: 1, bar: 2}")).toBe('{"foo": 1, "bar": 2}');
  expect(fixJson("{_test: 1, $value: 2}")).toBe('{"_test": 1, "$value": 2}');
  expect(fixJson("{test123: 1}")).toBe('{"test123": 1}');
});

test("removes trailing commas", () => {
  expect(fixJson('{"a": 1,}')).toBe('{"a": 1}');
  expect(fixJson("[1, 2, 3,]")).toBe("[1, 2, 3]");
  expect(fixJson('{"a": [1, 2,], "b": 3,}')).toBe('{"a": [1, 2], "b": 3}');
  expect(fixJson('[1, {"a": 2,},]')).toBe('[1, {"a": 2}]');
});

test("removes single-line comments", () => {
  expect(fixJson('{"a": 1} // comment')).toBe('{"a": 1} ');
  expect(
    fixJson(`{
    "a": 1, // first comment
    "b": 2  // second comment
  }`),
  ).toBe(`{
    "a": 1, 
    "b": 2  
  }`);
});

test("removes multi-line comments", () => {
  expect(fixJson('{"a": 1} /* comment */')).toBe('{"a": 1} ');
  expect(fixJson("/* start */ {a: 1} /* end */")).toBe(' {"a": 1} ');
  expect(
    fixJson(`{
    /* multi
       line
       comment */
    "a": 1
  }`),
  ).toBe(`{
    
    "a": 1
  }`);
});

test("handles multiple fixes together", () => {
  expect(
    fixJson(`{
    foo: 1, // unquoted key with comment
    bar: 2, /* and multi-line comment */
    baz: [
      3,
      4, // trailing comma in array
    ],
  }`),
  ).toBe(`{
    "foo": 1, 
    "bar": 2, 
    "baz": [
      3,
      4 
    ]
  }`);
});

test("handles nested objects", () => {
  expect(
    fixJson(`{
    outer: {
      inner: {
        value: 42,
      },
    },
  }`),
  ).toBe(`{
    "outer": {
      "inner": {
        "value": 42
      }
    }
  }`);
});

test("preserves already quoted keys", () => {
  expect(fixJson('{"already": "quoted"}')).toBe('{"already": "quoted"}');
  expect(fixJson('{"foo": 1, bar: 2}')).toBe('{"foo": 1, "bar": 2}');
});

test("handles empty structures", () => {
  expect(fixJson("{}")).toBe("{}");
  expect(fixJson("[]")).toBe("[]");
  expect(fixJson("{,}")).toBe("{}");
  expect(fixJson("[,]")).toBe("[]");
});

test("complex real-world example", () => {
  const input = `{
    // Room configuration
    type: "switch", /* switch type */
    config: {
      initialSetting: "left", // default position
      modifies: [
        {
          expectType: "block",
          targets: ["block1", "block2",], // trailing comma
          makesStable: true,
        },
      ],
    },
  }`;

  const expected = `{
    
    "type": "switch", 
    "config": {
      "initialSetting": "left", 
      "modifies": [
        {
          "expectType": "block",
          "targets": ["block1", "block2"], 
          "makesStable": true
        }
      ]
    }
  }`;

  expect(fixJson(input)).toBe(expected);
});

test("is a no-op for well-formed JSON", () => {
  const wellFormedJson = `{
  "type": "switch",
  "position": {
    "x": 10,
    "y": 20,
    "z": 0
  },
  "config": {
    "initialSetting": "left",
    "modifies": [
      {
        "expectType": "block",
        "targets": ["block1", "block2"],
        "makesStable": true
      },
      {
        "expectType": "monster",
        "targets": ["monster1"],
        "leftState": {
          "activated": false
        },
        "rightState": {
          "activated": true,
          "everActivated": true
        }
      }
    ]
  },
  "nested": {
    "arrays": [1, 2, 3],
    "objects": {
      "deep": {
        "value": "test string"
      }
    },
    "booleans": true,
    "nulls": null,
    "numbers": 42.5
  }
}`;

  // Should remain exactly the same
  expect(fixJson(wellFormedJson)).toBe(wellFormedJson);

  // Also test with minified JSON
  const minifiedJson = '{"a":1,"b":{"c":[1,2,3]},"d":"string"}';
  expect(fixJson(minifiedJson)).toBe(minifiedJson);
});

test.fails("preserves comment patterns inside strings", () => {
  // This documents the known limitation mentioned in the function comment
  // The test fails because comment patterns inside strings are incorrectly stripped
  const jsonWithCommentInString = '{"value": "has // comment inside"}';
  expect(fixJson(jsonWithCommentInString)).toBe(jsonWithCommentInString);

  const jsonWithBlockCommentInString = '{"value": "has /* block */ inside"}';
  expect(fixJson(jsonWithBlockCommentInString)).toBe(
    jsonWithBlockCommentInString,
  );
});
