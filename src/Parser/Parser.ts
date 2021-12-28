import { Node } from "../IntermediateRepresentation/Node";
import { RegularStringNode } from "../IntermediateRepresentation/RegularStringNode";
import { UnaryOperatorNode } from "../IntermediateRepresentation/UnaryOperatorNode";
import { BinaryOperatorNode } from "../IntermediateRepresentation/BinaryOperatorNode";
import { LexemeBuffer } from "../Lexer/LexemeBuffer";

import { OperandDetector } from "./OperandDetector";

import { NodeList } from "../IntermediateRepresentation/NodeList";
import { LexemeType } from "../Types/LexemeTypes";
import { Lexeme } from "../Lexer/Lexeme";

/**
 * Parser class preforms syntax analysis. 
 */
export class Parser {
    private lexemeList: LexemeBuffer;
    private nodeList: NodeList;
    private operandDerector: OperandDetector;

    constructor() {
        this.operandDerector = new OperandDetector();
    }

    /**
     * Run syntax alanyzing process
     * @param lexemeList list of lexemes reviced from lexer
     * @returns intermediate representation of expression
     */
    public analyze(lexemeList: LexemeBuffer): NodeList {
        this.nodeList = new NodeList();

        this.lexemeList = lexemeList;

        if(this.lexemeList.length() > 0) {
            this.nodeList = this.parse(this.lexemeList);
        }

        return this.nodeList;
    }

    /**
     * Parse an expression
     * @param lexemeList list of lexems
     * @param currentLexemeIndex index of current lexem that is under parsing (0 by default)
     * @param nodeList list of already parsed nodes (empty by default)
     * @returns list of parsed nodes
     */
    private parse(lexemeList: LexemeBuffer, currentLexemeIndex = 0, nodeList = new NodeList()): NodeList {
        let currentLexeme = lexemeList.get(currentLexemeIndex);

        if(currentLexeme.type == LexemeType.EOF) {
            return nodeList;
        }

        const node = this.parseLexeme(currentLexeme, lexemeList, currentLexemeIndex);
        
        if(node) {
            nodeList.add(node);
        }

        currentLexemeIndex ++;
        return this.parse(lexemeList, currentLexemeIndex, nodeList);
    }

    /**
     * Parse concrete lexeme
     * @param lexeme lexeme to parse
     * @param lexemeList full list of lexemes
     * @param currentLexemeIndex index of passed lexeme
     * @returns new node
     */
    private parseLexeme(lexeme: Lexeme, lexemeList: LexemeBuffer, currentLexemeIndex: number): Node {
        switch (lexeme.type as LexemeType) {
            case LexemeType.EOF:
                return ;

            case LexemeType.REGULAR_STRING:
                if(this.operandDerector.isNotOperand(lexemeList, currentLexemeIndex)) {
                    return this.createStringNode(lexeme);
                }
                break;
            case LexemeType.PLUS_OPERATOR:
            case LexemeType.MINUS_OPERATOR:
            case LexemeType.MUL_OPERATOR:
            case LexemeType.EQUAL_OPERATOR:
                return this.createStringNode(lexeme);
            case LexemeType.DIVISION_OPERATOR:
                return this.handleBinaryOperator(lexeme, lexemeList, currentLexemeIndex);
            case LexemeType.POWER_OPERATOR:
                return this.handleUnaryOperator(lexeme, lexemeList, currentLexemeIndex);
            case LexemeType.LEFT_BRACKET:
                if(this.operandDerector.isNotOperand(lexemeList, currentLexemeIndex)) {
                    return this.createStringNode(lexeme);
                }
                break;
            case LexemeType.RIGTH_BRACKET:
                if(this.operandDerector.isNotOperand(lexemeList, currentLexemeIndex)) {
                    return this.createStringNode(lexeme);
                }
                break;
        }
    }

    /**
     * Create node that cotnains plain text. It is using for numbers, variable names, 0-arity operators ect.
     * @param currentLexeme lexeme for node creation
     * @returns new node
     */
    private createStringNode(currentLexeme: Lexeme): Node {
        return new RegularStringNode(currentLexeme.value);
    }

    private handleBinaryOperator(currentLexeme: Lexeme, lexemeList: LexemeBuffer, index: number): Node {
        const leftHandSideOperandLexeme = lexemeList.get(index - 1);
        const leftHandSideOperand = this.parse(this.getSubexpression(leftHandSideOperandLexeme, lexemeList, index - 1));

        const rightHandSideOperandLexeme = lexemeList.get(index + 1);
        const rightHandSideOperand = this.parse(this.getSubexpression(rightHandSideOperandLexeme, lexemeList, index + 1));

        const binaryOperatorNode = new BinaryOperatorNode(currentLexeme.value, currentLexeme.type);
        binaryOperatorNode.leftHandSideOperand = leftHandSideOperand.get(0);
        binaryOperatorNode.rightHandSideOperand = rightHandSideOperand.get(0);

        return binaryOperatorNode;
    }

    private handleUnaryOperator(currentLexeme: Lexeme, lexemeList: LexemeBuffer, index: number): Node {
        const operandLexeme = lexemeList.get(index + 1);
        const operandNode = this.parse(this.getSubexpression(operandLexeme, lexemeList, index + 1));

        const unaryOperator = new UnaryOperatorNode(currentLexeme.value, currentLexeme.type);
        unaryOperator.operand = operandNode.get(0);

        return unaryOperator;
    }

    private getSubexpression(currentLexeme: Lexeme, lexemeList: LexemeBuffer, index: number): LexemeBuffer {
        const subexpression = new LexemeBuffer();
        const eof = new Lexeme(LexemeType.EOF, ' ', 0);

        if(currentLexeme.type != LexemeType.LEFT_BRACKET && currentLexeme.type != LexemeType.RIGTH_BRACKET) {
            subexpression.add(currentLexeme);
        }

        subexpression.add(eof);

        return subexpression;
    }
}