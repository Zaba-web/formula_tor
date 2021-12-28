import { Lexeme } from "./Lexeme";

export class LexemeBuffer {
    private lexemeList:  Lexeme[] = [];
    private subExpressionStatus = {
        start: -1,
        end: -1
    };

    /**
     * Add new lexeme to the list of the lexems
     * @param lexeme lexeme to add
     */
    public add(lexeme: Lexeme): void {
        this.lexemeList.push(lexeme);
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