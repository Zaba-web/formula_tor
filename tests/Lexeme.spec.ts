import { Lexeme } from "../src/Lexer/Lexeme";

describe("Lexeme class: ", ()=>{
    it("should have properties (type, value, arity)", ()=>{
        const lexeme = new Lexeme(0, ' ', 0);

        expect(lexeme.type).toBeDefined();
        expect(lexeme.value).toBeDefined();
        expect(lexeme.arity).toBeDefined();
    })
});