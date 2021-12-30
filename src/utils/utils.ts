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

function hasSomeParentTheClass(element: HTMLElement, classname: string): boolean {
    if (element.className.split(' ').indexOf(classname)>=0) return true;
    return element.parentNode && hasSomeParentTheClass(element.parentNode as HTMLElement, classname);
}

export {getProperty, hasSomeParentTheClass}