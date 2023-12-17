import GameObject from "../GameEngine/gameobject.js";
import Renderer from "../GameEngine/renderer.js";
import Physics from "../GameEngine/physics.js";
import Input from "../GameEngine/input.js";
import {Images} from "../GameEngine/resources.js"
import Platform from "../Game/platform.js"
import Collectible from "../Game/collectible.js"
import Enemy from "../Game/enemy.js"
import ParticleSystem from "../GameEngine/particleSystem.js";
import AudioManager from '../GameEngine/audioManager.js';
import animatorCompiler from '../GameEngine/animatorCompiler.js';
import Obstacle from '../Game/obstacle.js';

class Player extends GameObject{
    constructor(x,y){
        super(x,y);
        this.renderer = new Renderer("blue", 50,50, Images.player);
        this.addComponent(this.renderer);
        this.addComponent(new Physics({x:0,y:0}, {x:0,y:0}));
        this.addComponent(new Input());
        
        this.addComponent(new animatorCompiler());
        this.getComponent(animatorCompiler).addAnimation([Images.idle1, Images.idle2, Images.idle3, Images.idle4, Images.idle5]);
        this.getComponent(animatorCompiler).addAnimation([Images.run15, Images.run14, Images.run13, Images.run12, Images.run11, Images.run10, Images.run9, Images.run8,Images.run7, Images.run6, Images.run5, Images.run4, Images.run3, Images.run2, Images.run1]); 
        this.getComponent(animatorCompiler).addAnimation([Images.jump]);
        this.isJumpKeyDown = false;
        this.audioManager = new AudioManager();
        this.direction = 1;
        this.lives = 1;
        this.score = 0;
        this.hscore = 0;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 250;
        this.jumpTime = 0.3;
        this.jumpTimer = 0;
        this.isInvulnerable = false;
        this.isGamepadMovement = false;
        this.isGamepadJump = false;
        this.canRunRight = true;

        this.speedIncreaseRate = 6; // Speed increase rate per second
        this.speedIncreaseTimer = 0; // Timer to track the duration of holding the button
    }

    update(deltaTime){
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);

        this.handleGamepadInput(input);
        
        if(!this.isGamepadMovement && input.isKeyDown("ArrowRight")){
            this.speedIncreaseTimer += deltaTime; // Increase the timer
            physics.velocity.x = 155 + this.speedIncreaseRate * this.speedIncreaseTimer; // Increase velocity based on time
            this.direction = -1;
        }else if(!this.isGamepadMovement && input.isKeyDown("ArrowLeft")){
            this.speedIncreaseTimer += deltaTime; // Increase the timer
            physics.velocity.x = -155 - this.speedIncreaseRate * this.speedIncreaseTimer; // Increase velocity based on time
            this.direction = 1; 
        }else if(!this.isGamepadMovement){
            physics.velocity.x = 0;
            this.speedIncreaseTimer = 0; // Reset the timer when the button is released
        }

        if(!this.isGamepadJump && input.isKeyDown("ArrowUp")&& this.isOnPlatform){
            this.startJump();
        }
        if(this.isJumping){
            this.updateJump(deltaTime);
        }
        const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
        for(const collectible of collectibles){
            if(physics.isColliding(collectible.getComponent(Physics))){
                this.collect(collectible);
                this.game.removeGameObject(collectible);
            }
        }
        const enemies = this.game.gameObjects.filter((obj)=> obj instanceof Enemy);
        for(const enemy of enemies){
            if(physics.isColliding(enemy.getComponent(Physics))){
                this.collidedWithEnemy();
            }
        }

        this.isOnPlatform = false; 
        const platforms = this.game.gameObjects.filter((obj)=> obj instanceof Platform);
        for (const platform of platforms){
            if(physics.isColliding(platform.getComponent(Physics))){
                if(!this.isJumping){
                    physics.velocity.y = 0;
                    physics.acceleration.y = 0;
                    this.y = platform.y - this.renderer.height; 
                    this.isOnPlatform = true;
                }
            }
        }
        if(this.y>this.game.canvas.height){
            this.resetPlayerState();
        }
        if(this.lives<=0){
            location.reload();
            //this.resetGame();
        }

        if(this.score === 0){
            this.increaseScore();
        }

