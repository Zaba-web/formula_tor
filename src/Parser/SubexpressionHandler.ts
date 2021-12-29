import { Lexeme } from "../Lexer/Lexeme";
import { LexemeBuffer } from "../Lexer/LexemeBuffer";
import { LexemeType } from "../Types/LexemeTypes";
import { BracketsTracer } from "./BracketsTracer";
import { OperandDetector } from "./OperandDetector";

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
            throw new Error(`Brackets mismatch.`);
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
     * @param index index of current lexeme
     * @returns new lexeme buffer
     */
    public getSubexpression(currentLexeme: Lexeme, lexemeList: LexemeBuffer, index: number): LexemeBuffer {
        const subexpression = new LexemeBuffer();
        const eof = new Lexeme(LexemeType.EOF, ' ', 0);

        if(currentLexeme.type == LexemeType.LEFT_BRACKET || currentLexeme.type == LexemeType.RIGHT_BRACKET) {
            const endOfExpression = this.bracketTracer.traceBracketsExpression(lexemeList, index, currentLexeme.type);

            if(endOfExpression !== false) {
                this.copyExpression(currentLexeme, endOfExpression as number, subexpression, lexemeList, index);
            } else {
                throw new Error(`Brackets mismatch.`);
            }
                
        } else {
            subexpression.add(currentLexeme);
        }

        subexpression.add(eof);

        return subexpression;
    }

    /**
     * Copy part of the list of lexemes to the subexpression buffer
     * @param currentLexeme 
     * @param endOfExpression 
     * @param subexpression 
     * @param lexemeList 
     * @param index 
     */
    private copyExpression(currentLexeme: Lexeme, endOfExpression: number, subexpression: LexemeBuffer, lexemeList: LexemeBuffer, index: number): void{
        if(currentLexeme.type == LexemeType.LEFT_BRACKET)
            for(let i = index + 1; i < endOfExpression; i ++)  {
                subexpression.add(lexemeList.get(i));
            }

        if(currentLexeme.type == LexemeType.RIGHT_BRACKET) {
            for(let i = index as number - 1; i > endOfExpression; i --) {
                subexpression.add(lexemeList.get(i));
            }
        }
    }
}