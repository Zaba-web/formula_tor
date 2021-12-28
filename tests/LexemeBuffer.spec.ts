import { Lexeme } from "../src/Lexer/Lexeme";
import { LexemeBuffer } from "../src/Lexer/LexemeBuffer";

let lexemeBuffer: LexemeBuffer;

beforeAll(()=>{
    lexemeBuffer = new LexemeBuffer();
});

describe("LexeBuffer class: ", ()=>{
    it('getLexemeList() should return an array', ()=>{
        expect(lexemeBuffer.getLexemeList()).toBeInstanceOf(Array);
    });

    it('getLexemeList() should return empty array with empty buffer', ()=>{
        expect(lexemeBuffer.getLexemeList().length).toBe(0);
    });

    it('length() should be 0 in empty lexeme buffer', ()=>{
        expect(lexemeBuffer.length()).toBe(0);
    });

    it('get() should return undefined if passed index is out of bound', ()=>{
        expect(lexemeBuffer.get(0)).toBeUndefined();
        expect(lexemeBuffer.get(-1)).toBeUndefined();
        expect(lexemeBuffer.get(1)).toBeUndefined();
    });

    it('add() should add lexemes in buffer', ()=>{
        const fakeLexeme = {
            type: 1,
            value: 1,
            arity: 1
        };

        lexemeBuffer.add(fakeLexeme as unknown as Lexeme);

        expect(lexemeBuffer.length()).toBe(1);
        expect(lexemeBuffer.getLexemeList()[0]).toEqual(fakeLexeme);
        expect(lexemeBuffer.get(0)).toEqual(fakeLexeme);
    });
});