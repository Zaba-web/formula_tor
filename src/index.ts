import { Lexer } from "./Lexer/Lexer";
import { Parser } from "./Parser/Parser";
import { HTMLVisualizer } from "./Visualizer/HTMLVisualizer/HTMLVisualizer";

class Formulator {
    private lexer: Lexer;
    private parser: Parser;
    private visualizer: HTMLVisualizer;

    constructor (cotnainer: HTMLElement) {
        this.lexer = new Lexer();
        this.parser = new Parser();
        this.visualizer = new HTMLVisualizer(cotnainer);
    }

    public visualize(expression: string) {
        const lexemes = this.lexer.analyze(expression);
        const intermediateRepresentation = this.parser.analyze(lexemes);
        this.visualizer.visualize(intermediateRepresentation);
    }
}

export default Formulator;


//const input = document.querySelector('.inp') as HTMLInputElement;
//const btn = document.querySelector('.submit') as HTMLButtonElement;

// const lx = new Lexer();
// const parser = new Parser();

// const str = "";
// const lexemes = lx.analyze(str);
// const ir = parser.analyze(lexemes);

// console.log(lexemes.getLexemeList());
// console.table(ir);

// const vis = new HTMLVisualizer(document.querySelector(".test"));
// vis.visualize(ir);
//vis.visualize(ir);

// const vis = new Visualizer('.test');
// btn.onclick = () => {
//     const str = removeWhitespaces(input.value);
//     const lexemes = lx.analyze(str);
//     const ir = parser.analyze(lexemes);

//     console.log(lexemes.getLexemeList());
//     console.log(ir);
//     vis.visualize(ir);
// }

