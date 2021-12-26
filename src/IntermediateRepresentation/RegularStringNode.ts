import { LexemeType } from "../Types/LexemeTypes";
import { Node } from "./Node";

export class RegularStringNode extends Node {
    constructor(value: string) {
        super(value, LexemeType.REGULAR_STRING);
        this._arity = 0;
    }
}