interface FunctionDescription {
    argCount: number
}

interface IFunctionTable {
    'Root': FunctionDescription
}

const FunctionTable = {
    'Root': {
        argCount: 2
    }
}

export {FunctionTable, IFunctionTable}