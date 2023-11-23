import Component from "./component";

class Renderer extends Component{
    constructor(color = "white", width = 50, height = 50, image = null){
        super();
        this.color = this.color;
        this.width = this.width;
        this.height = this.height;
        this.image = this.image;
    }
    draw(ctx){
        if(this.image && this.image.complete){
            const x = this.GameObject.x;
            const y = this.GameObject.y;
            const w = this.width;
            const h = this.height;

            const flipX = this.GameObject.direction === -1;
            if(!flipX){
                ctx.drawImage(this.image,x,y,w,h);
            }
            else {
                ctx.save();
                ctx.translate(x+w, y);
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, 0 ,0,w,h);
                ctx.restore();
            }
        }
        else{
            ctx.fillStyle - this.color;
            ctx.fillRect(this.GameObject.x, this.GameObject.y, this.width, this.height);
        }

    }
}
