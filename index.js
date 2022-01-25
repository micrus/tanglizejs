import { GraphVisualizer, Diagram, Tangle, TangleVisualizer } from "./src/main.js";

let diagram = new Tangle("1':1,2':15,3':17,4':10',5':8',6':7',9':14',11':12',13':17',15':16',2:16,3:14,4:13,5:12,6:11,7:10,8:9");
let graphVisualizer = new TangleVisualizer(diagram, "body", 800, 900);
//let tangleVisualizer = new TangleVisualizer(diagram.toTangle(), "body", 500,300);

graphVisualizer.draw()
//tangleVisualizer.draw()


/*

let tangle = new Tangle("1:2,3:1',2':3'");
let tangleVisualizer = new TangleVisualizer(tangle, "body", 500,300);
tangleVisualizer.draw();
*/

