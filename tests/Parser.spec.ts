import { BinaryOperatorNode } from "../src/IntermediateRepresentation/BinaryOperatorNode";
import { LexemeBuffer } from "../src/Lexer/LexemeBuffer";
import { Lexer } from "../src/Lexer/Lexer";
import { Parser } from "../src/Parser/Parser";


describe("Parser class: ", ()=>{
    const parser = new Parser();
    const lexer = new Lexer();

    it("should return empty node list if empty lexeme buffer is given", ()=>{
        const lexemeBuffer = new LexemeBuffer();

        expect(parser.analyze(lexemeBuffer).toArray().length).toBe(0);
    });

    it("should work with 0-arity lexemes", ()=>{
        const lexemeBuffer = lexer.analyze("2+4");
        expect(parser.analyze(lexemeBuffer).toArray().length).toBe(3);
    });

    it("should work with binary operators", ()=>{
        const lexemeBuffer = lexer.analyze("2/4");
        expect(parser.analyze(lexemeBuffer).toArray().length).toBe(1);

        const node = parser.analyze(lexemeBuffer).get(0) as BinaryOperatorNode;

        expect(node.leftHandSideOperand.value).toBe('2');
        expect(node.rightHandSideOperand.value).toBe('4');
    });

    it("should work with combined expression", ()=>{
        const lexemeBuffer = lexer.analyze("2/4+x");
        expect(parser.analyze(lexemeBuffer).toArray().length).toBe(3);
    });
});