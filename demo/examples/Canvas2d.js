import { SpritesManager, drawSpriteFrame } from '../../src/index';
import { gsap } from 'gsap';

export default class Canvas2d {
    constructor() {
        this._image = this._createImage();
        this._canvas = this._createCanvas();
        this._context = this._canvas.getContext('2d');
        this._spritesManager = this._createSpritesManager();
        this._positions = this._createPositions();

        this._resize(window.innerWidth, window.innerHeight);
        this._setupEventListeners();
        this._start();
    }

    _start() {
        this._tick();

        const timeline = new gsap.timeline({ repeat: -1 });
        timeline.fromTo(this._spritesManager, { frameIndex: 0 }, { duration: 0.8, frameIndex: this._spritesManager.frames.length, ease: 'none' });
    }

    _createImage() {
        const image = new Image();
        image.src = '../assets/attack.png';
        return image;
    }

    _createCanvas() {
        const canvas = document.querySelector('.js-canvas');
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

    _createPositions() {
        const positions = [];
        const amount = 100;

        for (let index = 0; index < amount; index++) {
            positions.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
        }

        return positions;
    }

    _tick() {
        this._draw();

        window.requestAnimationFrame(this._tick.bind(this));
    }

    _draw() {
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        const width = 300;
        const height = 300;
        const currentFrame = this._spritesManager.frame;

        for (let index = 0; index < this._positions.length; index++) {
            const position = this._positions[index];
            drawSpriteFrame(this._context, this._image, currentFrame, position.x, position.y, width, height);
        }
    }

    _resize(width, height) {
        this._canvas.width = width;
        this._canvas.height = height;
    }

    /**
     * Events
     */
    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler.bind(this));
    }

    _resizeHandler() {
        this._resize(window.innerWidth, window.innerHeight);
        this._positions = this._createPositions();
    }
}
