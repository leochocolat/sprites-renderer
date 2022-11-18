export default class SpriteAnimation {
    constructor(options = {}) {
        // Props
        this._image = options.image;
        this._duration = options.duration;
        this._frames = options.frames;

        // Setup
        this._frameIndex = 0;
        this._isPlaying = false;
        this._isPaused = false;
        this._isLooping = false;
    }

    /**
     * Getters & Setters
     */
    get image() {
        return this._image;
    }

    get isPlaying() {
        return this._isPlaying;
    }

    get isPaused() {
        return this._isPaused;
    }

    get isLooping() {
        return this._isLooping;
    }

    get duration() {
        return this._duration;
    }

    set duration(duration) {
        this._duration = duration;
    }

    get frameIndex() {
        return this._frameIndex;
    }

    get frame() {
        return this._frames[Math.floor(this._frameIndex)];
    }

    /**
     * Public
     */
    update(time, delta) {
        if (!this._isPlaying) return;

        this._frameIndex += 0.05;
        this._frameIndex = this._frameIndex % this._frames.length;
    }

    destroy() {
        this._image = null;
        this._duration = null;
        this._frames = null;
        this._frameIndex = null;
        this._isPlaying = false;
        this._isPaused = false;
        this._isLooping = false;
    }

    play(options = {}) {
        this._isPlaying = true;
        this._isPaused = false;
        this._isLooping = options.loop;
    }

    pause() {
        this._isPlaying = false;
        this._isPaused = true;
    }

    stop() {
        this._frameIndex = 0;
        this._isPlaying = false;
        this._isPaused = false;
    }

    goToAndPlay(frame = 0, options = {}) {
        this._frameIndex = frame;
        this.play(options);
    }

    goToAndPause(frame = 0) {
        this._frameIndex = frame;
        this.pause();
    }

    playFromTo(from = 0, to, options = {}) {
        this._isLooping = options.loop;
    }

    getFrame(frame) {
        if (isNaN(parseInt(frame))) return this.frame;

        return this._frames[index];
    }

    /**
     * Private
     */
}
