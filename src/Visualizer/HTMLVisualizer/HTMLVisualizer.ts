import { BinaryOperatorNode } from "../../IntermediateRepresentation/BinaryOperatorNode";
import { FunctionNode } from "../../IntermediateRepresentation/FunctionNode";
import { NodeList } from "../../IntermediateRepresentation/NodeList";
import { UnaryOperatorNode } from "../../IntermediateRepresentation/UnaryOperatorNode";
import { hasSomeParentTheClass } from "../../utils/utils";
import { IVisualizer } from "../IVisualizer";
import { NodesMarkupGenerator } from "./NodesMarkupGenerator";

import "./Styles/style.css";

/**
 * Use HTML markup to visualize expression
 */
export class HTMLVisualizer implements IVisualizer {
    private container: HTMLDivElement;

    constructor(container: HTMLElement) {
        this.setOutput(container);
    }

    /**
     * Set HTML Element as output container
     * @param container DOM element
     */
    setOutput (container: HTMLElement): void  {
        this.container = container as HTMLDivElement;
    }

    /**
     * Visualize expression
     * @param intermediateRepresentation list of parsed nodes
     */
    public visualize(intermediateRepresentation: NodeList): void {
        let resultMarkup: string = `
            <div class='__formulator_formula_container_wrapper'>
            <div class='__formulator_formula_container'>
        `;

        resultMarkup += this.getMarkup(intermediateRepresentation);

        resultMarkup += `</div></div>`;

        this.container.innerHTML = resultMarkup;

        this.adjustBracketsHeight();
        this.adjustTopIndexes();
        this.adjustDivisionExpressionPosition();
    }

    private getMarkup(nodeList: NodeList): string {
        const nodes = nodeList.toArray();
        let result: string = '';

        nodes.forEach(node => {
            switch (node.value) {
                case '^': 
                    const powerOperator = node as UnaryOperatorNode;
                    result += NodesMarkupGenerator.topIndexNodeMarkup(this.getMarkup(powerOperator.operand));
                    break;
                case '_': 
                    const bottomIndex = node as UnaryOperatorNode;
                    result += NodesMarkupGenerator.bottomIndexNodeMarkup(this.getMarkup(bottomIndex.operand));
                    break;
                case '-':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('−');
                    break;
                case '*':
                    result += NodesMarkupGenerator.regularStringNodeMarkup("⋅");
                    break;
                case ')':
                    result += NodesMarkupGenerator.rightBracketMarkup();
                    break;
                case '(':
                    result += NodesMarkupGenerator.leftBracketMarkup();
                    break;
                case '|':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('│');
                    break;
                case '/':
                    const divisionOperator = node as BinaryOperatorNode;
                    result += NodesMarkupGenerator.divisionMarkup(
                        this.getMarkup(divisionOperator.leftHandSideOperand),
                        this.getMarkup(divisionOperator.rightHandSideOperand)
                    );
                    break;
                case 'Root':
                    const rootFunction = node as FunctionNode;
                    result += NodesMarkupGenerator.rootMarkup(
                        this.getMarkup(rootFunction.argumentsList[0]),
                        this.getMarkup(rootFunction.argumentsList[1])
                    );
                    break;
                case 'Log':
                    const logFunction = node as FunctionNode;
                    result += NodesMarkupGenerator.logMarkup(
                        this.getMarkup(logFunction.argumentsList[0]),
                        this.getMarkup(logFunction.argumentsList[1])
                    );
                    break;
                case 'System2':
                    const systemFunction = node as FunctionNode;
                    result += NodesMarkupGenerator.systemMarkup(
                        this.getMarkup(systemFunction.argumentsList[0]),
                        this.getMarkup(systemFunction.argumentsList[1])
                    );
                    break;
                case 'System3':
                    const system3Function = node as FunctionNode;
                    result += NodesMarkupGenerator.systemMarkup(
                        this.getMarkup(system3Function.argumentsList[0]),
                        this.getMarkup(system3Function.argumentsList[1]),
                        this.getMarkup(system3Function.argumentsList[2])
                    );
                    break;
                case 'System4':
                    const system4Function = node as FunctionNode;
                    result += NodesMarkupGenerator.systemMarkup(
                        this.getMarkup(system4Function.argumentsList[0]),
                        this.getMarkup(system4Function.argumentsList[1]),
                        this.getMarkup(system4Function.argumentsList[2]),
                        this.getMarkup(system4Function.argumentsList[3])
                    );
                    break;
                case 'IndefInt':
                    const indefInt = node as FunctionNode;
                    result += NodesMarkupGenerator.indefIntMarkup(
                        this.getMarkup(indefInt.argumentsList[0])
                    );
                    break;
                case 'DefInt':
                    const defInt = node as FunctionNode;
                    result += NodesMarkupGenerator.defIntMarkup(
                        this.getMarkup(defInt.argumentsList[0]),
                        this.getMarkup(defInt.argumentsList[1]),
                        this.getMarkup(defInt.argumentsList[2])
                    );
                    break;
                case 'IntLine':
                    const intLine = node as FunctionNode;
                    result += NodesMarkupGenerator.intLineMarkup(
                        this.getMarkup(intLine.argumentsList[0]),
                        this.getMarkup(intLine.argumentsList[1])
                    );
                    break;
                case 'Lim':
                    const limit = node as FunctionNode;
                    result += NodesMarkupGenerator.limitMarkup(
                        this.getMarkup(limit.argumentsList[0]),
                        this.getMarkup(limit.argumentsList[1]),
                        this.getMarkup(limit.argumentsList[2])
                    );
                    break;
                case 'Indexes':
                    const indexes = node as FunctionNode;
                    result += NodesMarkupGenerator.twoIndexMarkup(
                        this.getMarkup(indexes.argumentsList[0]),
                        this.getMarkup(indexes.argumentsList[1]),
                    );
                    break;
                case 'Sum':
                    const sumFunction = node as FunctionNode;
                    result += NodesMarkupGenerator.sumMarkup(
                        this.getMarkup(sumFunction.argumentsList[0]),
                        this.getMarkup(sumFunction.argumentsList[1]),
                        this.getMarkup(sumFunction.argumentsList[2])
                    );
                    break;
                case 'Vec':
                    const vecFunc = node as FunctionNode;
                    result += NodesMarkupGenerator.vecMarkup(
                        this.getMarkup(vecFunc.argumentsList[0])
                    );
                    break;
                case 'ALPHA':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('α');
                    break;
                case 'BETA':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('β');
                    break;
                case 'GAMMA':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('γ');
                    break;
                case 'DELTA':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('Δ');
                    break;
                case 'DELTASM':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('δ');
                    break;
                case 'PI':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('π');
                    break;
                case 'PHI':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('φ');
                    break;
                case 'f':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('𝑓');
                    break;
                case 'DEG':
                    result += NodesMarkupGenerator.topIndexNodeMarkup(NodesMarkupGenerator.regularStringNodeMarkup('°'));
                    break;
                case 'INFINITY':
                    result += NodesMarkupGenerator.regularStringNodeMarkup('∞');
                    break;
                default:
                    result += NodesMarkupGenerator.regularStringNodeMarkup(node.value);
                    break;
            }
        });

        return result;
    }

