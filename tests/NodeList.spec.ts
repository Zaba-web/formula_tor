import { NodeList } from "../src/IntermediateRepresentation/NodeList";
import { Node } from "../src/IntermediateRepresentation/Node";

describe("NodeList class: ", ()=>{
    let nodeList: NodeList;

    beforeEach(()=>{
        nodeList = new NodeList();
    });

    it("get() should return undefined if index is out of bounds", ()=>{
        expect(nodeList.get(-1)).toBeUndefined();
        expect(nodeList.get(0)).toBeUndefined();
        expect(nodeList.get(1)).toBeUndefined();
    });

    it("toArray() should return array", ()=>{
        expect(nodeList.toArray()).toBeInstanceOf(Array);
    });

    it("toArray should return empty array if nodeList is empty", ()=>{
        expect(nodeList.toArray().length).toBe(0);
    });

    it("add() should add new nodes to the list", ()=>{
        const fakeNode = {
            value: 'test',
            type: 0,
            arity: 0
        };
        
        nodeList.add(fakeNode as unknown as Node);

        expect(nodeList.get(0)).toEqual(fakeNode);
    });
});