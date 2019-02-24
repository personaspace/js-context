import { IDataInterface } from "./types";

/**
 * Takes a string and determines if it is a reference to a root property of
 * the resource data. IF so, it returns the value of that property. Otherwise,
 * it returns the string.
 *
 * ### Example
 * ```ts
 *  import { resolveRootReference } from "@personaspace/context/resolveRootReference"
 *
 *  const data = {
 *      "https://example.com/contact#email": ["#/~982644"]
 *      "~982644": "e@example.com"
 *  };
 *  const resolved = resolveRootReference("#/~986244", data)
 *  //  resolved will be "e@example.com"
 * ```
 *
 * @param data string The string data to check for reference to root data.
 * @param root IDataInterface The root data to reference.
 * @returns The referenced data or the string, if not a reference.
 */
export function resolveRootReference(data: string, root: IDataInterface) {
    const rootItem = data.substr(2);
    if (root[rootItem]) { return root[rootItem]; }

    return data;
}
