import Game from "../GameEngine/game.js";
import Player from "./player.js";
import Enemy from "./enemy.js";
import PlayerUI from "./playerUI.js";
import Platform from "./platform.js";
import Collectible from "./collectible.js";
import Obstacle from "./obstacle.js";

class Level extends Game {
  constructor(canvasId) {
    super(canvasId);

    const player = new Player(this.canvas.width / 2 - 25, this.canvas.height / 2 - 25);
    this.addGameObject(player);

    this.addGameObject(new PlayerUI(10, 10));

    this.camera.target = player;

    const platformWidth = 10000;

    const movingPlatform = new Platform(0, this.canvas.height - 50, platformWidth, 50);
    this.addGameObject(movingPlatform);

    this.addGameObject(new Enemy(-50, this.canvas.height - 90));
    const movingEnemy = new Enemy(this.canvas.width, this.canvas.height - 90);
    movingEnemy.velocity = { x: -2, y: 0 };
    this.addGameObject(movingEnemy);

    //this.addGameObject(new Collectible(250, this.canvas.height - 100, 20, 20));
    //this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    //this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));

    this.spawnObstacle();
    setInterval(() => {
      this.deleteObstacle();
      this.spawnObstacle();
    }, 120000);
  }

  spawnObstacle() {
    const obstacleWidth = 100;
    const obstacleHeight = 50;
    const obstacleX = this.canvas.width + obstacleWidth;
    const obstacleY = this.canvas.height - 50 - obstacleHeight / 2;
    const obstacle = new Obstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
    this.addGameObject(obstacle);
  }

  deleteObstacle() {
    const obstacles = this.gameObjects.filter(obj => obj instanceof Obstacle);
    if (obstacles.length > 0) {
      const obstacle = obstacles[0];
      this.removeGameObject(obstacle);
    }
  }
}

export default Level;
