import { Lexeme } from "../Lexer/Lexeme";
import { LexemeBuffer } from "../Lexer/LexemeBuffer";
import { LexemeType } from "../Types/LexemeTypes";

/**
 * This class detects if given lexem is an operand of operator or not.
 */
export class RegularStringHandeler {

    private lexemeList: LexemeBuffer;
    private lexemeIndex: number;

    /**
     * Handle regular string lexeme
     * @param lexemeList list of lexemes
     * @param index index of current lexeme
     * @returns boolean value that dictates whether create node or not
     */
    public isNotOperand(lexemeList: LexemeBuffer, index: number): boolean {
        this.lexemeList = lexemeList;
        this.lexemeIndex = index;

        return this.isNotLHSOperand() && this.isNotRHSOperand();
    }

    /**
     * Check if lexeme is not left hand side operand
     * @returns boolean value
     */
     public isNotLHSOperand(): boolean {
        if(this.isItNotLastLexeme()) { 
            return (this.nextNotBinaryOperator() || this.nextIsFucntion());
        } else {
            return true;
        }
    }

    /**
     * Check if lexeme is not right hand side operand
     * @returns boolean value
     */
    public isNotRHSOperand(): boolean {
        if(this.isItNotFirstLexeme()) { 
            return (this.prevNotBinaryOperator() || this.prevIsFunction());
        } else {
            return true;
        }
    }

    private getNextLexeme(): Lexeme {
        return this.lexemeList.get(this.lexemeIndex + 1);
    }

    private getPrevLexeme(): Lexeme {
        return this.lexemeList.get(this.lexemeIndex - 1);
    }

    private isItNotLastLexeme(): boolean {
        return (this.lexemeIndex + 1) < this.lexemeList.length();
    }

    private isItNotFirstLexeme(): boolean {
        return (this.lexemeIndex - 1) >= 0;
    }

    private nextNotBinaryOperator(): boolean {
        return this.getNextLexeme().arity != 2;
    }

    private prevNotBinaryOperator(): boolean {
        return this.getPrevLexeme().arity != 2;
    }

    private nextIsFucntion(): boolean {
        return this.getNextLexeme().type == LexemeType.FUNCTION;
    }

    private prevIsFunction(): boolean {
        return this.getPrevLexeme().type == LexemeType.FUNCTION;
    }
} 