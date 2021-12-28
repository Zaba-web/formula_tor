import { Lexer } from "../src/Lexer/Lexer";
import { LexemeType } from "../src/Types/LexemeTypes";


describe("Lexer class: ", ()=>{
    const lexer = new Lexer();

    it("analyze('') should return lexeme buffer with only EOF lexeme if given string is empty", ()=>{
        const lexemeBuffer = lexer.analyze("");

        expect(lexemeBuffer.length()).toBe(1);
        expect(lexemeBuffer.get(0).type).toEqual(LexemeType.EOF);
    });

    it("lexer.analyze('10x') should return lexeme buffer with regular string lexeme", ()=>{
        const lexemeBuffer = lexer.analyze("10x");

        expect(lexemeBuffer.length()).toBe(2);
        expect(lexemeBuffer.get(0).type).toEqual(LexemeType.REGULAR_STRING);
    });

    it("lexer.analyze('10x+30+19/29') should return lexeme buffer that contains 8 lexemes (including eof)", ()=>{
        const lexemeBuffer = lexer.analyze("10x+30+19/29");
        expect(lexemeBuffer.length()).toBe(8);
    });

    it("lexer should work with functions (lexer.analyze('Root(3,5)'))", ()=>{
        const lexemeBuffer = lexer.analyze("Root(3,5)");
        expect(lexemeBuffer.length()).toBe(7) // ['Root', '(', '3', ',', '5', ')', eof];
        expect(lexemeBuffer.get(0).type).toEqual(LexemeType.FUNCTION);
    });

    it("lexer should ignore whitespaces and tabs (lexer.analyze('x  + 4')", ()=>{
        const lexemeBuffer = lexer.analyze("x  + 4");
        expect(lexemeBuffer.length()).toBe(4) // ['x', '+', '4', eof];
    });

});