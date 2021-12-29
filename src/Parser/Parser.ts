import { Node } from "../IntermediateRepresentation/Node";
import { RegularStringNode } from "../IntermediateRepresentation/RegularStringNode";
import { UnaryOperatorNode } from "../IntermediateRepresentation/UnaryOperatorNode";
import { BinaryOperatorNode } from "../IntermediateRepresentation/BinaryOperatorNode";
import { LexemeBuffer } from "../Lexer/LexemeBuffer";

import { OperandDetector } from "./OperandDetector";

import { NodeList } from "../IntermediateRepresentation/NodeList";
import { LexemeType } from "../Types/LexemeTypes";
import { Lexeme } from "../Lexer/Lexeme";
import { BracketsTracer } from "./BracketsTracer";
import { SubexpressionHandler } from "./SubexpressionHandler";

/**
 * Parser class preforms syntax analysis. 
 */
export class Parser {
    private lexemeList: LexemeBuffer;
    private nodeList: NodeList;
    private operandDetector: OperandDetector;
    private bracketTracer: BracketsTracer;
    private subexpressionHandler: SubexpressionHandler;

    constructor() {
        this.operandDetector = new OperandDetector();
        this.bracketTracer = new BracketsTracer();
        this.subexpressionHandler = new SubexpressionHandler(this.operandDetector, this.bracketTracer);
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
        const currentInSubexpression = currentLexemeIndex > lexemeList.subExpressionStart && currentLexemeIndex < lexemeList.subExpressionEnd;
        
        if (!currentInSubexpression) {
            let currentLexeme = lexemeList.get(currentLexemeIndex);

            if(currentLexeme.type == LexemeType.EOF) {
                return nodeList;
            }

            const node = this.parseLexeme(currentLexeme, lexemeList, currentLexemeIndex);
            
            if(node) {
                nodeList.add(node);
            }
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
                if(this.operandDetector.isNotOperand(lexemeList, currentLexemeIndex)) {
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
            case LexemeType.RIGHT_BRACKET:
                const bracketExpressionResult = this.handleBracketExpression(lexemeList, currentLexemeIndex, lexeme.type);
                
                if(bracketExpressionResult) {
                    return bracketExpressionResult;
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

    /**
     * Read and parses operands (previous and next lexemes or subexpressions) and create binary operator node with two leafs
     * @param currentLexeme 
     * @param lexemeList 
     * @param index index of current lexeme
     * @returns new node
     */
    private handleBinaryOperator(currentLexeme: Lexeme, lexemeList: LexemeBuffer, index: number): Node {
        const leftHandSideOperandLexeme = lexemeList.get(index - 1);
        const leftHandSideOperand = this.parse(this.subexpressionHandler.getSubexpression(leftHandSideOperandLexeme, lexemeList, index - 1));

        const rightHandSideOperandLexeme = lexemeList.get(index + 1);
        const rightHandSideOperand = this.parse(this.subexpressionHandler.getSubexpression(rightHandSideOperandLexeme, lexemeList, index + 1));

        const binaryOperatorNode = new BinaryOperatorNode(currentLexeme.value, currentLexeme.type, leftHandSideOperand, rightHandSideOperand);

        return binaryOperatorNode;
    }

    /**
     * Read operand (previous lexeme or subexpression) and create unary operator node
     * @param currentLexeme 
     * @param lexemeList 
     * @param index index of current lexeme
     * @returns new node
     */
    private handleUnaryOperator(currentLexeme: Lexeme, lexemeList: LexemeBuffer, index: number): Node {
        const operandLexeme = lexemeList.get(index + 1);
        const operand = this.parse(this.subexpressionHandler.getSubexpression(operandLexeme, lexemeList, index + 1));

        const unaryOperator = new UnaryOperatorNode(currentLexeme.value, currentLexeme.type, operand);

        return unaryOperator;
    }

    /**
     * Check if expression in brackets not operand.
     * @param lexemeList 
     * @param currentLexemeIndex 
     * @param lexemeType 
     * @returns new node of undefined if it is an operand
     */
    private handleBracketExpression(lexemeList: LexemeBuffer, currentLexemeIndex: number, lexemeType: LexemeType): Node {
        const endOfExpression = this.bracketTracer.traceBracketsExpression(lexemeList, currentLexemeIndex, lexemeType);

        if(this.subexpressionHandler.isSubexpressionOperand(lexemeList, currentLexemeIndex, endOfExpression)) {
            lexemeList.subExpressionStart = currentLexemeIndex;
            lexemeList.subExpressionEnd = endOfExpression as number;
        } else {
            return this.createStringNode(lexemeList.get(currentLexemeIndex));
        }
    }
}