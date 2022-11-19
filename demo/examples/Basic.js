import { SpritesManager, SpriteRenderer } from '../../src/index';
import { gsap } from 'gsap';

export default class Basic {
    constructor() {
        this._image = this._createImage();
        this._canvas = this._createCanvas();
        this._spritesManager = this._createSpritesManager();
        this._spriteRenderer = this._createSpriteRenderer();

        this._start();
    }

    _start() {
        this._tick();

        const timeline = new gsap.timeline({ repeat: -1 });
        timeline.fromTo(this._spritesManager, { frameIndex: 0 }, { duration: 0.8, frameIndex: this._spritesManager.frames.length, ease: 'none' });
    }

    _createImage() {
        const image = new Image();
        image.src = '/assets/attack.png';
        return image;
    }

    _createCanvas() {
        const canvas = document.querySelector('.js-canvas');
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';
        canvas.style.margin = 'auto';
        return canvas;
    }

    _createSpritesManager() {
        const width = 150;
        const height = 150;

        const spritesManager = new SpritesManager({
            image: this._image,
            frames: [
                { x: 0, y: 0, width, height },
                { x: width * 1, y: 0, width, height },
                { x: width * 2, y: 0, width, height },
                { x: width * 3, y: 0, width, height },
                { x: width * 4, y: 0, width, height },
                { x: width * 5, y: 0, width, height },
                { x: width * 6, y: 0, width, height },
                { x: width * 7, y: 0, width, height },
            ],
        });

        return spritesManager;
    }

    _createSpriteRenderer() {
        const spriteRenderer = new SpriteRenderer(
            this._spritesManager,
            {
                width: 500,
                height: 500,
                canvas: this._canvas,
                background: 'rgba(0, 0, 0, 1)',
                clear: false,
            }
        );
        return spriteRenderer;
    }

    _tick() {
        this._spriteRenderer.render();

        window.requestAnimationFrame(this._tick.bind(this));
    }
}
