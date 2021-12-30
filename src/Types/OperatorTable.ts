import { LexemeType } from "./LexemeTypes"

interface OperatorDescription {
    type: LexemeType,
    arity: number
}

interface IOperatorTable {
    '+': OperatorDescription,
    '-': OperatorDescription,
    '*': OperatorDescription,
    '=': OperatorDescription,
    '<': OperatorDescription,
    '>': OperatorDescription,
    '/': OperatorDescription,
    '^': OperatorDescription,
    '_': OperatorDescription,
    '(': OperatorDescription,
    ')': OperatorDescription,
    ',': OperatorDescription,
    '|': OperatorDescription
}

// According to the goal of library to visualize math expression, 
// not to calculate, we have no need to consider +, -, * and = 
// as binary operators, because they does not change look of the formula

const OperatorTable: IOperatorTable = {
    '+': {
        type: LexemeType.REGULAR_STRING,
        arity: 0
    },
    '-': {
        type: LexemeType.REGULAR_STRING,
        arity: 0
    },
    '*': {
        type: LexemeType.REGULAR_STRING,
        arity: 0
    },
    '=': {
        type: LexemeType.REGULAR_STRING,
        arity: 0
    },    
    '>': {
        type: LexemeType.REGULAR_STRING,
        arity: 0
    },
    '<': {
        type: LexemeType.REGULAR_STRING,
        arity: 0
    },
    '/': {
        type: LexemeType.BINARY_OPERATOR,
        arity: 2
    },
    '^': {
        type: LexemeType.UNARY_OPERATOR,
        arity: 1
    },
    '_': {
        type: LexemeType.UNARY_OPERATOR,
        arity: 1
    },
    '(': {
        type: LexemeType.LEFT_BRACKET,
        arity: 0
    },
    ')': {
        type: LexemeType.RIGHT_BRACKET,
        arity: 0
    },
    '|': {
        type: LexemeType.REGULAR_STRING,
        arity: 0
    },
    ',': {
        type: LexemeType.COMA_SEPARATOR,
        arity: 0
    },
}

export {OperatorTable, IOperatorTable}