# Sprites renderer

Sprites renderer is a small tool to make it easier to manage sprites animations. It is made to be flexible for different use cases such as Canvas 2D context, Canvas WebGL Context or more...

## Demo

-   [Basic](https://leochocolat.github.io/sprites-renderer/demo/?example=Basic)
-   [Canvas2d](https://leochocolat.github.io/sprites-renderer/demo/?example=Canvas2d)
-   [Threejs1](https://leochocolat.github.io/sprites-renderer/demo/?example=Threejs1)
-   [Threejs2](https://leochocolat.github.io/sprites-renderer/demo/?example=Threejs2)
-   [TexturePacker](https://leochocolat.github.io/sprites-renderer/demo/?example=TexturePacker)
-   More to come...

## Installation

```bash
npm install github:leochocolat/sprites-renderer
```

## Usage

### Using Sprite Renderer & Sprite Manager

The basic usage is to setup a sprites manager and a sprite renderer.

```js
import { SpritesManager, SpriteRenderer } from 'sprites-renderer';

const spritesManager = new SpritesManager({
    image: document.querySelector('img'), // Spritesheet image dom element 
    frames: [
        { x: 0, y: 0, width: 150, height: 150 },
        { x: 150 * 1, y: 0, width: 150, height: 150 },
        { x: 150 * 2, y: 0, width: 150, height: 150 },
        { x: 150 * 3, y: 0, width: 150, height: 150 },
        { x: 150 * 4, y: 0, width: 150, height: 150 },
        { x: 150 * 5, y: 0, width: 150, height: 150 },
        { x: 150 * 6, y: 0, width: 150, height: 150 },
        { x: 150 * 7, y: 0, width: 150, height: 150 },
    ], // The frames data
});

const spriteRenderer = new SpriteRenderer(spritesManager, {
    canvas, // The canvas dom element
    width: 500, // Canvas width
    height: 500, // Canvas height
    background: 'rgba(0, 0, 0, 1)', // fillStyle value of the background
    clear: false, // whether or not to call a clearRect() on the canvas
});

function tick() {
    spriteRenderer.render();

    requestAnimationFrame(tick);
}

tick();
```

Then you can use any tween library you like to update the frameIndex to handle the animation:

```js
// ...

const timeline = new gsap.timeline({ repeat: -1 });
    timeline.fromTo(
        spritesManager,
        {
            frameIndex: 0
        }, 
        {
            duration: 2,
            frameIndex: spritesManager.frames.length,
            ease: 'none'
        }
    );
```

Note that a modifier is applied to the frameIndex value, with a Math.floor and a modulo using the amount of frames:

```js
console.log(spritesManager.frames.length) // Output 8

spritesManager.frameIndex = 1.1;
console.log(spritesManager.frameIndex) // Output: 1

spritesManager.frameIndex = 7.9;
console.log(spritesManager.frameIndex) // Output: 7

spritesManager.frameIndex = 8;
console.log(spritesManager.frameIndex) // Output: 0

spritesManager.frameIndex = 9;
console.log(spritesManager.frameIndex) // Output: 1
```

### Handling rendering yourself

For many different use case the sprite renderer is probably gonna be too restrictive. In that case you can take care of the rendering yourself and only use the sprites manager along with a nice helper function.

```js
import { SpritesManager, drawSpriteFrame } from 'sprites-renderer';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const image = document.querySelector('image');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const spritesManager = new SpritesManager({
    image: image, // Spritesheet image dom element 
    frames: [
        { x: 0, y: 0, width: 150, height: 150 },
        { x: 150 * 1, y: 0, width: 150, height: 150 },
        { x: 150 * 2, y: 0, width: 150, height: 150 },
        { x: 150 * 3, y: 0, width: 150, height: 150 },
        { x: 150 * 4, y: 0, width: 150, height: 150 },
        { x: 150 * 5, y: 0, width: 150, height: 150 },
        { x: 150 * 6, y: 0, width: 150, height: 150 },
        { x: 150 * 7, y: 0, width: 150, height: 150 },
    ], // The frames data
});


function tick() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const width = 200;
    const height = 200;
    const position = { x: 0, y: 0 };
    const currentFrame = spritesManager.frame;
    
    drawSpriteFrame(context, image, currentFrame, position.x, position.y, width, height);

    requestAnimationFrame(tick);
}

tick();
```

#### Canvas 2D

## References

### SpritesManager class

### SpriteRenderer class

### drawSpriteFrame function

## Development

```bash
npm install
```

```bash
npm run dev
```

## Roadmap

- Examples with Three.js
- Example with Texture Packer
