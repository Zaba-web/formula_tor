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
import { FunctionNode } from "../IntermediateRepresentation/FunctionNode";
import { FunctionsErrors } from "../Errors/FunctionErrors";

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
        const currentInSubexpression = currentLexemeIndex >= lexemeList.subExpressionStart && currentLexemeIndex <= lexemeList.subExpressionEnd;
        
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
            case LexemeType.REGULAR_STRING:
                if(this.operandDetector.isNotOperand(lexemeList, currentLexemeIndex)) {
                    return this.createStringNode(lexeme);
                }
                break;
            case LexemeType.BINARY_OPERATOR:
                return this.handleBinaryOperator(lexeme, lexemeList, currentLexemeIndex);
            case LexemeType.UNARY_OPERATOR:
                return this.handleUnaryOperator(lexeme, lexemeList, currentLexemeIndex);
            case LexemeType.LEFT_BRACKET:
            case LexemeType.RIGHT_BRACKET:
                const bracketExpressionResult = this.handleBracketExpression(lexemeList, currentLexemeIndex, lexeme.type);
                
                if(bracketExpressionResult) {
                    return bracketExpressionResult;
                }

                break;
            case LexemeType.FUNCTION:
                const functionExpression = this.handleFunctionExpression(lexeme, lexemeList, currentLexemeIndex);

                if(functionExpression) {
                    return functionExpression;
                }
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
     * @param currentLexemeIndex index of current lexeme
     * @returns new node
     */
    private handleBinaryOperator(currentLexeme: Lexeme, lexemeList: LexemeBuffer, currentLexemeIndex: number): Node {
        const prevLexemeIndex = currentLexemeIndex - 1;
        const nextLexemeIndex = currentLexemeIndex + 1;

        const leftHandSideOperandLexeme = lexemeList.get(prevLexemeIndex);
        const leftHandSideOperand = this.parse(this.subexpressionHandler.getSubexpression(leftHandSideOperandLexeme, lexemeList, prevLexemeIndex));

        const rightHandSideOperandLexeme = lexemeList.get(nextLexemeIndex);
        const rightHandSideOperand = this.parse(this.subexpressionHandler.getSubexpression(rightHandSideOperandLexeme, lexemeList, nextLexemeIndex));

        const binaryOperatorNode = new BinaryOperatorNode(currentLexeme.value, currentLexeme.type, leftHandSideOperand, rightHandSideOperand);

        return binaryOperatorNode;
    }

    /**
     * Read operand (previous lexeme or subexpression) and create unary operator node
     * @param currentLexeme 
     * @param lexemeList 
     * @param currentLexemeIndex index of current lexeme
     * @returns new node
     */
    private handleUnaryOperator(currentLexeme: Lexeme, lexemeList: LexemeBuffer, currentLexemeIndex: number): Node {
        const operandLexemeIndex = currentLexemeIndex + 1;

        const operandLexeme = lexemeList.get(operandLexemeIndex);
        const operand = this.parse(this.subexpressionHandler.getSubexpression(operandLexeme, lexemeList, operandLexemeIndex));

        const unaryOperator = new UnaryOperatorNode(currentLexeme.value, currentLexeme.type, operand);

        return unaryOperator;
    }

    /**
     * Check if function input correctly; 
     * Detect if function is an operand of operator or not
     * @param currentLexeme 
     * @param lexemeList 
     * @param currentLexemeIndex 
     * @returns new function node
     */
    private handleFunctionExpression(currentLexeme: Lexeme, lexemeList: LexemeBuffer, currentLexemeIndex: number): Node {
        const nextLexemeIndex = currentLexemeIndex + 1;

        if(nextLexemeIndex >= lexemeList.length()) {
            FunctionsErrors.argumentListMissing(currentLexeme);
        }

        const nextLexemeType = lexemeList.get(nextLexemeIndex).type;

        if(nextLexemeType != LexemeType.LEFT_BRACKET) {
            FunctionsErrors.argumentListMissing(currentLexeme);
        }

        const endOfFunctionExpression = this.bracketTracer.traceBracketsExpression(lexemeList, nextLexemeIndex, nextLexemeType);
        
        if(this.operandDetector.isNotOperand(lexemeList, currentLexemeIndex) && 
           this.operandDetector.isNotOperand(lexemeList, endOfFunctionExpression as number)) { 
            lexemeList.setSubexpression(currentLexemeIndex, endOfFunctionExpression as number);
            
            return this.createFunctionNode(currentLexeme, lexemeList, currentLexemeIndex, endOfFunctionExpression as number);
        } else {
            lexemeList.setSubexpression(currentLexemeIndex - 1, endOfFunctionExpression as number); 
        }
    }

    /**
     * Create node for fucntion
     * @param currentLexeme
     * @param lexemeList 
     * @param currentLexemeIndex 
     * @param endOfFunctionExpression 
     * @returns new function lexeme
     */
    private createFunctionNode(currentLexeme: Lexeme, lexemeList: LexemeBuffer, currentLexemeIndex: number, endOfFunctionExpression: number): Node {
        const argCounts = currentLexeme.arity;
        let argumentList: NodeList[] = [];

        /* currentLexemeIndex points to the function name, 
        * currentLexemeIndex + 1 is a open bracket for arguments list
        * currentLexemeIndex + 2 is a first lexeme of the first argument
        */ 

        let currentArgumentLexemeIndex = currentLexemeIndex + 2; 

        for(let currentArgument = 0; currentArgument < argCounts; currentArgument++) {
            const currentLexeme = lexemeList.get(currentArgumentLexemeIndex);
            const argumentLexemes = this.subexpressionHandler.getSubexpression(currentLexeme, lexemeList, currentArgumentLexemeIndex);
            
            argumentList.push(this.parse(argumentLexemes));
            
            currentArgumentLexemeIndex += argumentLexemes.length();

            /* if we have parsed expression that consists more than one lexeme (and eof at the end)
            *  we need to keep in mind two brackets lexemes that are discarded after getSubexpression call
            */
            if(argumentLexemes.length() > 2) {
                currentArgumentLexemeIndex += 2;
            }
        }

        return new FunctionNode(currentLexeme.value, currentLexeme.type, currentLexeme.arity, argumentList);
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
            lexemeList.setSubexpression(currentLexemeIndex, endOfExpression as number);
        } else {
            return this.createStringNode(lexemeList.get(currentLexemeIndex));
        }
    }
}