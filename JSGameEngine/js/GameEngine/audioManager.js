import { AudioFiles } from './resources.js';

class AudioManager {
    constructor() {
        this.jump = new Audio(AudioFiles.jump.src);
        this.backgroundSong = new Audio(AudioFiles.background.src);
        this.truck = new Audio(AudioFiles.truck.src);
        this.truck.loop = true;
        this.truck.autoplay = true;
        this.truck.muted = true;
        this.backgroundSong.loop = true;
        this.backgroundSong.autoplay = true;
        this.backgroundSong.muted = true;

        document.addEventListener('click', () => 
        {
            this.backgroundSong.play().then(() => 
            {
                this.backgroundSong.muted = false;
            });

            this.truck.play().then(() => 
            {
                this.truck.muted = false;
            });
            
        });
    }
    
    jumpSound() {
        this.jump.play();
    }

    truckSound() {
        this.truck.play();
    }

    playBackgroundSong() {
        this.backgroundSong.volume = 0.1; // Adjust the volume here (0.0 to 1.0)
        this.backgroundSong.play();
    }
}

export default AudioManager;