    /**
     * Set proper height offset for top indexes
     */
    private adjustTopIndexes() {
        const topIndexes = this.container.children[0].children[0].querySelectorAll('.__formulator_topIndex');

        topIndexes.forEach(element => {
            if(element.children[0].classList.contains('__formulator_divisionContainer')) {
                (element as HTMLElement).style.bottom = `${(element.previousElementSibling as HTMLElement).offsetHeight / 1.8}px`;
            } else {
                (element as HTMLElement).style.height = `${(element.previousElementSibling as HTMLElement).offsetHeight + (element as HTMLElement).offsetHeight}px`;
            }
        });
    }

    /**
     * Set proper height for left brackets according to the following element
     */
    private adjustBracketsHeight() {
        const leftBrackets = this.container.children[0].children[0].querySelectorAll('.__formulator_leftBracket');
        
        leftBrackets.forEach(element => {
            (element as HTMLElement).style.height = `${element.nextElementSibling.clientHeight}px`;
        });

        this.justifyBracketsSizes();
    }

    /**
     * Set proper height for right brackets according to the left bracket respectively
     */
    private justifyBracketsSizes() {
        const allBrackets = this.container.children[0].children[0].querySelectorAll('.__formulator_bracket');

        for (let i = 0; i < allBrackets.length; i++) {
            if(allBrackets[i].classList.contains('__formulator_leftBracket')) {
                let bracketCounter = 1;
                
                for(let j = i + 1; j < allBrackets.length; j++) {

                    if(allBrackets[j].classList.contains('__formulator_leftBracket')) bracketCounter++;
                    if(allBrackets[j].classList.contains('__formulator_rightBracket')) bracketCounter--;

                    if(bracketCounter == 0) {
                        (allBrackets[j] as HTMLElement).style.height = `${allBrackets[i].clientHeight}px`;
                        break;
                    }
                }
            }
        }
    }

    private adjustDivisionExpressionPosition() {
        const allFractions = this.container.children[0].children[0].querySelectorAll('.__formulator_divisionContainer');

        allFractions.forEach(element => {
            const fractionsParts = element.children;

            if(!hasSomeParentTheClass(element as HTMLElement, "__formulator_divisionContainer")) {
                if(fractionsParts[0].clientHeight < fractionsParts[2].clientHeight) {
                    (fractionsParts[0] as HTMLElement).style.paddingTop = `${fractionsParts[2].clientHeight - fractionsParts[0].clientHeight}px`;
                } else if (fractionsParts[0].clientHeight > fractionsParts[2].clientHeight) {
                    (fractionsParts[2] as HTMLElement).style.paddingBottom = `${fractionsParts[0].clientHeight - fractionsParts[2].clientHeight}px`;
                }
            }
        });
    }
}