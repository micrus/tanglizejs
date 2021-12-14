import { GRAPH_OPTION } from "./constants.js";

export class GraphVisualizer {
    constructor(diagram, location, width, height, options = GRAPH_OPTION){
       
        this.options= {...GRAPH_OPTION, ...options};
        this.diagram = diagram;

        this.width = width;
        this.height = height;

        this.location = d3.select(location);

        this.xScale = d3.scaleLinear()
        .domain([this.diagram.getMinimumNode()-1, this.diagram.getHigherNode()+1])
        .range([100, this.width - 100]);

        this.updateLocation(this.width, this.height);


    }


    updateLocation(width, height){
        this.width = width;
        this.height = height;

        this.diagram.nodes.forEach(node => {node.x = this.xScale(node.id); node.y = this.height/2});
        this.diagram.arcs.forEach(arc => {arc.firstNode.x = this.xScale(arc.firstNode.id); arc.firstNode.y = this.height/2;
                                         arc.secondNode.x = this.xScale(arc.secondNode.id); arc.secondNode.y = this.height/2;})

    }
   
   
   
    draw() {
    this.location = this.location
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);
    
    this.drawMainLine();
    this.options.arc_line ==="straight"?this.drawStraightArcs():this.drawZigZagArcs();
    this.drawNodes();
    

    }


    drawMainLine(){
        this.location.append("line")
        .attr("id", "main-line")
        .attr("x1", this.xScale(this.diagram.getMinimumNode()-1))
        .attr("x2", this.xScale(this.diagram.getHigherNode()+1))
        .attr("y1", this.height/2)
        .attr("y2", this.height/2)
        .attr("stroke", "black")
    }

    drawNodes(){
        this.diagram.nodes.forEach(node => {
            this.location.append('circle')
                .attr("id", `node-${node.id}`)
                .attr("cx", node.x)
                .attr("cy", node.y)
                .attr("r", this.options.dot_size)
                .attr("fill", this.options.dot_color)
                .attr("stroke", "black");

            this.location.append('text')
                .attr("x", node.x - (this.options.dot_size/2))
                .attr("y", node.y + this.options.dot_size + 10)
                .attr("dy", ".35em")
                .text(node.id);
            });
    }

    drawStraightArcs(){
        this.diagram.arcs.forEach(arc => {
            this.location.append('path')
                .attr("d", `M${arc.firstNode.x} ${arc.firstNode.y} A2 ${this.options.arc_height}, 0, 0 1, ${arc.secondNode.x} ${arc.secondNode.y}`)
                .attr("fill","none")
                .attr("stroke", "black");
            });
    }

    drawZigZagArcs(){
        this.diagram.arcs.forEach(arc => {
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
