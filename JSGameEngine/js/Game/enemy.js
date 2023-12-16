import GameObject from "../GameEngine/gameobject.js";
import Renderer from "../GameEngine/renderer.js";
import Physics from "../GameEngine/physics.js";
import {Images} from "../GameEngine/resources.js"

import Player from "./player.js";
import Platform from "./platform.js";
import animatorCompiler from '../GameEngine/animatorCompiler.js';

class Enemy extends GameObject {
    constructor(x, y) {
      super(x, y);
      this.addComponent(new Renderer('green', 300, 100, Images.enemy));
      this.addComponent(new Physics({ x: 100, y: 0 }, { x: 0, y: 0 }));

      this.addComponent(new animatorCompiler());
      this.getComponent(animatorCompiler).addAnimation([Images.enemy1]);
      this.getComponent(animatorCompiler).addAnimation([Images.enemy2, Images.enemy1]); 

      this.movementDistance = 0;
      //this.movementLimit = 100;
      this.movingRight = true;

      this.speedIncreaseRate = 5; // Speed increase rate per second
      this.speedIncreaseTimer = 0; // Timer to track the duration of holding the button
    }

    
    update(deltaTime) {
      const physics = this.getComponent(Physics);

      if (this.movingRight) {
        if (this.movementDistance < this.movementLimit) {
          this.speedIncreaseTimer += deltaTime; // Increase the timer
          physics.velocity.x = 150 + this.speedIncreaseRate * this.speedIncreaseTimer; // Increase velocity based on time
          this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
          this.getComponent(Renderer).gameObject.direction = 1;
        } else {
            this.movingRight = true;
            this.movementLimit = Infinity;
          this.movementDistance = 0;
        }

      } 
      
      else 
      
      {
        if (this.movementDistance < this.movementLimit) {
          physics.velocity.x = -50;
          this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
          this.getComponent(Renderer).gameObject.direction = -1;
        } else {
          this.movingRight = true;
          this.movementDistance = 0;
        }
      }

      const player = this.game.gameObjects.find(obj => obj instanceof Player);

      if (physics.isColliding(player.getComponent(Physics))) {
        player.collidedWithEnemy();
      }
  
      const platforms = this.game.gameObjects.filter(obj => obj instanceof Platform);
      this.isOnPlatform = false;

      for (const platform of platforms) 
      {
        if (physics.isColliding(platform.getComponent(Physics))) {
          physics.velocity.y = 0;
          physics.acceleration.y = 0;
          this.y = platform.y - this.getComponent(Renderer).height;
          this.isOnPlatform = true;
        }
      }
      let anim = this.getComponent(animatorCompiler);
      anim.currentAnimation = 1;
      anim.speed = 1;

      super.update(deltaTime);
    }
  }
      export default Enemy;
