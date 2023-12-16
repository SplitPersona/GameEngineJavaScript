import {Images} from "../GameEngine/resources.js"
import Component from "./component.js";
import Renderer from "./renderer.js";

class animatorCompiler extends Component {


    constructor(){
        super();
        this.animations = []; 
        this.frame = 0;
        this.animationspeed = 3;
        this.currentAnimation = 0;
    }
    
    addAnimation(animation)
    {
        this.animations.push(animation);
    }
    
    update(deltaTime){
        this.frame += deltaTime * this.animationspeed;

        if(this.frame >= this.animations[this.currentAnimation].length)
        {
            this.frame = 0;
        }
        let renderer = this.gameObject.getComponent(Renderer);
        renderer.image = this.animations[this.currentAnimation][Math.floor(this.frame)];
    }
}

export default animatorCompiler;
