declare interface ContextInterface {
    [key: string]: string
}

declare interface DataInterface {
    [key: string]: any
}

declare interface DataContextInterface {
    data: DataInterface,
    context: ContextInterface
}
