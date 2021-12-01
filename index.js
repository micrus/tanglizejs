import { TangleVisualizer, Tangle } from "./src/main.js";

let x = new Tangle("1:3,2:4,5:10");
let y = new TangleVisualizer(x, "body", 800, 500, {});
console.log(y)
y.draw();
