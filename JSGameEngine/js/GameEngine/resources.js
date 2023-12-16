const Images = {
    player: new Image(),
    player2: new Image(),
    player3: new Image(),
    enemy1: new Image(),
    enemy2: new Image(),
};

const AudioFiles = {
    jump: new Audio(),
    background: new Audio(),
};

AudioFiles.jump.src = './resources/audio/jump.mp3';
AudioFiles.background.src = './resources/audio/background.mp3';

Images.player.src = './resources/images/player/Player1.png';
Images.player2.src = './resources/images/player/Player2.png'; 
Images.player3.src = './resources/images/player/Player3.png'; 

Images.enemy1.src = "./resources/images/truck/truck1.png"
Images.enemy2.src = "./resources/images/truck/truck2.png"

export {Images, AudioFiles};