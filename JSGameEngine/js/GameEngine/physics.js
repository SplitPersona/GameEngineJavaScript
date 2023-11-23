import Component from "./component";
import Renderer from "./renderer";

class physics extends Component
{
    constructor(velocity = {x:0,y:0}, acceleration = {x:0,y:0}, gravity = {x:0,y:300})
    {
        super();
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.gravity = gravity;
    }

    update(deltaTime){
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += (this.acceleration.y + this.gravity) * deltaTime;
        this.GameObject.x += this.velocity.x * deltaTime;
        this.GameObject.y += this.velocity.y * deltaTime;
    }

    isColliding(OtherPhysics){
        const [left, right, top, bottom] = this.getBoundingBox();
        const [otherLeft, otherRight, otherTop, otherBottom] = OtherPhysics.getBoundingBox;

        return left< otherRight && right>otherLeft && top<otherBottom && bottom<otherTop;
       
    }

    getBoundingBox(){
        const renderer = this.GameObject.getComponent(Renderer);
        const left = this.GameObject.x;
        const right = this.GameObject.x + renderer.width;
        const top = this.GameObject.y;
        const bottom = this.GameObject.y + renderer.height;
    }
}

export default physics;