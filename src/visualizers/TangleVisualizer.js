import { GRAPH_OPTION } from "./constants.js";

export class TangleVisualizer {
    constructor(tangle, location, width, height, options = GRAPH_OPTION){
       
        this.options= {...GRAPH_OPTION, ...options};
        this.options = options;
        this.tangle = tangle;

        this.width = width;
        this.height = height;

        this.location = d3.select(location)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        this.xScale = d3.scaleLinear()
        .domain([this.tangle.getMinimumNode()-1, this.tangle.getHigherNode()+1])
        .range([100, this.width - 100]);

        this.updateLocation(this.width, this.height);

    }


    updateLocation(width, height){
        this.width = width;
        this.height = height;

        this.tangle.upperNodes.forEach(node => {node.x = this.xScale(node.id); node.y = this.height*0.2});
        this.tangle.bottomNodes.forEach(node =>{node.x = this.xScale((node.id).replace("'","")); node.y=this.height*0.8});

        this.tangle.arcs.forEach(arc => {
            arc.firstNode.x = this.xScale(arc.firstNode.id.replace("'",""));
            arc.firstNode.y = arc.firstNode.id.includes("'")?this.height*0.8:this.height*0.2;

            arc.secondNode.x = this.xScale(arc.secondNode.id.replace("'","")); 
            arc.secondNode.y = arc.secondNode.id.includes("'")?this.height*0.8:this.height*0.2;
        });
    }
   
   
    draw() {
    this.drawMainLines();
    this.drawNodes();
    this.drawStraightArcs();
    //this.options.arc_line ==="straight"?this.drawStraightArcs():this.drawZigZagArcs();
    //this.drawNodes();
    

    }


    drawMainLines(){
        this.location.append("line")
        .attr("id", "top-line")
        .attr("x1", this.xScale(this.tangle.getMinimumNode()-1))
        .attr("x2", this.xScale(this.tangle.getHigherNode()+1))
        .attr("y1", this.tangle.upperNodes[0].y)
        .attr("y2", this.tangle.upperNodes[0].y)
        .attr("stroke", "black")

        this.location.append("line")
        .attr("id", "bottom-line")
        .attr("x1", this.xScale(this.tangle.getMinimumNode()-1))
        .attr("x2", this.xScale(this.tangle.getHigherNode()+1))
        .attr("y1", this.tangle.bottomNodes[0].y)
        .attr("y2", this.tangle.bottomNodes[0].y)
        .attr("stroke", "black")
    }

    drawNodes(){
        let nodes = this.tangle.upperNodes.concat(this.tangle.bottomNodes);
        console.log(nodes);
        nodes.forEach(node => {
            this.location.append('circle')
                .attr("id", `node-${node.id}`)
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", this.options.dot_size)
                .attr("fill", this.options.dot_color)
                .attr("stroke", "black");
            });
        
        this.tangle.upperNodes.forEach(node =>{
            this.location.append('text')
                .attr("x", node.x - (this.options.dot_size/2))
                .attr("y", node.y - this.options.dot_size - 10)
                .attr("dy", ".35em")
                .text(node.id);
            });

        this.tangle.bottomNodes.forEach(node =>{
            this.location.append('text')
                .attr("x", node.x - (this.options.dot_size/2))
                .attr("y", node.y + this.options.dot_size + 10)
                .attr("dy", ".35em")
                .text(node.id);
            });
        
    }

    drawStraightArcs(){
        this.tangle.arcs.filter(arc => arc.type==="cross").forEach(arc => {
            this.location.append("line")
            .attr("x1", arc.firstNode.x)
            .attr("x2", arc.secondNode.x)
            .attr("y1", arc.firstNode.y)
            .attr("y2", arc.secondNode.y)
            .attr("stroke", "black")
            });
       
        this.tangle.arcs.filter(arc => arc.type==="top").forEach(arc => {
            this.location.append('path')
                .attr("d", `M${arc.firstNode.x} ${arc.firstNode.y} A2 ${this.options.arc_height}, 0, 0 1, ${arc.secondNode.x} ${arc.secondNode.y}`)
                .attr("fill","none")
                .attr("stroke", "black");
            });

        this.tangle.arcs.filter(arc => arc.type==="bottom").forEach(arc => {
            this.location.append('path')
                .attr("d", `M${arc.firstNode.x} ${arc.firstNode.y} A2 ${this.options.arc_height}, 0, 0 0, ${arc.secondNode.x} ${arc.secondNode.y}`)
                .attr("fill","none")
                .attr("stroke", "black");
            });
    }




    }




