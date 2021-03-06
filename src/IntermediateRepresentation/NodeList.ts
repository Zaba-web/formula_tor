import { Node } from "./Node";

/**
 * A class that represents list of parsed nodes
 */
export class NodeList {
    private nodes: Node[] = [];

    /**
     * Add new node to the list
     * @param node node to add
     */
    public add(node: Node): void {
        this.nodes.push(node);
    }

    /**
     * Get arbitrary node from node list
     * @param index index of node
     * @returns node
     */
    public get(index: number): Node {
        if(index >= 0 && index < this.nodes.length) {
            return this.nodes[index];
        }
    }

    /**
     * Get node list as array
     * @returns 
     */
    public toArray(): Node[] {
        return this.nodes;
    }
}