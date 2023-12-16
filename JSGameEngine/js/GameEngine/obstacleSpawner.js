import Obstacle from '../Game/obstacle.js';
import Player from '../Game/player.js';

class ObstacleSpawner {
    constructor(player) {
      this.player = player;
      this.obstacles = [];
      this.spawnInterval = 2000;
      this.spawnTimer = 0;
    }
  
    update(deltaTime) {
      this.spawnTimer += deltaTime;

      if (this.spawnTimer >= this.spawnInterval) {
        this.spawnTimer = 0;
  
        this.spawnObstacle();
      }
  
      this.obstacles.forEach((obstacle) => {
        obstacle.update(deltaTime);
      });
    }
  
    spawnObstacle() {
      const playerPosition = { x: this.player.x, y: this.Player.y };
  
      const spawnX = playerPosition.x + 100;
      const spawnY = playerPosition.y;

      const obstacle = new Obstacle(spawnX, spawnY);

      this.obstacles.push(obstacle);

      this.player.game.addGameObject(obstacle);
    }
  }
  
  export default ObstacleSpawner;