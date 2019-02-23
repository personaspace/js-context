import { IContextInterface, IDataContextInterface, IDataInterface } from "./types";
/**
 * Takes resource data and a context and contextualizes the data, adding random
 * contexts for schema URLs not mapped, and returns the contextualized resource
 * data and the complete context the data was contextualized with as a
 * [[IDataContextInterface]].
 *
 * **Example**
 * ```ts
 *  import { makeDataContext } from "@personaspace/context"
 *
 *  const data = {
 *      "https://schema.personaspace.com/identity#name": "Eric L. Bentley",
 *      "https://schema.personaspace.com/identity#id": 9467815246,
 *      "https://schema.personaspace.com/identity#hasEmails": true,
 *      "https://schema.personaspace.com/identity#emails": [
 *          "#/~12345",
 *          "#/~67890"
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
 *
 *  const context = {
 *      "id:": "https://schema.personaspace.com/identity#",
 *      "loc:": "https://schema.personaspace.com/location#"
 *  }
 *
 *  const result = makeDataContext(data, context)
 * ```
 *
 * **Result of `console.log(result)`**
 * ```json
 *  {
 *      data: {
 *          "id:name": "Eric L. Bentley",
 *          "id:id": 9467815246,
 *          "id:hasEmails": true,
 *          "id:emails": [ "#/~12345", "#/~67890" ],
 *          "id:url": "#/profile",
 *          "~12345": "ebntly@example.com",
 *          "~67890": "e@example.com",
 *          "id:address": {
 *              "loc:street": "12345 Main St",
 *              "loc:city": "Hometown",
 *              "loc:state": "LA",
 *              "loc:zip": "98765-4321"
 *          },
 *          "xyh:word": "Hello, world"
 *      },
 *      context: {
 *          "id:": "https://schema.personaspace.com/identity#",
 *          "loc:": "https://schema.personaspace.com/location#",
 *          "xyh:": "https://example.com/schema/test#"
 *      }
 *  }
 * ```
 * @param data IDataInterface The data to contextualize with the `context` object.
 * @param context IContextInterface The context to use to contextualize the `data` with.
 * @returns The data-context object that contains the contextualized data and the context it was created in.
 */
export declare function makeDataContext(data: IDataInterface, context?: IContextInterface): IDataContextInterface;
//# sourceMappingURL=makeDataContext.d.ts.map