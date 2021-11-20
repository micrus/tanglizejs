
class Tangle{

    constructor(width, height, nodes){

        //Calculate the proportions
        this.heigth = height;
        this.width = width;
        this.nodes = new Array();


        this.xScale = d3.scaleLinear()
        .domain([0, nodes+1])
        .range([100, width - 100]);


        //Construct necessary nodes 
        for (let i = 0; i<nodes; i++){
            this.nodes.push(new Node(i+1, this.xScale(i+1), height/2));}
        

        console.log(this.nodes);

    }

    getMainLine(){
        return {
            x1 : this.xScale(0),
            x2 : this.xScale(this.nodes.length+1),
            y  : this.heigth / 2
        };
    }
}



class Node{

    constructor(id, x , y){
        this.id = id;
        this.x=x;
        this.y=y;
        this.ray = 10;
    }
}




var width = window.innerWidth;
var height = window.innerHeight;
var tangle = new Tangle(width, height, 5);
console.log(tangle);

//Create SVG element
console.log(tangle.heigth)
var svg = d3.select("body")
.append("svg")
.attr("width", tangle.width)
.attr("height", tangle.heigth);




//Create line element inside SVG
var mainLine = tangle.getMainLine();
svg.append("line")
.attr("id", "main-line")
.attr("x1", mainLine.x1)
.attr("x2", mainLine.x2)
.attr("y1", mainLine.y)
.attr("y2", mainLine.y)
.attr("stroke", "black")
   
//Add the nodes to the line
tangle.nodes.forEach(node => {
    svg.append('circle')
    .attr("id", `node-${node.id}`)
    .attr("cx", node.x)
    .attr("cy", node.y)
    .attr("r", node.ray);
})


d3.select(window).on("resize", draw);

function draw() {
    width = window.innerWidth;
    svg.attr("width", width);

    var xScale = d3.scaleLinear()
    .domain([1,2])
    .range([100, width - 100]);


    d3.select('#main-line').attr("x1", xScale(1))
    .attr("x2", xScale(2))
    .attr("y1", 50)
    .attr("y2", 50)
    .attr("stroke", "black");
       
}






