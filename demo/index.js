import { SpriteAnimation, SpriteRenderer } from '../src';

const canvas = document.querySelector('.js-canvas');

const image = new Image();
image.src = './assets/attack.png';

const spriteAnimation = new SpriteAnimation({
    image,
    duration: 1,
    frames: [
        { x: 0, y: 0, width: 150, height: 150 },
        { x: 150 * 1, y: 0, width: 150, height: 150 },
        { x: 150 * 2, y: 0, width: 150, height: 150 },
        { x: 150 * 3, y: 0, width: 150, height: 150 },
        { x: 150 * 4, y: 0, width: 150, height: 150 },
        { x: 150 * 5, y: 0, width: 150, height: 150 },
        { x: 150 * 6, y: 0, width: 150, height: 150 },
        { x: 150 * 7, y: 0, width: 150, height: 150 },
    ],
});

spriteAnimation.play();

const spriteRenderer = new SpriteRenderer(spriteAnimation, {
    width: 500,
    height: 500,
    canvas,
    background: 'rgba(0, 0, 0, 1)',
    clear: false,
});

function start() {
    resize();
    tick();
}

function resize() {
    spriteRenderer.resize(500, 500);
}

function tick() {
    spriteAnimation.update();
    spriteRenderer.render();

    requestAnimationFrame(tick);
}

start();

/**
 * Sprite
 */

// const sprite = new SpriteAnimation({
//     image: 'assets/attack.png', // document.querySelector('.js-image')
//     duration: 1,
//     frames: [], // JSON file, String to load json...
// });

// sprite.duration = 2;
// console.log(sprite.isPlaying)
// sprite.play();// Loop: true/false?
// sprite.stop();// Loop: true/false?
// sprite.pause();// Loop: true/false?
// sprite.goToAndPause(frame);// Loop: true/false?
// sprite.goToAndPlay(frame);// Loop: true/false?
// sprite.playFromTo(frameStart, frameEnd); // Loop: true/false?
// sprite.update(time, delta);
// sprite.getFrame(); // frame: int (default is current frame) - outputs frame datas such as x, y, width, height
// sprite.destroy(value);

// --> Handle custom data to find frames in the image
// --> Handle texture packer json to find frames in the image

/**
 * Sprite renderer
 */

// const spriteRenderer = new SpriteRenderer(sprite, {
//     width: 100,
//     height: 100,
//     canvas,
// });

// console.log(spriteRender.canvas);
// console.log(spriteRender.width);
// console.log(spriteRender.height);
// spriteRenderer.resize(width, height);
// spriteRenderer.update(time, delta);
// spriteRenderer.destroy(value);
