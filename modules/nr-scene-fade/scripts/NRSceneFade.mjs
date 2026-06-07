import { MODULE_ID, TEMPLATES } from './constants.mjs';
import { TransitionRenderer } from './TransitionRenderer.mjs';
import * as Socket from './SocketManager.mjs';

let _instance = null;

export default class NRSceneFade {
  #overlay;
  #renderer;
  #isActive = false;
  #resolveCurrent = null;
  #currentOptions = null;
  #audio = null;
  #playGen = 0;

  #onKeyDown = (e) => {
    if (e.key === 'Escape' && this.#isActive) {
      e.stopPropagation();
      const gmEndAll = this.#currentOptions?.gmEndAll ?? true;
      this.stop(true);
      if (gmEndAll) {
        Socket.executeForEveryone({ action: 'stop' });
      }
    }
  };

  constructor() {
    if (_instance) return _instance;
    _instance = this;
  }

  static get instance() {
    if (!_instance) new NRSceneFade();
    return _instance;
  }

  get isActive() {
    return this.#isActive;
  }

  async play(options = {}) {
    this.#playGen++;
    const myGen = this.#playGen;

    if (this.#isActive) await this.stop(true);
    if (this.#playGen !== myGen) return;
    this.#isActive = true;
    this.#currentOptions = options;
    document.addEventListener('keydown', this.#onKeyDown);

    const defaults = game.settings.get(MODULE_ID, 'default-options') || {};
    const merged = foundry.utils.mergeObject(foundry.utils.mergeObject({}, defaults), options);

    if (typeof merged.bgImg !== 'string') merged.bgImg = '';
    if (typeof merged.audio !== 'string') merged.audio = '';
    if (typeof merged.content !== 'string') merged.content = '';
    if (typeof merged.rawContent !== 'string') merged.rawContent = '';
    if (typeof merged.customCSS !== 'string') merged.customCSS = '';

    await this.#createOverlay(merged);
    if (this.#playGen !== myGen) return;
    await this.#fadeIn(merged);
    if (this.#playGen !== myGen) return;

    if (merged.activateScene && merged.sceneId) {
      const scene = game.scenes?.get(merged.sceneId);
      if (scene) await scene.view();
    }

    if (merged.audio) {
      this.#playAudio(merged);
    }

    this.#renderer = new TransitionRenderer({ ...merged, duration: merged.delay || 7000 });
    this.#renderer.play();

    const displayTime = merged.delay || 7000;
    await new Promise((r) => setTimeout(r, displayTime));

    if (this.#playGen !== myGen || !this.#isActive) return;

    await this.#fadeOut(merged);
    this.#cleanup();

    if (this.#resolveCurrent) {
      this.#resolveCurrent({ forced: false });
      this.#resolveCurrent = null;
    }
  }

  async stop(force = false) {
    if (!this.#isActive) return;

    if (force) {
      this.#cleanup();
      if (this.#resolveCurrent) {
        this.#resolveCurrent({ forced: true });
        this.#resolveCurrent = null;
      }
      return;
    }

    this.#stopAudio();

    if (this.#renderer) {
      await this.#renderer.outro();
    }

    this.#cleanup();
    if (this.#resolveCurrent) {
      this.#resolveCurrent({ forced: false });
      this.#resolveCurrent = null;
    }
  }

  async #createOverlay(options) {
    if (game.user?.isGM && options.gmHide) {
      this.#overlay = null;
      return;
    }

    const isVideo = this.#isVideo(options.bgImg || '');
    const sourceType = this.#getVideoType(options.bgImg || '');
    const zIndex = (game.user?.isGM || options.showUI) ? 5000 : 1;

    const content = options.rawContent || options.content || '';

    const data = {
      content,
      customCSS: options.customCSS || '',
      fullscreen: !!options.fullscreen,
      bgImg: options.bgImg || null,
      bgColor: options.bgColor || '#0a0a0a',
      accentColor: options.accentColor || '#00ff41',
      fontColor: options.fontColor || '#f0d000',
      fontSize: options.fontSize || 28,
      isVideo,
      sourceType,
      bgLoop: options.bgLoop ?? true,
      bgMuted: options.bgMuted ?? true,
      bgSize: options.bgSize || 'cover',
      bgPos: options.bgPos || 'center center',
      bgOpacity: options.bgOpacity ?? 0.95,
      zIndex,
      fontFamily: options.fontFamily || "'Share Tech Mono', 'Courier New', monospace",
      hasCanvasEffects: !!(options.canvasEffects?.length)
    };

    const html = await renderTemplate(TEMPLATES.OVERLAY, data);
    document.body.insertAdjacentHTML('beforeend', html);
    const wrapper = document.getElementById('nr-scene-fade-overlay');
    this.#overlay = wrapper;

    const canvasEl = wrapper?.querySelector('#nr-cfx-canvas');
    if (canvasEl) canvasEl.style.zIndex = zIndex + 1;

    const contentWrapper = wrapper?.querySelector('.nr-content-wrapper');
    if (contentWrapper) contentWrapper.style.zIndex = zIndex + 2;
  }

  async #fadeIn(options) {
    const overlay = this.#overlay;
    if (!overlay) return;
    const fadeIn = options.fadeIn || 800;
    overlay.style.transition = `opacity ${fadeIn}ms ease`;
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
    await new Promise((r) => setTimeout(r, fadeIn));
  }

  async #fadeOut(options) {
    const overlay = this.#overlay;
    if (!overlay) return;
    const fadeOut = options.fadeOut || 1000;
    overlay.style.transition = `opacity ${fadeOut}ms ease`;
    overlay.style.opacity = '0';
    await new Promise((r) => setTimeout(r, fadeOut));
  }

  #cleanup() {
    document.removeEventListener('keydown', this.#onKeyDown);
    this.#stopAudio();

    if (this.#renderer) {
      this.#renderer.destroy();
      this.#renderer = null;
    }

    const overlay = document.getElementById('nr-scene-fade-overlay');
    if (overlay) overlay.remove();
    this.#overlay = null;
    this.#isActive = false;
    this.#currentOptions = null;
  }

  #isVideo(src) {
    if (!src || typeof src !== 'string') return false;
    const ext = src.split('.').pop()?.split('?')[0]?.toLowerCase();
    return ext === 'webm' || ext === 'mp4';
  }

  #getVideoType(src) {
    if (!src || typeof src !== 'string') return 'video/mp4';
    if (src.toLowerCase().endsWith('webm')) return 'video/webm';
    return 'video/mp4';
  }

  #playAudio(options) {
    const src = options.audio;
    if (!src) return;
    if (game.audio.locked) {
      console.log(`${MODULE_ID} | Audio playback locked`);
      return;
    }
    const volume = options.volume ?? 0.7;
    const loop = options.audioLoop ?? false;
    AudioHelper.play({ src, volume, loop }, false).then((audio) => {
      this.#audio = audio;
    }).catch((err) => {
      console.warn(`${MODULE_ID} | Audio playback failed:`, err);
    });
  }

  #stopAudio() {
    if (this.#audio) {
      this.#audio.stop();
    }
    this.#audio = null;
  }

  async executeAction(options) {
    if (options?.action === 'stop') {
      await this.stop(true);
      return;
    }

    await this.stop(true);
    return this.play(options);
  }
}
