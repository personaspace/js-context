import { makeContextKey } from "./makeContextKey";
import { IContextInterface, IDataContextInterface, IDataInterface } from "./types";

/**
 * Takes any data and processes it in reference to the context depending on
 * the type of data being passed and returns the contextualized data.
 *
 * **string**
 *
 * If an octothorpe (`#`) appears within the first 3 characters, then the string
 * is returned, otherwise everything before the `#` is contextualized using
 * [[makeContextKey]] and replaced with the new parameterized prefix.
 *
 * **plain object**
 *
 * Plain-object keys are first processed and replaced by `makeContextObject`,
 * before processing and mapping its values.
 *
 * **array**
 *
 * Array values are mapped with `makeContextObject`
 *
 * **Everything else**
 *
 * Any other value types other than what is above are simply returned without
 * change.
 *
 * ### Example
 * ```ts
 *  import { makeContextObject } from "@personaspace/context/makeContextObject";
 *
 *  const context = {"abc:": "https://example.com/test"};
 *  const object = {
 *      "https://example.com/test#name": "Sarai Pileo",
 *      "https://example.com/test#id": 7852345,
 *      "https://example.com/test#hasEmails": true,
 *      "https://example.com/test#emails": ["#/~198236"],
 *      "https://example.com/example#address": {
 *          "https://example.com/address#full": "..."
 *      }
 *  };
 *  const result = makeContextObject(context, object);
 * ```
 *
 * **Possible result of `console.log(result);`**
 * ```json
 *  {
 *      "abc:name": "Sarai Pileo",
 *      "abc:id": 7852345,
 *      "abc:hasEmails": true,
 *      "abc:emails": ["#/~198236"],
 *      "xwm:address": {
 *          "orx:full": "..."
 *      }
 *  }
 * ```
 *
 * **Possible result of `console.log(context);`**
 * ```json
 *  {
 *      "abc:": "https://example.com/test",
 *      "xwm:": "https://example.com/example",
 *      "oxr:": "https://example.com/address"
 *  }
 * ```
 *
 * @param data any The currently resolved data to contextualize.
 * @param context IContextInterface The initial context to use to contextualize data.
 * @returns The contextualized data
 */
export function makeContextObject(data: string, context: IContextInterface): string;
export function makeContextObject(data: number, context: IContextInterface): number;
export function makeContextObject(data: boolean, context: IContextInterface): boolean;
export function makeContextObject(data: IDataInterface, context: IContextInterface): IDataContextInterface;
export function makeContextObject(data: any[], context: IContextInterface): any[];
export function makeContextObject(data: any, context: IContextInterface): any {
    if (typeof data === "string") {
        if (data.indexOf("#") < 3) { return data; }
        const index = data.indexOf("#");
        const prefix = data.substr(0, index + 1);
        const prop = data.substr(index + 1);

        for (const key in context) {
            if (context[key] === prefix) {
                return `${key}${prop}`;
            }
        }

        return `${makeContextKey(context, prefix)}:${prop}`;
    } else if (Array.isArray(data)) {
        return data.map((d) => makeContextObject(d, context));
    } else if (typeof data !== "object") {
        return data;
    }

    const resolvedData: IDataInterface = {};
    Object.keys(data).map((key) => {
        const newKey = makeContextObject(key, context);
        resolvedData[newKey] = data[key];
        return newKey;
    }).forEach((key) => {
        resolvedData[key] = makeContextObject(resolvedData[key], context);
    });

    return resolvedData;
}
