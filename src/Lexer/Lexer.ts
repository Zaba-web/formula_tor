import { Lexeme } from "./Lexeme";
import { OperatorTable, IOperatorTable } from "../Types/OperatorTable";
import { getProperty } from "../utils/utils";
import { LexemeBuffer } from "./LexemeBuffer";
import { LexemeType } from "../Types/LexemeTypes";
import { FunctionTable, IFunctionTable } from "../Types/FunctionTable";

/**
 * This class preforms lexical analysis which is a process that 
 * splits text string into a list of tokens (lexems)
 */
export class Lexer {
    private analysisPosition: number = 0;
    
    /**
     * Execute lexical analysis process
     * @param expression Math expression to analyse
     * @returns Array of lexemes
     */
    public analyze(expression: string): LexemeBuffer {
        const lexemeBuffer = new LexemeBuffer();
        this.resetPosition();

        while (this.analysisPosition < expression.length) {
            const currentChar = expression[this.analysisPosition];

            if (this.charIsOperator(currentChar)) {
                lexemeBuffer.add(this.createOperatorLexeme(currentChar));
                this.movePositionForward();
            } else {
                const lexeme = this.readStringLexeme(expression);
                lexemeBuffer.add(lexeme);
            }
        }

        lexemeBuffer.add(new Lexeme(LexemeType.EOF, ' ', 0));

        return lexemeBuffer;
    }

    /**
     * Check if the given character is an operator
     * @param currentChar given character
     * @returns boolean value
     */
    private charIsOperator(currentChar: string): boolean {
        return currentChar in OperatorTable;
    }

    /**
     * Create lexeme for operator
     * @param currentChar operator character
     * @returns new lexeme
     */
    private createOperatorLexeme(currentChar: string): Lexeme {
        const operatorDescription = getProperty(OperatorTable, currentChar as keyof IOperatorTable)

        return new Lexeme(
            operatorDescription.type, 
            currentChar,
            operatorDescription.arity
        )
    }

    /**
     * Create lexeme for string that does not need to be postprocessed
     * @param expressionString string with expression
     * @returns new lexeme
     */
    private createStaticExpressionLexeme(expressionString: string): Lexeme {
        return new Lexeme(
            LexemeType.REGULAR_STRING, 
            expressionString,
            0
        );
    }

    /**
     * Create lexeme for function 
     * @param fucntionName name of the function
     * @returns new lexeme
     */
    private createFunctionLexeme(fucntionName: string): Lexeme {
        const functionDescription = getProperty(FunctionTable, fucntionName as keyof IFunctionTable);

        return new Lexeme(
            LexemeType.FUNCTION,
            fucntionName,
            functionDescription.argCount
        );
    }

    /**
     * Read lexeme that contains more than 1 character. 
     * @param expression math expression
     * @returns new lexeme
     */
    private readStringLexeme(expression: string): Lexeme {
        let lexemeString: string = "";
        let lexemePart: string = "";

        while (true) {
            lexemePart = expression[this.analysisPosition];
            this.movePositionForward();

            if (lexemePart == ' ' || lexemePart == '    ' || lexemePart == '\n') {
                continue;
            }

            if (this.charIsOperator(lexemePart) || this.analysisPosition > expression.length) { 
                break;
            }

            lexemeString += lexemePart;
        } 

        let lexeme: Lexeme;

        if (lexemeString in FunctionTable) {
            lexeme = this.createFunctionLexeme(lexemeString);
        } else {
            lexeme = this.createStaticExpressionLexeme(lexemeString);
        }

        // return current analysis position pointer to the operator character
        this.movePositionBack();
        
        return lexeme;
    }

    /**
     * Point analysis position to the next char in exrpession string
     */
    private movePositionForward(): void {
        this.analysisPosition++;
    }

    /**
     * Point analysis position to the next char in exrpession string
     */
    private movePositionBack(): void {
        this.analysisPosition--;
    }

    /**
     * Set analysis position to 0
     */
    private resetPosition(): void {
        this.analysisPosition = 0;
    }
}