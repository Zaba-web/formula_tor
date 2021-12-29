import { Lexeme } from "../Lexer/Lexeme";

export class FunctionsErrors {
    public static argumentListMissing(lexeme: Lexeme) {
        throw new Error(`Function missing argument list. Details: ${lexeme}`);
    }
}