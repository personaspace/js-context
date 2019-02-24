/**
 * An object representing the context that data should be resolved or built.
 * A context is used in an attempt to reduce the file size by parameterizing
 * schema URLs up to the hash.
 */
export interface IContextInterface {
    /**
     * A key/value pair representing the parameterized schema URL (key) mapping
     * to its full schema URL (value).
     */
    [key: string]: string;
}
/**
 * An object representing the data of a resource. It can represent either a
 * resolved or contextualized data object.
 */
export interface IDataInterface {
    /**
     * A key/value pair representing a property value identified by its schema
     * URL, parameterized (contextual) or full (resolved).
     */
    [key: string]: any;
}
/**
 * An object representing a contextualized data object, with the context
 * ([[ContextInterface]]) it was created in.
 */
export interface IDataContextInterface {
    /**
     * The context that the data in the property `data` was contextualized in.
     */
    context: IContextInterface;
    /**
     * The data of a resource that was contextualized by the context stored in
     * the property `context`.
     */
    data: IDataInterface;
}
//# sourceMappingURL=types.d.ts.map