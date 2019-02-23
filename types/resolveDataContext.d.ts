import { IContextInterface } from "./types";
/**
 * Takes contextualized resource data and a context and resolves the data to use fulle schema URLs.
 *
 * **Example**
 * ```ts
 *  import { resolveDataContext } from "@personaspace/context"
 *
 *  const data = {
 *      "id:name": "Eric L. Bentley",
 *      "id:id": 9467815246,
 *      "id:hasEmails": true,
 *      "id:emails": [ "#/~12345", "#/~67890" ],
 *      "id:url": "#/profile",
 *      "~12345": "ebntly@example.com",
 *      "~67890": "e@example.com",
 *      "id:address": {
 *          "loc:street": "12345 Main St",
 *          "loc:city": "Hometown",
 *          "loc:state": "LA",
 *          "loc:zip": "98765-4321"
 *      },
 *      "kwn:word": "Hello, world"
 *  }
 *
 *  const context = {
 *      "id:": "https://schema.personaspace.com/identity#",
 *      "loc:": "https://schema.personaspace.com/location#",
 *      "kwn:": "https://example.com/schema/test#"
 *  }
 *
 *  const result = resolveDataContext(data, context)
 * ```
 *
 * **Result of `console.log(result)`**
 * ```json
 * Example result
 *  {
 *      "https://schema.personaspace.com/identity#name": "Eric L. Bentley",
 *      "https://schema.personaspace.com/identity#id": 9467815246,
 *      "https://schema.personaspace.com/identity#hasEmails": true,
 *      "https://schema.personaspace.com/identity#emails": [
 *          "ebntly@example.com",
 *          "e@example.com"
 *      ],
 *      "https://schema.personaspace.com/identity#url": "#/profile",
 *      "~12345": "ebntly@example.com",
 *      "~67890": "e@example.com",
 *      "https://schema.personaspace.com/identity#address": {
 *          "https://schema.personaspace.com/location#street": "12345 Main St",
 *          "https://schema.personaspace.com/location#city": "Hometown",
 *          "https://schema.personaspace.com/location#state": "LA",
 *          "https://schema.personaspace.com/location#zip": "98765-4321"
 *      },
 *      "https://example.com/schema/test#word": "Hello, world"
 *  }
 * ```
 * @param data IDataInterface The contextualized data to resolve.
 * @param context IContextInterface The context to use to resolve the data with.
 * @param root IDataInterface The root data that reference data may be stored.
 * @returns The resolved data.
 */
export declare const resolveDataContext: (data: any, context: IContextInterface, root?: any) => any;
//# sourceMappingURL=resolveDataContext.d.ts.map