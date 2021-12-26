import { Node } from "./Node";
import { LexemeType } from "../Types/LexemeTypes";

export class UnaryOperatorNode extends Node {
    private _operand: Node

    constructor(value: string, type: LexemeType) {
        super(value, type);
        this._arity = 1;
    }

    public set operand(revicedOperand: Node) {
        this._operand = revicedOperand;
    }

    public get operand() {
        return this._operand;
    }
}