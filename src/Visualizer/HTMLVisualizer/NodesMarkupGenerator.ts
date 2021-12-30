/**
 * This class generates markup for different kinds of nodes
 */
export class NodesMarkupGenerator {
    public static regularStringNodeMarkup(value: string): string {
        return `<div class='__formulator_formulaPart'>${value}</div>`;
    }

    public static topIndexNodeMarkup(value: string): string {
        return `
            <div class='__formulator_topIndex'>
                ${value}
            </div>
        `;
    }

    public static leftBracketMarkup(): string {
        return `
            <div class='__formulator_bracket __formulator_leftBracket'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.692 22.514">
                    <path id="Path_44" data-name="Path 44" d="M1413.875,8588.838s-3.771,5.072-3.771,10.559,3.771,11.388,3.771,11.388" transform="translate(-1409.604 -8588.54)" fill="none" stroke="#000" stroke-width="1"/>
                </svg>          
            </div>`;
    }

    public static rightBracketMarkup(): string {
        return `
            <div class='__formulator_bracket __formulator_rightBracket'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.692 22.514">
                    <path id="Path_44" data-name="Path 44" d="M1410.1,8588.838s3.771,5.072,3.771,10.559-3.771,11.388-3.771,11.388" transform="translate(-1409.683 -8588.54)" fill="none" stroke="#000" stroke-width="1"/>
                </svg>          
            </div>`;
    }

    public static divisionMarkup(lhs: string, rhs: string): string {
        return `
            <div class = '__formulator_divisionContainer'>
                <div class = '__formulator_formulaPart'> ${lhs} </div>
                <div class = '__formulator_divisionDelimtier'></div>
                <div class = '__formulator_formulaPart'> ${rhs} </div>
            </div>
        `;
    }

    public static rootMarkup(expression: string, power: string): string {
        return `
            <div class = '__formulator_rootWrapper'>
                <div class = '__formulator_rootPowerContainer'>
                    <div class = '__formulator_rootPower'>${power != "<div class='__formulator_formulaPart'>2</div>" ? power : ''}</div>
                </div>
                <div class = '__formulator_rootContainer'>
                    <div class = '__formulator_rootSymbolContainer'>
                        <div class = '__formulator_rootSymbolBase'></div>
                    </div>
                    <div class = '__formulator_rootExpressionContainer'>
                        <div class = '__formulator_rootLine'></div>
                        <div class = '__formulator_rootExpression'>${expression}</div>
                    </div>
                </div>
            </div>
        `;
    }

    public static logMarkup(expression: string, base: string): string {
        return `
            <div class = '__formulator_formulaPart'> log <div class='__formulator_bottomIndex'>${base}</div> </div>
            ${expression}
        `;
    } 

    public static systemMarkup(expr1: string, expr2: string, expr3?: string, expr4?: string): string {
        return `
            <div class='__formulator_systemContainer'> 
                <div class='__formulator_systemSymbolContainer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.194 172.313">
                        <g id="Group_33" data-name="Group 33" transform="translate(-4113.432 -6453.552)">
                        <path id="Path_61" data-name="Path 61" d="M4113.615,6538.416c7.166-2.816,15.514-10.146,19.083-27.735,7.138-35.178-2.294-56.591,26.894-58.63" transform="translate(0 2)" fill="none" stroke="#000" stroke-width="2"/>
                        <path id="Path_62" data-name="Path 62" d="M4113.615,6455c7.166,2.816,15.514,9.146,19.083,26.735,7.138,35.178-2.294,56.591,26.894,58.63" transform="translate(0 85)" fill="none" stroke="#000" stroke-width="2"/>
                        </g>
                    </svg>
                </div>
                <div class='__formulator_systemItemsContainer'>
                    <div class = '__formulator_formulaPart'>${expr1}</div>
                    <div class = '__formulator_formulaPart'>${expr2}</div>
                    <div class = '__formulator_formulaPart'>${expr3 ? expr3 : ''}</div>
                    <div class = '__formulator_formulaPart'>${expr4 ? expr4 : ''}</div>
                </div>
            </div>
        `;
    }

