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
    'DefInt': FunctionDescription
}

const FunctionTable = {
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
    }
}

export {FunctionTable, IFunctionTable}