import {Node} from "./../elements/Node.js";
import {Arc} from "./../elements/Arc.js";

export class Tangle{

    constructor(arcs){

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
}
