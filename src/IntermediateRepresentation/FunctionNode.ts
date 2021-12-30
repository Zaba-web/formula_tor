import { Node } from "./Node";
import { LexemeType } from "../Types/LexemeTypes";
import { NodeList } from "./NodeList";

export class FunctionNode extends Node {
    private _arguments: NodeList[];

    constructor(value: string, type: LexemeType, arity: number, args?:NodeList[]) {
        super(value, type);
        this._arity = arity;

        if(args) {
            this.arguments = args;
        }
    }

    set arguments(args: NodeList[]) {
        this._arguments = args;
    }

    get argumentsList() {
        return this._arguments;
    }
}