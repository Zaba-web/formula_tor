import { BinaryOperatorNode } from "../src/IntermediateRepresentation/BinaryOperatorNode";
import { FunctionNode } from "../src/IntermediateRepresentation/FunctionNode";
import { UnaryOperatorNode } from "../src/IntermediateRepresentation/UnaryOperatorNode";
import { LexemeBuffer } from "../src/Lexer/LexemeBuffer";
import { Lexer } from "../src/Lexer/Lexer";
import { Parser } from "../src/Parser/Parser";
import { LexemeType } from "../src/Types/LexemeTypes";


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

    it("should work with unary operator", ()=>{
        const lexemeBuffer = lexer.analyze("2^5");
        expect(parser.analyze(lexemeBuffer).toArray().length).toBe(2);

        const operator = parser.analyze(lexemeBuffer).get(1) as UnaryOperatorNode;
        expect(operator.operand.get(0).value).toBe('5');
    });

    it("should work with binary operators", ()=>{
        const lexemeBuffer = lexer.analyze("2/4");
        expect(parser.analyze(lexemeBuffer).toArray().length).toBe(1);

        const node = parser.analyze(lexemeBuffer).get(0) as BinaryOperatorNode;

        expect(node.leftHandSideOperand.get(0).value).toBe('2');
        expect(node.rightHandSideOperand.get(0).value).toBe('4');
    });

    it("should work with combined expression", ()=>{
        const lexemeBuffer = lexer.analyze("2/4+x");
        expect(parser.analyze(lexemeBuffer).toArray().length).toBe(3);
    });

    it("should handle brackets as regular strings if it not operands", ()=>{
        const lexemeBuffer = lexer.analyze("(10 - 3)");
        expect(parser.analyze(lexemeBuffer).toArray().length).toBe(5);
    });

    it("should work with subexpressions", ()=>{
        const lexemeBuffer = lexer.analyze("(10-5)/(19-5)");
        const IntermediateRepresentation = parser.analyze(lexemeBuffer);

        expect(IntermediateRepresentation.toArray().length).toBe(1);

        const operator = IntermediateRepresentation.get(0) as BinaryOperatorNode;

        expect(operator.value).toBe('/');
        expect(operator.rightHandSideOperand.toArray().length).toBe(3);
    });

    it("should trow error", ()=>{
        const lexemeBuffer = lexer.analyze("2/(((19-5)");
        expect(()=>{parser.analyze(lexemeBuffer)}).toThrow(Error);
    });

    it("should trow error", ()=>{
        const lexemeBuffer = lexer.analyze("2/(19-5))");
        expect(()=>{parser.analyze(lexemeBuffer)}).toThrow(Error);
    });

    it("should work with functions", ()=>{
        const lexemeBuffer = lexer.analyze("Root(4,2)");
        const ir = parser.analyze(lexemeBuffer);

        const fnNode = ir.get(0) as FunctionNode;

        expect(fnNode.type).toEqual(LexemeType.FUNCTION);
        expect(fnNode.arguments[0].get(0).value).toBe('4');
        expect(fnNode.arguments[1].get(0).value).toBe('2');
    });

    it("should be able to use complex expressions as function arguments", ()=>{
        const lexemeBuffer = lexer.analyze("Root((1/2),2)");
        const ir = parser.analyze(lexemeBuffer);

        const fnNode = ir.get(0) as FunctionNode;
        expect(fnNode.arguments[0].get(0).value).toEqual('/');
    });

    it("should be able to use functions as operands", ()=>{
        const lexemeBuffer = lexer.analyze("Root(2,3)/Root(3,5)");
        const ir = parser.analyze(lexemeBuffer);

        const operatorNode = ir.get(0) as BinaryOperatorNode;
        const lhsOperand = operatorNode.leftHandSideOperand.get(0) as FunctionNode;
        const rhsOperand = operatorNode.rightHandSideOperand.get(0) as FunctionNode;

        expect(lhsOperand.type).toEqual(LexemeType.FUNCTION);
        expect(rhsOperand.type).toEqual(LexemeType.FUNCTION);

        expect(lhsOperand.arguments[0].get(0).value).toBe('2');
        expect(lhsOperand.arguments[1].get(0).value).toBe('3');

        expect(rhsOperand.arguments[0].get(0).value).toBe('3');
        expect(rhsOperand.arguments[1].get(0).value).toBe('5');
    });

    it("should throw error argument missing error", ()=>{
        const lexemeBuffer = lexer.analyze("Root");
        expect(()=>{
            parser.analyze(lexemeBuffer);
        }).toThrow();
    });
});