export default class SpriteRenderer {
    constructor(spriteAnimation, options = {}) {
        // Props
        this._spriteAnimation = spriteAnimation;

        this._width = options.width;
        this._height = options.height;
        this._canvas = options.canvas;
        this._background = options.background;
        this._clear = options.clear;

        // Setup
        this._context = this._canvas.getContext('2d');
    }

    /**
     * Getters & Setters
     */
    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get canvas() {
        return this._canvas;
    }

    get context() {
        return this._context;
    }

    /**
     * Public
     */
    render() {
        this._context.fillStyle = this._background;
        this._context.fillRect(0, 0, this._width, this._height);
        if (this._clear) this._context.clearRect(0, 0, this._width, this._height);

        this.drawSpriteFrame();
    }

    destroy() {
        this._width = null;
        this._height = null;
    }

    resize(width, height) {
        this._width = width;
        this._height = height;

        this._canvas.width = this._width;
        this._canvas.height = this._height;
    }

    /**
     * Private
     */
    drawSpriteFrame() {
        const image = this._spriteAnimation.image;
        const frame = this._spriteAnimation.frame;

        this._context.drawImage(
            image,
            frame.x,
            frame.y,
            frame.width,
            frame.height,
            0,
            0,
            this._width,
            this._height
        );
    }
}
