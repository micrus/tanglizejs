import {Node} from "../elements/Node.js";
import {Arc} from "../elements/Arc.js";

export class Tangle{

    constructor(arcs){

        this.upperNodes = new Array();
        this.bottomNodes = new Array();
        this.arcs = new Array();

        this.addNodes(arcs);
        this.addArcs(arcs);
    }


    addNodes(arcs){
        arcs.split(",").forEach(arc => arc.split(":").forEach(node => {
            node.includes("'")?this.bottomNodes.push(new Node(node, 0, 0)):this.upperNodes.push(new Node(node,0,0));
        }))
    }

    addArcs(arcs){
        arcs.split(",").forEach(_arc => {
            let _arc_nodes = _arc.split(":");
            
            let firstNode = new Node(_arc_nodes[0], 0, 0);
            let secondNode = new Node(_arc_nodes[1], 0, 0);
           

            if(_arc_nodes.every(node => this.upperNodes.map(node=>node.id).includes(node))){this.arcs.push(new Arc(firstNode, secondNode, "bottom"));}
            else if(_arc_nodes.every(node => this.bottomNodes.map(node=>node.id).includes(node))){this.arcs.push(new Arc(firstNode, secondNode, "top"));}
            else {this.arcs.push(new Arc(firstNode, secondNode, "cross"));}
        });
    }

    getHigherNode(){
       return this.upperNodes.map(node => parseInt(node.id)).reduce(function(a,b){return Math.max(a,b)});
    }

    getMinimumNode(){
        return this.upperNodes.map(node => parseInt(node.id)).reduce(function(a,b){return Math.min(a,b)});
    }
}
