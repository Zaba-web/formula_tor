import { NodeList } from "../IntermediateRepresentation/NodeList";
import { Node } from "../IntermediateRepresentation/Node";
import { BinaryOperatorNode } from "../IntermediateRepresentation/BinaryOperatorNode";
import { LexemeType } from "../Types/LexemeTypes";

/**
 * TEMPORARY PLACEHOLDER CODE
 */
export class Visualizer {
    output: string;

    constructor(outputSelector: string) {
        this.output = outputSelector; 
    }

    public visualize(nodeList: NodeList) {
        let result = `<div style='display: flex; align-items: center; height: auto;'>`;

        const nodes = nodeList.toArray();

        for(let i = 0; i < nodes.length; i ++) {
            switch(nodes[i].type) {
                case LexemeType.PLUS_OPERATOR:
                case LexemeType.MINUS_OPERATOR:
                case LexemeType.MUL_OPERATOR:
                case LexemeType.EQUAL_OPERATOR:
                case LexemeType.REGULAR_STRING:
                    result += `<div style='margin: 0 4px'> ${nodes[i].value} </div>`;
                    break;
                case LexemeType.DIVISION_OPERATOR:
                    let divNode = nodes[i] as BinaryOperatorNode;
                    result += `
                        <div style='display: flex; flex-direction: column; margin: 0 4px'> 
                            <div style='width: 100%; padding: 0px 10px'>${divNode.leftHandSideOperand.value}</div>
                            <div style='height: 1px; width: 100%; background: #000'></div>
                            <div style='width: 100%; padding: 0px 10px'>${divNode.rightHandSideOperand.value}</div>
                        </div>
                    `;
                    break;
            }
        }

        result += `</div>`;

        document.querySelector(this.output).innerHTML = result;
    }
}