import Component from "./component.js";
import Renderer from "./renderer.js";

class SpriteAnimator {
    constructor(spriteSheetUrl, frameWidth, frameHeight, animationSpeed) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheetUrl;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.animationSpeed = animationSpeed;
        this.frames = [];
        this.currentFrameIndex = 0;
    }

    addFrame(x, y) {
        this.frames.push({ x, y });
    }

    update() {
        this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
    }

    render(context, x, y) {
        const frame = this.frames[this.currentFrameIndex];
        context.drawImage(
            this.spriteSheet,
            frame.x,
            frame.y,
            this.frameWidth,
            this.frameHeight,
            x,
            y,
            this.frameWidth,
            this.frameHeight
        );
    }

    play() {
        this.animationInterval = setInterval(() => {
            this.update();
        }, this.animationSpeed);
    }

    stop() {
        clearInterval(this.animationInterval);
    }
}

// Usage example:
const animator = new SpriteAnimator('spriteSheet.png', 32, 32, 100);
animator.addFrame(0, 0);
animator.addFrame(32, 0);
animator.addFrame(64, 0);
animator.play();
