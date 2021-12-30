import { NodeList } from "../IntermediateRepresentation/NodeList";

/**
 *  This interface define public methods for visualizer
 */
export interface IVisualizer {
    setOutput(container: HTMLElement): void
    visualize(intermediateRepresentation: NodeList): void;
}