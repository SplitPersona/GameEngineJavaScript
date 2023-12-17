import GameObject from "../GameEngine/gameobject.js";
import Renderer from "../GameEngine/renderer.js";
import Physics from "../GameEngine/physics.js";

class Obstacle extends GameObject{ // Replica of platform
    constructor(x,y,width,height,color = "gray"){
        super(x,y);
        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({x:0,y:0}, {x:0, y:0}, {x:0, y:0}));

        this.tag = "obstacle";
    }
}
export default Obstacle;