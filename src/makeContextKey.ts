import { IContextInterface } from "./types";

/**
 * Takes a context interface and returns randomly generated parameter key for the
 * schema URL and adds it to the current context being processed, mapping the
 * newly genereated key to the schema URL.
 *
 * ### Example
 * ```ts
 *  import { makeContextKey } from "@personaspace/context/makeContextKey";
 *
 *  const context = {"abc:": "https://example.com/test"};
 *  makeContextKey(context, "https://example.com/example");
 * ```
 *
 * **Possible result of `console.log(context);`**
 * ```json
 *  {
 *      "abc:": "https://example.com/test",
 *      "dha:": "https://example.com/example"
 *  }
 * ```
 *
 * @param context IContextInterface The current context being processed.
 * @param mapTo string The schema URL to parameterize.
 * @returns The newly generated parameter key.
 */
export function makeContextKey(context: IContextInterface, mapTo: string): string {
    const key = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 3);
    /* istanbul ignore if Cannot test randomness */
    if (context[key]) {
        return makeContextKey(context, mapTo);
    }
    context[`${key}:`] = mapTo;
    return key;
}
