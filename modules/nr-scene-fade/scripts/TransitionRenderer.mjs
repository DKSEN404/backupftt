import { MODULE_ID, EFFECTS_DOM, EFFECTS_CANVAS } from './constants.mjs';
import * as DOMEffects from './effects/DOMEffects.mjs';
import * as CanvasEffects from './effects/CanvasEffects.mjs';

export class TransitionRenderer {
  #options;
  #domEffects = [];
  #canvasEffects = [];
  #canvasCtx = null;
  #animationId = null;
  #startTime = 0;
  #progress = 0;

  constructor(options) {
    this.#options = options;
  }

  async play() {
    this.#startTime = Date.now();
    const overlay = document.getElementById('nr-scene-fade-overlay');
    if (!overlay) return;

    this.#setupCanvas(overlay);
    this.#initEffects(overlay);

    this.#domEffects.forEach((e) => { if (e.apply) e.apply(); });

    if (this.#canvasEffects.length) {
      this.#startCanvasLoop();
    }

    await this.#waitDuration();
  }

  async outro() {
    this.#stopCanvasLoop();

    const overlay = document.getElementById('nr-scene-fade-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.5s ease-out';
      overlay.style.opacity = '0';
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  #setupCanvas(overlay) {
    const canvasEl = overlay.querySelector('canvas#nr-cfx-canvas');
    if (!canvasEl) return;

    const rect = overlay.getBoundingClientRect();
    canvasEl.width = rect.width || window.innerWidth;
    canvasEl.height = rect.height || window.innerHeight;
    this.#canvasCtx = canvasEl.getContext('2d');
  }

  #initEffects(overlay) {
    const selectedDom = this.#options.domEffects || [];
    const selectedCanvas = this.#options.canvasEffects || [];
    const factoryMap = {
      'scanlines': DOMEffects.createScanlines,
      'glitch-line': DOMEffects.createGlitchLine,
      'glitch-text': DOMEffects.createGlitchText,
      'chromatic-aberration': DOMEffects.createChromaticAberration,
      'neon-border': DOMEffects.createNeonBorder,
      'typewriter': DOMEffects.createTypewriter
    };
    const canvasFactoryMap = {
      'digital-rain': CanvasEffects.createDigitalRain,
      'particles': CanvasEffects.createParticles,
      'static-noise': CanvasEffects.createStaticNoise,
      'cyber-grid': CanvasEffects.createCyberGrid
    };

    this.#domEffects = selectedDom
      .filter((id) => factoryMap[id])
      .map((id) => factoryMap[id](overlay, this.#options));

    this.#canvasEffects = selectedCanvas
      .filter((id) => canvasFactoryMap[id])
      .map((id) => canvasFactoryMap[id](this.#canvasCtx, this.#options));
  }

  #startCanvasLoop() {
    const loop = () => {
      this.#progress = (Date.now() - this.#startTime) / (this.#options.duration || 4000);
      if (this.#progress >= 1) return;

      this.#renderCanvas();
      this.#animationId = requestAnimationFrame(loop);
    };
    loop();
  }

  #renderCanvas() {
    const ctx = this.#canvasCtx;
    if (!ctx) return;

    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.clearRect(0, 0, w, h);

    this.#canvasEffects.forEach((effect) => {
      if (effect?.render) {
        effect.render(ctx, this.#progress, w, h);
      }
    });
  }

  #stopCanvasLoop() {
    if (this.#animationId) {
      cancelAnimationFrame(this.#animationId);
      this.#animationId = null;
    }
  }

  async #waitDuration() {
    const duration = this.#options.duration || 4000;
    await new Promise((r) => setTimeout(r, duration));
  }

  destroy() {
    this.#stopCanvasLoop();
    this.#domEffects.forEach((e) => { if (e.remove) e.remove(); });
    this.#domEffects = [];
    this.#canvasEffects = [];
    this.#canvasCtx = null;
  }
}
