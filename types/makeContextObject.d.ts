import { IContextInterface, IDataContextInterface, IDataInterface } from "./types";
export declare function makeContextObject(data: string, context: IContextInterface): string;
export declare function makeContextObject(data: number, context: IContextInterface): number;
export declare function makeContextObject(data: boolean, context: IContextInterface): boolean;
export declare function makeContextObject(data: IDataInterface, context: IContextInterface): IDataContextInterface;
export declare function makeContextObject(data: any[], context: IContextInterface): any[];
//# sourceMappingURL=makeContextObject.d.ts.map