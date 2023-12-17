const Images = {
    player: new Image(),
    idle1: new Image(),
    idle2: new Image(),
    idle3: new Image(),
    idle4: new Image(),
    idle5: new Image(),
    jump: new Image(),
    run1: new Image(),
    run2: new Image(),
    run3: new Image(),
    run4: new Image(),
    run5: new Image(),
    run6: new Image(),
    run7: new Image(),
    run8: new Image(),
    run9: new Image(),
    run10: new Image(),
    run11: new Image(),
    run12: new Image(),
    run13: new Image(),
    run14: new Image(),
    run15: new Image(),
    enemy1: new Image(),
    enemy2: new Image(),
};

const AudioFiles = {
    jump: new Audio(),
    background: new Audio(),
    truck: new Audio(),
};

AudioFiles.jump.src = './resources/audio/jump.mp3';
AudioFiles.background.src = './resources/audio/background.mp3';
AudioFiles.truck.src = './resources/audio/truck.mp3';

Images.player.src = './resources/images/player/Player1.png';

Images.idle1.src = './resources/images/player/idle/Idle1.png';
Images.idle2.src = './resources/images/player/idle/Idle2.png';
Images.idle3.src = './resources/images/player/idle/Idle3.png';
Images.idle4.src = './resources/images/player/idle/Idle4.png';
Images.idle5.src = './resources/images/player/idle/Idle5.png';

Images.jump.src = './resources/images/player/jump/Jump.png';

Images.run1.src = './resources/images/player/run/Run1.png'; 
Images.run2.src = './resources/images/player/run/Run2.png'; 
Images.run3.src = './resources/images/player/run/Run3.png'; 
Images.run4.src = './resources/images/player/run/Run4.png'; 
Images.run5.src = './resources/images/player/run/Run5.png'; 
Images.run6.src = './resources/images/player/run/Run6.png'; 
Images.run7.src = './resources/images/player/run/Run7.png'; 
Images.run8.src = './resources/images/player/run/Run8.png'; 
Images.run9.src = './resources/images/player/run/Run9.png'; 
Images.run10.src = './resources/images/player/run/Run10.png'; 
Images.run11.src = './resources/images/player/run/Run11.png'; 
Images.run12.src = './resources/images/player/run/Run12.png'; 
Images.run13.src = './resources/images/player/run/Run13.png'; 
Images.run14.src = './resources/images/player/run/Run14.png'; 
Images.run15.src = './resources/images/player/run/Run15.png'; 

Images.enemy1.src = "./resources/images/truck/truck1.png"
Images.enemy2.src = "./resources/images/truck/truck2.png"

export {Images, AudioFiles};