import { LexemeType } from "../Types/LexemeTypes";
import { Lexeme } from "./Lexeme";


export class LexemeBuffer {
    private lexemeList:  Lexeme[] = [];
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

} 