import { Node } from "./Node";
import { LexemeType } from "../Types/LexemeTypes";
import { NodeList } from "./NodeList";

export class UnaryOperatorNode extends Node {
    private _operand: NodeList

    constructor(value: string, type: LexemeType, operand?: NodeList) {
        super(value, type);
        this._arity = 1;

        if(operand) {
            this.operand = operand;
        }
    }

    public set operand(revicedOperand: NodeList) {
        this._operand = revicedOperand;
    }

    public get operand() {
        return this._operand;
    }
}