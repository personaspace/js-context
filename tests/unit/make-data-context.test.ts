import intern from "intern";

import { makeDataContext } from "../../src";

const { registerSuite } = intern.getInterface("object");
const { assert } = intern.getPlugin("chai");

registerSuite("makeDataContext(data, context)", () => {
  const ID = "https://schema.personaspace.com/identity#";
  const LOC = "https://schema.personaspace.com/location#";
  const TEST = "https://example.com/schema/test#";
  const id = "id:";
  const loc = "loc:";
  const testContext: any = {
    [id]: ID,
    [loc]: LOC,
  };

  const testData: any = {
    [`${ID}name`]: "Eric L. Bentley",
    [`${ID}id`]: 9467815246,
    [`${ID}hasEmails`]: true,
    [`${ID}emails`]: [ "#/~12345", "#/~67890" ],
    [`${ID}url`]: "#/profile",
    "~12345": "ebntly@example.com",
    "~67890": "e@example.com",
    [`${ID}address`]: {
      [`${LOC}street`]: "12345 Main St",
      [`${LOC}city`]: "Hometown",
      [`${LOC}state`]: "LA",
      [`${LOC}zip`]: "98765-4321",
    },
    [`${TEST}word`]: "Hello, world",
  };

  return {
    "accepts valid data and context"() {
      assert.doesNotThrow(() => makeDataContext(testData, testContext));
    },
    "=> {data, context}": (() => {
      const { data, context } = makeDataContext(testData, testContext);
      const randomKeys = Object.keys(context).filter((key) => [id, loc].indexOf(key) === -1);

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
            assert.lengthOf(randomKeys, 1);
            assert.equal(context[randomKeys[0]], TEST);
          },
          "data defined mappings"() {
            assert.equal(data[`${id}name`], "Eric L. Bentley");
            assert.equal(testData[`${ID}name`], "Eric L. Bentley");
            assert.equal(data[`${id}name`], testData[`${ID}name`]);

            assert.equal(data[`${id}id`], 9467815246);
            assert.equal(testData[`${ID}id`], 9467815246);
            assert.equal(data[`${id}id`], testData[`${ID}id`]);

            assert.equal(data[`${id}hasEmails`], true);
            assert.equal(testData[`${ID}hasEmails`], true);
            assert.equal(data[`${id}hasEmails`], testData[`${ID}hasEmails`]);

            assert.equal(data[`${id}url`], "#/profile");
            assert.equal(testData[`${ID}url`], "#/profile");
            assert.equal(data[`${id}url`], testData[`${ID}url`]);

            assert.lengthOf(data[`${id}emails`], 2);
            assert.lengthOf(testData[`${ID}emails`], 2);
            assert.equal(data[`${id}emails`][0], "#/~12345");
            assert.equal(testData[`${ID}emails`][0], "#/~12345");
            assert.equal(data[`${id}emails`][0], testData[`${ID}emails`][0]);
            assert.equal(data[`${id}emails`][1], "#/~67890");
            assert.equal(testData[`${ID}emails`][1], "#/~67890");
            assert.equal(data[`${id}emails`][1], testData[`${ID}emails`][1]);

            assert.lengthOf(Object.keys(data[`${id}address`]), 4);
            assert.lengthOf(Object.keys(testData[`${ID}address`]), 4);
            assert.equal(data[`${id}address`][`${loc}street`], "12345 Main St");
            assert.equal(testData[`${ID}address`][`${LOC}street`], "12345 Main St");
            assert.equal(data[`${id}address`][`${loc}street`], testData[`${ID}address`][`${LOC}street`]);
          },
          "data random mappings"() {
            assert.equal(data[`${randomKeys[0]}word`], "Hello, world");
            assert.equal(testData[`${TEST}word`], "Hello, world");
            assert.equal(data[`${randomKeys[0]}word`], testData[`${TEST}word`]);
          },
        },
      };
    })(),
  };
});
