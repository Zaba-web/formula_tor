import { LexemeBuffer } from "../Lexer/LexemeBuffer";
import { LexemeType } from "../Types/LexemeTypes";

/**
 * A class that finds beginning and ending of the subexpression in brackets
 */
export class BracketsTracer {
    /**
     * Traces end of subexpression in brackets
     * @param lexemeList list of lexemes
     * @param currentLexemeIndex start position to search
     * @returns index of close bracket lexeme of expression or false if it was not found
     */
    public traceBracketsExpression(lexemeList: LexemeBuffer, currentLexemeIndex: number, lexemeType: LexemeType): number | boolean {
        let bracketsCounter = 1;
        let currentPosition = currentLexemeIndex;

        if (lexemeType == LexemeType.LEFT_BRACKET)  {
            return this.traceForward(lexemeList, bracketsCounter, currentPosition);
        } else if (lexemeType == LexemeType.RIGHT_BRACKET) {
            return this.traceBackward(lexemeList, bracketsCounter, currentPosition);
        }
    }

    /**
     * Trace expression that starts with opening bracket
     * @param lexemeList list of lexemes
     * @param bracketsCounter 
     * @param currentPosition current position in lexeme list
     * @returns position of end of the expression or false if it is incorrect
     */
    private traceForward(lexemeList: LexemeBuffer, bracketsCounter: number, currentPosition: number): number | boolean {
        while(bracketsCounter != 0 && currentPosition < lexemeList.length() - 1) {
            currentPosition ++;

            lexemeList.get(currentPosition).type == LexemeType.LEFT_BRACKET ? bracketsCounter ++ : null;
            lexemeList.get(currentPosition).type == LexemeType.RIGHT_BRACKET ? bracketsCounter -- : null;
        }

        return bracketsCounter == 0 ? currentPosition : false;
    }

    /**
     * Trace expression that starts with closing bracket
     * @param lexemeList list of lexemes
     * @param bracketsCounter 
     * @param currentPosition current position in lexeme list
     * @returns position of end of the expression or false if it is incorrect
     */
    private traceBackward(lexemeList: LexemeBuffer, bracketsCounter: number, currentPosition: number): number | boolean {
        while(bracketsCounter != 0 && currentPosition > 0) {
            currentPosition --;

            lexemeList.get(currentPosition).type == LexemeType.RIGHT_BRACKET ? bracketsCounter ++ : null;
            lexemeList.get(currentPosition).type == LexemeType.LEFT_BRACKET ? bracketsCounter -- : null;
        }

        return bracketsCounter == 0 ? currentPosition : false;
    }
}