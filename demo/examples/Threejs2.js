import { SpritesManager } from '../../src/index';
import { gsap } from 'gsap';
import { BoxGeometry, Mesh, PerspectiveCamera, Scene, ShaderMaterial, Texture, WebGLRenderer } from 'three';

export default class Threejs2 {
    constructor() {
        this._image = this._createImage();
        this._canvas = this._createCanvas();
        this._spritesManager = this._createSpritesManager();
        this._renderer = this._createRenderer();
        this._texture = this._createTexture();
        this._scene = this._createScene();
        this._camera = this._createCamera();
        this._box = this._createBox();

        this._resize(window.innerWidth, window.innerHeight);
        this._setupEventListeners();
        this._start();
    }

    _start() {
        this._tick();

        const timeline = new gsap.timeline({
            repeat: -1,
            onUpdate: () => {
                this._box.material.uniforms.uFrameOffsetX.value = this._spritesManager.frame.x / this._spritesManager.image.width;
                this._box.material.uniforms.uFrameOffsetY.value = this._spritesManager.frame.y / this._spritesManager.image.height;
                this._box.material.uniforms.uFrameScaleX.value = this._spritesManager.frame.width / this._spritesManager.image.width;
                this._box.material.uniforms.uFrameScaleY.value = this._spritesManager.frame.height / this._spritesManager.image.height;
            },
        });

        timeline.fromTo(this._spritesManager, { frameIndex: 0 }, { duration: 0.8, frameIndex: this._spritesManager.frames.length, ease: 'none' });
    }

    _createImage() {
        const image = new Image();
        image.src = 'assets/attack.png';
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

    _createRenderer() {
        const renderer = new WebGLRenderer({
            antialias: true,
            canvas: this._canvas,
            alpha: true,
        });
        return renderer;
    }

    _createTexture() {
        const texture = new Texture(this._spritesManager.image);
        texture.needsUpdate = true;
        return texture;
    }

    _createScene() {
        const scene = new Scene();
        return scene;
    }

    _createCamera() {
        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 2;
        return camera;
    }

    _createBox() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new ShaderMaterial({
            uniforms: {
                uMap: { value: this._texture },
                uFrameOffsetX: { value: 0 },
                uFrameOffsetY: { value: 0 },
                uFrameScaleX: { value: 0 },
                uFrameScaleY: { value: 0 },
            },
            vertexShader:
            `
                // Varyings
                varying vec2 vUv;
                varying vec4 vPosition;
                
                void main() {
                    vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    pos.xyz /= pos.w;
                
                    vUv = uv;
                    vPosition = pos;
                
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                // Varyings
                varying vec2 vUv;

                // Uniforms
                uniform sampler2D uMap;
                uniform float uFrameOffsetX;
                uniform float uFrameOffsetY;
                uniform float uFrameScaleX;
                uniform float uFrameScaleY;
                
                void main() {
                    vec2 frameUv = vUv * vec2(uFrameScaleX, uFrameScaleY);
                    frameUv.x += uFrameOffsetX;
                    frameUv.y += uFrameOffsetY;

                    gl_FragColor = texture2D(uMap, frameUv);
                    gl_FragColor.a = 1.0;
                }
            `,
        });

        const mesh = new Mesh(geometry, material);

        this._scene.add(mesh);

        return mesh;
    }

    _tick() {
        this._update();
        this._render();

        window.requestAnimationFrame(this._tick.bind(this));
    }

    _update() {
        this._box.rotation.x += 0.005;
        this._box.rotation.y += 0.005;
        this._box.rotation.z += 0.005;
    }

    _render() {
        this._renderer.render(this._scene, this._camera);
    }

    _resize(width, height) {
        this._renderer.setSize(width, height, true);
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
    }

    /**
     * Events
     */
    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler.bind(this));
    }

    _resizeHandler() {
        this._resize(window.innerWidth, window.innerHeight);
    }
}
