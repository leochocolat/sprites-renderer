export default class SpritesManager {
    constructor(options = {}) {
        // Props
        this._image = options.image;
        this._frames = options.frames;

        // Setup
        this._frameIndex = 0;
    }

    /**
     * Getters & Setters
     */
    get image() {
        return this._image;
    }

    get frames() {
        return this._frames;
    }

    get frameIndex() {
        return this._frameIndex;
    }

    set frameIndex(index) {
        this._frameIndex = Math.floor(index % this._frames.length);
    }

    get frame() {
        return this._frames[this._frameIndex];
    }

    /**
     * Public
     */
    destroy() {
        this._image = null;
        this._frames = null;
        this._frameIndex = null;
    }

    /**
     * Get a specific frame object
     * @param {number} frame
     * @returns {object}
     */
    getFrame(frame) {
        if (isNaN(parseInt(frame))) return this.frame;

        return this._frames[index];
    }
}
