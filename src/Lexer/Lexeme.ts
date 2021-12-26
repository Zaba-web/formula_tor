import { LexemeType } from "../Types/LexemeTypes";

/**
 * This class represents a single lexeme
 */
export class Lexeme {
    private _type: LexemeType;
    private _value: string;
    private _arity: number;

    /**
     * Create new lexeme
     * @param type one of allowed lexeme types
     * @param value textual representation of lexeme (sign of operator or static part of expression)
     */
    constructor(type: LexemeType, value: string, arity: number) {
        this._type = type;
        this._value = value;
        this._arity = arity;
    }

    public get type() {
        return this._type;
    }

    public get value() {
        return this._value;
    }

    public get arity() {
        return this._arity;
    }
}