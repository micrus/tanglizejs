import {Node} from "../elements/Node.js";
import {Arc} from "../elements/Arc.js";
import { Tangle } from "./Tangle.js";

export class Diagram{

    constructor(arcs){
        this.constructionString = arcs;
        this.nodes = new Array();
        this.arcs = new Array();

        this.addNodes(arcs);
        this.addArcs(arcs);
    }


    addNodes(arcs){
        arcs.split(",").forEach(arc => arc.split(":").forEach(node => {
            this.nodes.push(new Node(node, 0,0));
        }))
    }

    addArcs(arcs){
        arcs.split(",").forEach(_arc => {
            let _arc_nodes = _arc.split(":");
            let firstNode = new Node(_arc_nodes[0], 0, 0);
            let secondNode = new Node(_arc_nodes[1], 0, 0);
            this.arcs.push(new Arc(firstNode, secondNode));
        });
    }

    getHigherNode(){
       return this.nodes.map(node => parseInt(node.id)).reduce(function(a,b){return Math.max(a,b)});
    }

    getMinimumNode(){
        return this.nodes.map(node => parseInt(node.id)).reduce(function(a,b){return Math.min(a,b)});
    }

    toTangle(){
        const orderedNode = this.nodes.map(node => node.id).sort();
        
        let newConstructionString = this.constructionString;

        let newNodeCounter = 1;
        for(let i = this.nodes.length; i>this.nodes.length/2;i--){
            //console.log(orderedNode.pop()+ " will become "+newNodeCounter++ +"'");
            newConstructionString = newConstructionString.replace(orderedNode.pop(), `${newNodeCounter++}'`);
        }

        for(newNodeCounter=this.nodes.length/2; newNodeCounter>0; newNodeCounter--){
            newConstructionString = newConstructionString.replace(orderedNode.pop(), newNodeCounter);
        }

        return new Tangle(newConstructionString);
    }
}
