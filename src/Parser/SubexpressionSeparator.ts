import { BracketsErrors } from "../Errors/BracketsErrors";
import { Lexeme } from "../Lexer/Lexeme";
import { LexemeBuffer } from "../Lexer/LexemeBuffer";
import { LexemeType } from "../Types/LexemeTypes";
import { BracketsTracer } from "./BracketsTracer";

/**
 * This class separates subexpressions in particular lexeme buffers
 */
export class SubexpressionSeparator {
    private bracketTracer: BracketsTracer;
    private lexemeList: LexemeBuffer;
    private subexpression: LexemeBuffer;
    private currentLexemeIndex: number;
    private currentLexeme: Lexeme;
    private functionNameLexeme: Lexeme;
    private isItFucntion: boolean;

    constructor(bracketTracer: BracketsTracer) {
        this.bracketTracer = bracketTracer;
        this.subexpression = new LexemeBuffer();
        this.isItFucntion = false;
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
        this.lexemeList = lexemeList;
        this.currentLexemeIndex = currentLexemeIndex;
        this.currentLexeme = currentLexeme;
        
        const eof = new Lexeme(LexemeType.EOF, ' ', 0);

        this.handleFunctionNameCase();

        if(this.isItBracketsExpression())
            this.handleBracektsExpression();
        else 
           this.handleRegularStringLexeme();

        if(this.isItFucntion) 
            this.wrapExpressionAsFunction();

        this.subexpression.add(eof);

        return this.subexpression;
    }
    
    /**
     * Copy part of the list of lexemes to the subexpression buffer
     * @param currentLexeme 
     * @param endOfExpression 
     * @param subexpression 
     * @param lexemeList 
     * @param index 
     */
    private copyExpression(endOfExpression: number): void{
        
        if(this.currentLexeme.type == LexemeType.LEFT_BRACKET) {
            this.moveForward(endOfExpression);
        }

        if(this.currentLexeme.type == LexemeType.RIGHT_BRACKET) {
           this.moveBackward(endOfExpression);
        }
    }

    /**
     * Copy lexemes moving forward
     * @param endOfExpression last lexeme to copy index
     */
    private moveForward(endOfExpression: number): void {
        for(let i = this.currentLexemeIndex + 1; i < endOfExpression; i ++)  {
            this.subexpression.add(this.lexemeList.get(i));
        }
    }

    /**
     * Copy lexemes moving backward
     * @param endOfExpression last lexeme to copy index
     */
    private moveBackward(endOfExpression: number): void {
        let i: number = this.currentLexemeIndex as number - 1;

        for(i; i > endOfExpression; i --) {
            this.subexpression.unshift(this.lexemeList.get(i));
        }

        this.handleFuncionArgumentList(i);
    }

    /**
     * Check if given lexeme if a function name
     * @param currentLexeme 
     */
    private handleFunctionNameCase(): void {
        if (this.currentLexeme.type == LexemeType.FUNCTION) {
            this.functionNameLexeme = this.lexemeList.get(this.currentLexemeIndex);
            this.isItFucntion = true;
            this.currentLexemeIndex += 1;
            this.currentLexeme = this.lexemeList.get(this.currentLexemeIndex);
        }
    }

    /**
     * Check if given subexpression is an funtions argument list
     * @param lastIndex 
     */
    private handleFuncionArgumentList(lastIndex: number): void {
        if(lastIndex > 0 && this.lexemeList.get(lastIndex - 1).type == LexemeType.FUNCTION) {
            this.isItFucntion = true;
            this.functionNameLexeme = this.lexemeList.get(lastIndex - 1);
        }
    }

    /**
     * Wrap expression into the function by adding function name and brackets
     */
    private wrapExpressionAsFunction(): void {
        const openBracket = new Lexeme(LexemeType.LEFT_BRACKET, '(', 0);
        const closeBracket = new Lexeme(LexemeType.RIGHT_BRACKET, ')', 0);

        this.subexpression.add(closeBracket);
        this.subexpression.unshift(openBracket);
        this.subexpression.unshift(this.functionNameLexeme);
    }

    private isItBracketsExpression(): boolean {
        return this.currentLexeme.type == LexemeType.LEFT_BRACKET || this.currentLexeme.type == LexemeType.RIGHT_BRACKET;
    }

    private handleBracektsExpression(): void {
        const endOfExpression = this.bracketTracer.traceBracketsExpression(this.lexemeList, this.currentLexemeIndex, this.currentLexeme.type);

        if(endOfExpression !== false) {
            this.copyExpression(endOfExpression as number);
        } else {
            BracketsErrors.mismatch();
        }
    }

    private handleRegularStringLexeme() {
        this.subexpression.add(this.currentLexeme);
    }
}