        let anim = this.getComponent(animatorCompiler);
        // Check if the entity is moving upwards (jumping)
        if (physics.velocity.y > 0) 
        {
            // Set animation to the jump animation
            anim.currentAnimation = 2;

            // Set animation speed for the jump animation
            anim.animationspeed = 1;
        }
        // Check if the entity is not moving horizontally (standing still)
        else if (physics.velocity.x == 0) 
        {
            // Set animation to the idle animation
            anim.currentAnimation = 0;
            anim.animationspeed = 3;
        }
        // If the entity is moving horizontally
        else 
        {
            // Set animation to the walk/run animation
            anim.currentAnimation = 1;
            anim.animationspeed = 50;
        }

        const obstacles = this.game.gameObjects.filter((obj) => obj instanceof Obstacle);
        for (const obstacle of obstacles) {
            if (physics.isColliding(obstacle.getComponent(Physics))) {
                this.collidedWithObstacle();
            }
            else {
                this.canRunRight = true;
            }
        }

        if (!this.canRunRight && this.getComponent(Physics).velocity.x > 0) {
            this.getComponent(Physics).velocity.x = 0;
        }

        super.update(deltaTime);
    }

    handleGamepadInput(input){
        const gamepad = input.getGamepad();
        const physics = this.getComponent(Physics);
        if(gamepad){
            this.isGamepadMovement = false; 
            this.isGamepadJump = false; 

            const horizontalAxis = gamepad.axes[0];
            if (horizontalAxis > 0.1){
                this.speedIncreaseTimer += deltaTime; // Increase the timer
                physics.velocity.x = 155 + this.speedIncreaseRate * this.speedIncreaseTimer; // Increase velocity based on time
                this.direction = -1;
            }
            else if(horizontalAxis < -0.1){
                this.speedIncreaseTimer += deltaTime; // Increase the timer
                physics.velocity.x = -155 - this.speedIncreaseRate * this.speedIncreaseTimer; // Increase velocity based on time
                this.direction = 1;  
            }
            else{
                physics.velocity.x = 0;
                this.speedIncreaseTimer = 0; // Reset the timer when the button is released
            }
            if(input.isGamepadButtonDown(0) && this.isOnPlatform){
                this.isGamepadJump = true; 
                this.startJump();
            }
        }
    }
        startJump(){
            if(this.isOnPlatform){
                this.isJumping = true; 
                this.jumpTimer = this.jumpTime; 
                this.getComponent(Physics).velocity.y = -this.jumpForce; 
                this.isOnPlatform = false; 
                
                this.audioManager.jumpSound();
            }
        }
        updateJump(deltaTime){
            this.jumpTimer -= deltaTime; 
            if(this.jumpTimer<=0||this.getComponent(Physics).velocity.y >0){
                this.isJumping = false; 
            }
        }

        collidedWithObstacle() {
            this.canRunRight = false;
            this.speedIncreaseTimer = 0; // Reset the timer when the button is released
        }

        collidedWithEnemy()
        {
            if(!this.isInvulnerable){
                this.lives--;
                this.isInvulnerable = true; 
                setTimeout(() =>{
                    this.isInvulnerable = false;
                }, 2000);
            }
        }

        increaseScore() 
        {
            if (!this.scoreInterval) {  // Check if the interval is already set
                this.scoreInterval = setInterval(() => {
                    this.score += 1;
                    console.log(`Score: ${this.score}`);
                    if(this.score >= this.hscore){
                        this.hscore = this.score; 
                        console.log(`High Score: ${this.hscore}`);
                    }
                }, 1000);  // Set the interval to 1000ms (1 second)
            }
        }

        /*collect(collectible){
        this.score += collectible.value; 
        console.log(`Score: ${this.score}`);
        this.emitCollectParticles(collectible);
        }*/

        emitCollectParticles(){
            const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
            this.game.addGameObject(particleSystem);
        }
        resetPlayerState(){
            this.x = this.game.canvas.width/2;
            this.y = this.game.canvas.height/2;
            this.getComponent(Physics).velocity = {x:0,y:0};
            this.getComponent(Physics).acceleration = {x:0,y:0};
            this.direction =1; 
            this.isOnPlatform = false; 
            this.isJumping = false; 
            this.jumpTimer = 0;
        }
        resetGame(){
            this.lives = 1;
            this.score = 0;
            this.resetPlayerState();
        }
    }
        export default Player;