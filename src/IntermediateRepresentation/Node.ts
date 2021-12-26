import { LexemeType } from "../Types/LexemeTypes";

/**
 * Base representation of single node of intermediate representation
 */
export class Node {
    private _value: string;
    private _type: LexemeType;
    protected _arity: number

    constructor(value: string, type: LexemeType) {
        this._value = value;
        this._type = type;
    }

    public get value() {
        return this._value;
    }

    public get type() {
        return this._type;
    }

    public get arity() {
        return this._arity;
    }
}