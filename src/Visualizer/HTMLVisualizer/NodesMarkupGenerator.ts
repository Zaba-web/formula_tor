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
                    <path id="Path_44" data-name="Path 44" d="M1413.875,8588.838s-3.771,5.072-3.771,10.559,3.771,11.388,3.771,11.388" transform="translate(-1409.604 -8588.54)" fill="none" stroke="#000" stroke-width="0.6"/>
                </svg>          
            </div>`;
    }

    public static rightBracketMarkup(): string {
        return `
            <div class='__formulator_bracket __formulator_rightBracket'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.692 22.514">
                    <path id="Path_44" data-name="Path 44" d="M1410.1,8588.838s3.771,5.072,3.771,10.559-3.771,11.388-3.771,11.388" transform="translate(-1409.683 -8588.54)" fill="none" stroke="#000" stroke-width="0.6"/>
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
                        <path id="Path_61" data-name="Path 61" d="M4113.615,6538.416c7.166-2.816,15.514-10.146,19.083-27.735,7.138-35.178-2.294-56.591,26.894-58.63" transform="translate(0 2)" fill="none" stroke="#000" stroke-width="1.2"/>
                        <path id="Path_62" data-name="Path 62" d="M4113.615,6455c7.166,2.816,15.514,9.146,19.083,26.735,7.138,35.178-2.294,56.591,26.894,58.63" transform="translate(0 85)" fill="none" stroke="#000" stroke-width="1.2"/>
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

    public static indefIntMarkup(exrpession: string): string {
        return `
            <div class='__formulator_indefIntegralCotnainer'>
                <div class='__formulator_indefIntegralSymbol'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.531 23.869">
                        <g id="Group_30" data-name="Group 30" transform="translate(-1140.786 -223.921)">
                        <path id="Path_41" data-name="Path 41" d="M1377.552,8606.855s2.16-12.878,4.483-11.289" transform="translate(-232 -8371)" fill="none" stroke="#000" stroke-width="0.5"/>
                        <path id="Path_42" data-name="Path 42" d="M1382.062,8595.324s-2.186,12.983-4.51,11.395" transform="translate(-236.483 -8359.574)" fill="none" stroke="#000" stroke-width="0.5"/>
                        </g>
                    </svg>              
                </div>
                <div class='__formulator_formulaPart'>${exrpession}</div>
            </div>
        `;
    }
}