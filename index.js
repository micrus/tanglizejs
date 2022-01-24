import { GraphVisualizer, Diagram, Tangle, TangleVisualizer } from "./src/main.js";


$('#btn-dfa').click(function() {
   //Diagram from arc
   let arcs = document.getElementById('input-dfa').value;
   if(arcs.trim().length !== 0) {
   
   clear();

   let diagram = new Diagram(arcs);
   let graphVisualizer = new GraphVisualizer(diagram, "#graph-box", 500, 300);
   graphVisualizer.draw();


}});

$('#btn-tfa').click(function() {
    //Tangle from arc
    let arcs = document.getElementById('input-tfa').value;
    if(arcs.trim().length !== 0) {
        
        clear();
        
        let tangle = new Tangle(arcs);
        let tangleVisualizer = new TangleVisualizer(tangle, "#graph-box", 500, 300);
        tangleVisualizer.draw();
    }
 });
 
$('#btn-tfpa').click(function() {
    //Tangle from process algebra
    let processAlgebra = document.getElementById('input-tfpa').value;
    if(processAlgebra.trim().length !== 0){ 
    clear();
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5000/',
        contentType: 'application/json',
        crossDomain:true,
        dataType: 'json',
        data: `{"pa":"${processAlgebra}"}`, 
        headers:{
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*",
        },
        success: function(msg){
            clear();

            let diagram = new Diagram(msg.result);
            let graphVisualizer = new TangleVisualizer(diagram.toTangle(), "#graph-box", 500, 300);
            graphVisualizer.draw();
        }
    });

}

 });
 

let clear = () => {
    $("#graph-box").empty();
}


