interface FunctionDescription {
    argCount: number
}

interface IFunctionTable {
    'Root': FunctionDescription,
    'Log': FunctionDescription,
    'System2': FunctionDescription,
    'System3': FunctionDescription,
    'System4': FunctionDescription,
    'IndefInt': FunctionDescription,
    'DefInt': FunctionDescription,
    'Lim': FunctionDescription,
    'Indexes': FunctionDescription,
    'Sum': FunctionDescription
}

const FunctionTable: IFunctionTable = {
    'Root': {
        argCount: 2
    },
    'Log': {
        argCount: 2
    },
    'System2': {
        argCount: 2
    },
    'System3': {
        argCount: 3
    },
    'System4': {
        argCount: 4
    },
    'IndefInt': {
        argCount: 1
    },
    'DefInt': {
        argCount: 3
    },
    'Lim': {
        argCount: 3
    },
    'Indexes': {
        argCount: 2
    },
    'Sum': {
        argCount: 3
    }
}

export {FunctionTable, IFunctionTable}