/**
 * credit: Typescript documentation, src 
 * https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
 * @param o Object 
 * @param propertyName name of property
 * @returns value of o[propertyName]
 */
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName];
}

export {getProperty}