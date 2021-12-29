import { Lexeme } from "./Lexeme";

/**
 * This class is using to represent sequences of lexems. LexemeBuffer lays between 
 * raw string and intermediate representation.
 */
export class LexemeBuffer {
    private lexemeList:  Lexeme[] = [];

    /**
     * Since we parse subexperssions, that are operands and function arguments separately,
     * creating new lexeme buffers from them, we need to skip this subexpressions in the main 
     * parsing process.
     * 
     * Parser checks if current parsed lexeme index is in the range that represents by subExpressionStatus
     * and if it is, the parser skips this lexemes until it reach the end of the subexpression.
     */
    private subExpressionStatus = {
        start: -1,
        end: -1
    };

    /**
     * Add new lexeme to the end of the list of lexems
     * @param lexeme lexeme to add
     */
    public add(lexeme: Lexeme): void {
        this.lexemeList.push(lexeme);
    }

    /**
     * Add new lexeme to the beginning of the list of lexems
     * @param lexeme lexeme to add
     */
    public unshift(lexeme: Lexeme): void {
        this.lexemeList.unshift(lexeme);
    }

    /**
     * Get list of all lexemes
     * @returns array of lexems
     */
    public getLexemeList(): Lexeme[] {
        return this.lexemeList;
    }

    /**
     * Get lexeme from buffer
     * @returns lexeme
     */
    public get(index: number): Lexeme {
        if(index >= 0 && index < this.lexemeList.length) {
            return this.lexemeList[index];
        }
    }

    /**
     * Get count of elements lexeme buffer
     * @returns count of elements
     */
    public length(): number {
        return this.lexemeList.length;
    }

    public setSubexpression(start: number, end: number) {
        this.subExpressionStart = start;
        this.subExpressionEnd = end;
    }

    public set subExpressionStart(index: number) {
        this.subExpressionStatus.start = index;
    }

    public set subExpressionEnd(index: number) {
        this.subExpressionStatus.end = index;
    }

    public get subExpressionStart() {
        return this.subExpressionStatus.start;
    }

    public get subExpressionEnd() {
        return this.subExpressionStatus.end;
    }

} 