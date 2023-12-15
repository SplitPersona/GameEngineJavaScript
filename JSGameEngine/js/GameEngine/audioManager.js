import {AudioFiles} from './resources.js';

class AudioManager {
    constructor() {
        this.jump = new Audio(AudioFiles.jump.src);
        this.backgroundSong = new Audio(AudioFiles.background.src);
        this.backgroundSong.loop = true;
    }

    jumpSound() {
        this.jump.play();
    }

    playBackgroundSong() {
        this.backgroundSong.play();
    }
}


export default AudioManager;