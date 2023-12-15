const Images = {
    player: new Image(),
    player2: new Image(),
    player3: new Image(),
    enemy: new Image(),
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

Images.enemy.src = "./resources/images/truck/truck.png"

export {Images, AudioFiles};