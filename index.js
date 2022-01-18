import { GraphVisualizer, Diagram, Tangle, TangleVisualizer } from "./src/main.js";

let diagram = new Diagram("2:7,3:5,4:6");
let graphVisualizer = new GraphVisualizer(diagram, "body", 500, 300, {dot_color:"red",arc_line:"zigzed"});
//let tangleVisualizer = new TangleVisualizer(diagram.toTangle(), "body", 500,300);

graphVisualizer.draw()
//tangleVisualizer.draw()


/*

let tangle = new Tangle("1:2,3:1',2':3'");
let tangleVisualizer = new TangleVisualizer(tangle, "body", 500,300);
tangleVisualizer.draw();
*/

