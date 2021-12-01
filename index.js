import { GraphVisualizer, Tangle } from "./src/main.js";

let tangle = new Tangle("3:5,2:4,1:6");
let graphVisualizer = new GraphVisualizer(tangle, "body", 800, 500, {});
graphVisualizer.draw();
