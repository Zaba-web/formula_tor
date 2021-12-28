import { Lexer } from "./Lexer/Lexer";
import { Parser } from "./Parser/Parser";
import { Visualizer } from "./Visualizer/Visualizer";

//const input = document.querySelector('.inp') as HTMLInputElement;
//const btn = document.querySelector('.submit') as HTMLButtonElement;

const lx = new Lexer();
const parser = new Parser();

const str = "x * (10 - 15)";
const lexemes = lx.analyze(str);
const ir = parser.analyze(lexemes);

console.log(lexemes.getLexemeList());
console.log(ir);

//const vis = new Visualizer('.test');

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

