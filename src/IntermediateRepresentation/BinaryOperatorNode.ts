import { Node } from "./Node";
import { LexemeType } from "../Types/LexemeTypes";

export class BinaryOperatorNode extends Node {
    private _leftHandSideOperand: Node;
    private _rightHandSideOperand: Node;

    constructor(value: string, type: LexemeType) {
        super(value, type);
        this._arity = 2;
    }

    public get leftHandSideOperand()  {
        return this._leftHandSideOperand;
    }

    public get rightHandSideOperand() {
        return this._rightHandSideOperand;
    }

    public set leftHandSideOperand(operand: Node) {
        this._leftHandSideOperand = operand;
    }

    public set rightHandSideOperand(operand: Node) {
        this._rightHandSideOperand = operand;
    }
}