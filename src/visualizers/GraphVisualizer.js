import { GRAPH_OPTION } from "./constants.js";

export class GraphVisualizer {
    constructor(tangle, location, width, height, options = GRAPH_OPTION){
       
        this.options= {...GRAPH_OPTION, ...options};
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

        this.tangle.nodes.forEach(node => {node.x = this.xScale(node.id); node.y = this.height/2});
        this.tangle.arcs.forEach(arc => {arc.firstNode.x = this.xScale(arc.firstNode.id); arc.firstNode.y = this.height/2;
                                         arc.secondNode.x = this.xScale(arc.secondNode.id); arc.secondNode.y = this.height/2;})

    }
   
   
   
    draw() {
    this.drawMainLine();
    this.options.arc_line ==="straight"?this.drawStraightArcs():this.drawZigZagArcs();
    this.drawNodes();
    

    }


    drawMainLine(){
        this.location.append("line")
        .attr("id", "main-line")
        .attr("x1", this.xScale(this.tangle.getMinimumNode()-1))
        .attr("x2", this.xScale(this.tangle.getHigherNode()+1))
        .attr("y1", this.height/2)
        .attr("y2", this.height/2)
        .attr("stroke", "black")
    }

    drawNodes(){
        this.tangle.nodes.forEach(node => {
            this.location.append('circle')
                .attr("id", `node-${node.id}`)
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", this.options.dot_ray)
                .attr("fill", this.options.dot_color)
                .attr("stroke", "black");
            });
    }

    drawStraightArcs(){
        this.tangle.arcs.forEach(arc => {
            this.location.append('path')
                .attr("d", `M${arc.firstNode.x} ${arc.firstNode.y} A2 1, 0, 0 1, ${arc.secondNode.x} ${arc.secondNode.y}`)
                .attr("fill","none")
                .attr("stroke", "black");
            });
    }

    drawZigZagArcs(){
        this.tangle.arcs.forEach(arc => {
            const transX = (arc.firstNode.x + arc.secondNode.x) / 2;
            const transY = arc.firstNode.y;

            const svg = this.location.append("g")
            .attr("transform", `translate(${transX},${transY})`)
            .attr("fill", "none")
            .attr("stroke", "black");

            const radius = (arc.secondNode.x - arc.firstNode.x) / 2;
            const nSpikes = (2/3)*radius;
            const data = d3.range(nSpikes+1).map(d => [(-Math.PI / 2)+(Math.PI) / (nSpikes / d), d % 2 ? radius - 5 : radius + 5]);
            const generator = d3.lineRadial();
            svg.append("path").attr("d", generator(data));
        })



    }




}
