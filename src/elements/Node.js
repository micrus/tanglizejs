export class Node{

    constructor(id, x , y){
        this.id = id;
        this.x=x;
        this.y=y;
        //Here will be added options
    }

    updateLocation(newX, newY){
        this.x=newX;
        this.y=newY;
    }
}
