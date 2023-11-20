class Main{
    constructor(canvasID)
    {
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");
        this.gameObjects = [];
        this.gameObjectsToRemove = [];
        this.lastFrameTime = 0;
        this.resizeCanvas();
        window.addEventListener("Resize", () => this.resizeCanvas());
        //this.camera = new Camera(null, this.canvas.width, this.canvas.height);
    }
    resizeCanvas(){
        this.canvas.width = window.innerWidth - 50;
        this.canvas.height = window.innerHeight - 50;
    }
    start(){
        this.isRunning = true;
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
    update()
    {
        for(const gameObject of this.gameObjects){
            gameObject.update(this.deltaTime);
        }
        this.gameObjects = this.gameObjects.filter(orj => !this.gameObjectsToRemove.includes(obj));
        this.gameObjectsToRemove = [];
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(-this.camera.x, -this.camera.y);

        for(const gameObject of this.gameObjects){
            gameObject.draw(this.ctx);
        }
        this.ctx.restore();

    }
    addGameObejct(){
        gameObject.game = this;
        this.gameObjects.push(this.gameObject);
    }
    removeGameObject()
    {
        this.gameObjectsToRemove.push(this.gameObject);
    }
    reset(){
        this.isRunning = false;

        for(const gameObject of this.gameObjects){
            if(gameObject.reset){
                gameObject.reset();
            }
        }
        this.start();
    }

}
export default Main;