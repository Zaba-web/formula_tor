import { Node } from "./Node";
import { LexemeType } from "../Types/LexemeTypes";
import { NodeList } from "./NodeList";

export class BinaryOperatorNode extends Node {
    private _leftHandSideOperand: NodeList;
    private _rightHandSideOperand: NodeList;

    constructor(value: string, type: LexemeType, lhsOperand?: NodeList, rhsOperand?: NodeList) {
        super(value, type);
        this._arity = 2;

        if(lhsOperand && rhsOperand) {
            this.leftHandSideOperand = lhsOperand;
            this.rightHandSideOperand = rhsOperand;
        }
    }

    public get leftHandSideOperand()  {
        return this._leftHandSideOperand;
    }

    public get rightHandSideOperand() {
        return this._rightHandSideOperand;
    }

    public set leftHandSideOperand(operand: NodeList) {
        this._leftHandSideOperand = operand;
    }

    public set rightHandSideOperand(operand: NodeList) {
        this._rightHandSideOperand = operand;
    }
}