    public static indefIntMarkup(expression: string): string {
        return `
            <div class='__formulator_indefIntegralCotnainer'>
                <div class='__formulator_integralSymbol'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.721 22.813">
                        <g id="Group_30" data-name="Group 30" transform="translate(-3414.453 -6955.837)">
                        <path id="Path_41" data-name="Path 41" d="M3414.794,7071.669s2.562,2.391,2.519-2.667,0-7.674,0-7.674" transform="translate(0 -94.084)" fill="none" stroke="#000" stroke-width="0.7"/>
                        <path id="Path_42" data-name="Path 42" d="M3417.313,7061.892s-2.562-2.391-2.519,2.668,0,7.674,0,7.674" transform="translate(2.52 -104.99)" fill="none" stroke="#000" stroke-width="0.7"/>
                        </g>
                    </svg>                
                </div>
                <div class='__formulator_formulaPart'>${expression}</div>
            </div>
        `;
    }

    public static defIntMarkup(expression: string, bottom: string, top: string): string {
        return `
            <div class='__formulator_indefIntegralCotnainer'>
                <div class='__formulator_defIntegralSymbolContainer'>
                    <div class = '__formulator_formulaPart'>${top}</div>
                    <div class='__formulator_integralSymbol'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.721 22.813">
                            <g id="Group_30" data-name="Group 30" transform="translate(-3414.453 -6955.837)">
                            <path id="Path_41" data-name="Path 41" d="M3414.794,7071.669s2.562,2.391,2.519-2.667,0-7.674,0-7.674" transform="translate(0 -94.084)" fill="none" stroke="#000" stroke-width="0.7"/>
                            <path id="Path_42" data-name="Path 42" d="M3417.313,7061.892s-2.562-2.391-2.519,2.668,0,7.674,0,7.674" transform="translate(2.52 -104.99)" fill="none" stroke="#000" stroke-width="0.7"/>
                            </g>
                        </svg>                         
                    </div>
                    <div class = '__formulator_formulaPart'>${bottom}</div>
                </div>
                <div class='__formulator_formulaPart'>${expression}</div>
            </div>
        `;
    }

    public static intLineMarkup(bottom: string, top: string): string {
        return `
            <div class='__formulator_indefIntegralCotnainer'>
                <div class='__formulator_defIntegralSymbolContainer'>
                    <div class = '__formulator_formulaPart'>${top}</div>
                    <div class='__formulator_integralSymbol'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 22">
                            <line id="Line_66" data-name="Line 66" y2="22" transform="translate(0.5)" fill="none" stroke="#000" stroke-width="0.5"/>
                        </svg>                                         
                    </div>
                    <div class = '__formulator_formulaPart'>${bottom}</div>
                </div>
            </div>
        `;
    }
    
    public static limitMarkup(expression: string, variable: string, approaching: string): string {
        return `
            <div class='__formulator_limtitContainer'>
                <div class='__formulator_limtitSymbolContainer'>
                    <div style='text-align:center'>lim</div>
                    <div class = '__formulator_limtitSymbolParameters'>
                        <div class='__formulator_formulaPart'>
                            ${variable}
                            <div>→</div>
                            ${approaching}
                        </div>
                    </div>
                </div>
                <div class='__formulator_formulaPart'>
                    ${expression}
                </div>
            </div>
        `;
    }

    public static bottomIndexNodeMarkup(expression: string): string {
        return `
            <div class='__formulator_bottomIndex'>${expression}</div>
        `;
    }

    public static twoIndexMarkup(topIndex: string, bottomIndex: string): string {
        return `
            <div class='__formulator_indexesContainer'>
                ${NodesMarkupGenerator.topIndexNodeMarkup(topIndex)}
                ${NodesMarkupGenerator.bottomIndexNodeMarkup(bottomIndex)}
            </div>
        `;
    }

    public static sumMarkup(expression: string, stopPoint: string, start: string): string {
        return `
            <div class='__formulator_sumContainer'>
                <div class = '__formulator_sumSymbolContainer'>
                    <div class='__formulator_formulaPart'>${stopPoint}</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="39" viewBox="0 0 17 22">
                            <path id="Path_43" data-name="Path 43" d="M24,5H7V7.414L15.586,16,7,24.586V27H24V25H9.414l9-9-9-9H24Z" transform="translate(-7 -5)"/>
                        </svg>
                    </div>
                    <div class='__formulator_formulaPart'>${start}</div>
                </div>
                <div class='__formulator_formulaPart'>${expression}</div>
            </div>
        `;
    }

    public static vecMarkup(expression: string): string {
        return `
            <div class='__formulator_vecContainer'>
                <div class='__formulator_vecArrow'></div>
                <div class='__formulator_formulaPart'>${expression}</div>
            </div>
        `;
    }
}