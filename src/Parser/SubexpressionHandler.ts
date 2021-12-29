import { BracketsErrors } from "../Errors/BracketsErrors";
import { Lexeme } from "../Lexer/Lexeme";
import { LexemeBuffer } from "../Lexer/LexemeBuffer";
import { LexemeType } from "../Types/LexemeTypes";
import { BracketsTracer } from "./BracketsTracer";
import { OperandDetector } from "./OperandDetector";
import { SubexpressionSeparator } from "./SubexpressionSeparator";

export class SubexpressionHandler {
    private bracketTracer: BracketsTracer;
    private operandDetector: OperandDetector

    constructor(operandDetector: OperandDetector, bracketTracer: BracketsTracer) {
        this.bracketTracer = bracketTracer;
        this.operandDetector = operandDetector;
    }

    /**
     * Check if expression in brackets not operand.
     * @param lexemeList 
     * @param currentLexemeIndex 
     * @param lexemeType 
     * @returns new node of undefined if it is an operand
     */
    public isSubexpressionOperand(lexemeList: LexemeBuffer, currentLexemeIndex: number, endOfExpression: number | boolean): boolean {

        if(endOfExpression === false) {
            BracketsErrors.mismatch();
        }

        if(this.operandDetector.isNotOperand(lexemeList, currentLexemeIndex) && this.operandDetector.isNotOperand(lexemeList, endOfExpression as number)) {
            return false;
        }
        
        return true;
    }

    /**
     * Handle operands and fucntion arguments
     * Works with single lexemes and with subexpressions
     * @param currentLexeme 
     * @param lexemeList 
     * @param currentLexemeIndex index of current lexeme
     * @returns new lexeme buffer
     */
    public getSubexpression(currentLexeme: Lexeme, lexemeList: LexemeBuffer, currentLexemeIndex: number): LexemeBuffer {
        const subexpressionSeparator = new SubexpressionSeparator(this.bracketTracer);
        return subexpressionSeparator.getSubexpression(currentLexeme, lexemeList, currentLexemeIndex);
    }
}