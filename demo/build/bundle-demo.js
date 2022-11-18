
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var SpriteAnimation = /*#__PURE__*/function () {
    function SpriteAnimation() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, SpriteAnimation);
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
    _createClass(SpriteAnimation, [{
      key: "image",
      get: function get() {
        return this._image;
      }
    }, {
      key: "isPlaying",
      get: function get() {
        return this._isPlaying;
      }
    }, {
      key: "isPaused",
      get: function get() {
        return this._isPaused;
      }
    }, {
      key: "isLooping",
      get: function get() {
        return this._isLooping;
      }
    }, {
      key: "duration",
      get: function get() {
        return this._duration;
      },
      set: function set(duration) {
        this._duration = duration;
      }
    }, {
      key: "frameIndex",
      get: function get() {
        return this._frameIndex;
      }
    }, {
      key: "frame",
      get: function get() {
        return this._frames[Math.floor(this._frameIndex)];
      }

      /**
       * Public
       */
    }, {
      key: "update",
      value: function update(time, delta) {
        if (!this._isPlaying) return;
        this._frameIndex += 0.05;
        this._frameIndex = this._frameIndex % this._frames.length;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._image = null;
        this._duration = null;
        this._frames = null;
        this._frameIndex = null;
        this._isPlaying = false;
        this._isPaused = false;
        this._isLooping = false;
      }
    }, {
      key: "play",
      value: function play() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this._isPlaying = true;
        this._isPaused = false;
        this._isLooping = options.loop;
      }
    }, {
      key: "pause",
      value: function pause() {
        this._isPlaying = false;
        this._isPaused = true;
      }
    }, {
      key: "stop",
      value: function stop() {
        this._frameIndex = 0;
        this._isPlaying = false;
        this._isPaused = false;
      }
    }, {
      key: "goToAndPlay",
      value: function goToAndPlay() {
        var frame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this._frameIndex = frame;
        this.play(options);
      }
    }, {
      key: "goToAndPause",
      value: function goToAndPause() {
        var frame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this._frameIndex = frame;
        this.pause();
      }
    }, {
      key: "playFromTo",
      value: function playFromTo() {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this._isLooping = options.loop;
      }
    }, {
      key: "getFrame",
      value: function getFrame(frame) {
        if (isNaN(parseInt(frame))) return this.frame;
        return this._frames[index];
      }

      /**
       * Private
       */
    }]);
    return SpriteAnimation;
  }();

  var SpriteRenderer = /*#__PURE__*/function () {
    function SpriteRenderer(spriteAnimation) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, SpriteRenderer);
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
    _createClass(SpriteRenderer, [{
      key: "width",
      get: function get() {
        return this._width;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      }
    }, {
      key: "canvas",
      get: function get() {
        return this._canvas;
      }
    }, {
      key: "context",
      get: function get() {
        return this._context;
      }

      /**
       * Public
       */
    }, {
      key: "render",
      value: function render() {
        this._context.fillStyle = this._background;
        this._context.fillRect(0, 0, this._width, this._height);
        if (this._clear) this._context.clearRect(0, 0, this._width, this._height);
        this.drawSpriteFrame();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._width = null;
        this._height = null;
      }
    }, {
      key: "resize",
      value: function resize(width, height) {
        this._width = width;
        this._height = height;
        this._canvas.width = this._width;
        this._canvas.height = this._height;
      }

      /**
       * Private
       */
    }, {
      key: "drawSpriteFrame",
      value: function drawSpriteFrame() {
        var image = this._spriteAnimation.image;
        var frame = this._spriteAnimation.frame;
        this._context.drawImage(image, frame.x, frame.y, frame.width, frame.height, 0, 0, this._width, this._height);
      }
    }]);
    return SpriteRenderer;
  }();

  var canvas = document.querySelector('.js-canvas');
  var image = new Image();
  image.src = './assets/attack.png';
  var spriteAnimation = new SpriteAnimation({
    image: image,
    duration: 1,
    frames: [{
      x: 0,
      y: 0,
      width: 150,
      height: 150
    }, {
      x: 150 * 1,
      y: 0,
      width: 150,
      height: 150
    }, {
      x: 150 * 2,
      y: 0,
      width: 150,
      height: 150
    }, {
      x: 150 * 3,
      y: 0,
      width: 150,
      height: 150
    }, {
      x: 150 * 4,
      y: 0,
      width: 150,
      height: 150
    }, {
      x: 150 * 5,
      y: 0,
      width: 150,
      height: 150
    }, {
      x: 150 * 6,
      y: 0,
      width: 150,
      height: 150
    }, {
      x: 150 * 7,
      y: 0,
      width: 150,
      height: 150
    }]
  });
  spriteAnimation.play();
  var spriteRenderer = new SpriteRenderer(spriteAnimation, {
    width: 500,
    height: 500,
    canvas: canvas,
    background: 'rgba(0, 0, 0, 1)',
    clear: false
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

}));
