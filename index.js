import { GraphVisualizer, Diagram, Tangle, TangleVisualizer } from "./src/main.js";

let diagram = new Diagram("4:6,3:5,2:7");
let graphVisualizer = new GraphVisualizer(diagram, "body", 500, 300);
//graphVisualizer.draw()
let tangleVisualizer = new TangleVisualizer(diagram.toTangle(), "body", 500,300);
tangleVisualizer.draw()


/*

let tangle = new Tangle("1:2,3:1',2':3'");
let tangleVisualizer = new TangleVisualizer(tangle, "body", 500,300);
tangleVisualizer.draw();
*/

