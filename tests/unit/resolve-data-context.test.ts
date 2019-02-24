import intern from "intern";

import { resolveDataContext } from "../../src";

const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");

registerSuite("resolveDataContext(data, context)", () => {
  const ID = "https://schema.personaspace.com/identity#";
  const LOC = "https://schema.personaspace.com/location#";
  const TEST = "https://example.com/schema/test#";
  const id = "id:";
  const loc = "loc:";
  const test = "kwn:";
  const context: any = {
    [id]: ID,
    [loc]: LOC,
    [test]: TEST,
  };

  const testData: any = {
    [`${id}name`]: "Eric L. Bentley",
    [`${id}id`]: 9467815246,
    [`${id}hasEmails`]: true,
    [`${id}emails`]: [ "#/~12345", "#/~67890" ],
    [`${id}url`]: "#/profile",
    "~12345": "ebntly@example.com",
    "~67890": "e@example.com",
    [`${id}address`]: {
      [`${loc}street`]: "12345 Main St",
      [`${loc}city`]: "Hometown",
      [`${loc}state`]: "LA",
      [`${loc}zip`]: "98765-4321",
    },
    [`${test}word`]: "Hello, world",
  };

  return {
    "accepts valid data and context"() {
      assert.doesNotThrow(() => resolveDataContext(testData, context));
    },
    "=> data": (() => {
      const data = resolveDataContext(testData, context);

      return {
        tests: {
          "context"() {
            assert.isObject(context);
            assert.lengthOf(Object.keys(context), 3);
          },
          "data"() {
            assert.isObject(data);
          },
          "context defined mappings"() {
            assert.equal(context[id], ID);
            assert.equal(context[loc], LOC);
          },
          "context random mappings"() {
            assert.equal(context[test], TEST);
          },
          "data defined mappings"() {
            assert.equal(data[`${ID}name`], "Eric L. Bentley");
            assert.equal(testData[`${id}name`], "Eric L. Bentley");
            assert.equal(data[`${ID}name`], testData[`${id}name`]);

            assert.equal(data[`${ID}id`], 9467815246);
            assert.equal(testData[`${id}id`], 9467815246);
            assert.equal(data[`${ID}id`], testData[`${id}id`]);

            assert.equal(data[`${ID}hasEmails`], true);
            assert.equal(testData[`${id}hasEmails`], true);
            assert.equal(data[`${ID}hasEmails`], testData[`${id}hasEmails`]);

            assert.equal(data[`${ID}url`], "#/profile");
            assert.equal(testData[`${id}url`], "#/profile");
            assert.equal(data[`${ID}url`], testData[`${id}url`]);

            assert.lengthOf(data[`${ID}emails`], 2);
            assert.lengthOf(testData[`${id}emails`], 2);
            assert.equal(data[`${ID}emails`][0], "ebntly@example.com");
            assert.equal(testData[`${id}emails`][0], "#/~12345");
            assert.equal(data[`${ID}emails`][0], testData[testData[`${id}emails`][0].substr(2)]);
            assert.equal(data[`${ID}emails`][1], "e@example.com");
            assert.equal(testData[`${id}emails`][1], "#/~67890");
            assert.equal(data[`${ID}emails`][1], testData[testData[`${id}emails`][1].substr(2)]);

            assert.lengthOf(Object.keys(data[`${ID}address`]), 4);
            assert.lengthOf(Object.keys(testData[`${id}address`]), 4);
            assert.equal(data[`${ID}address`][`${LOC}street`], "12345 Main St");
            assert.equal(testData[`${id}address`][`${loc}street`], "12345 Main St");
            assert.equal(data[`${ID}address`][`${LOC}street`], testData[`${id}address`][`${loc}street`]);
          },
          "data random mappings"() {
            assert.equal(data[`${TEST}word`], "Hello, world");
            assert.equal(testData[`${test}word`], "Hello, world");
            assert.equal(data[`${TEST}word`], testData[`${test}word`]);
          },
        },
      };
    })(),
  };
});
