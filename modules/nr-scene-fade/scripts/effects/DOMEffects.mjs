export function createScanlines(overlay, opts) {
  const cssClass = 'nr-effect-scanlines';
  return {
    cssClass,
    apply() { overlay.classList.add(cssClass); },
    remove() { overlay.classList.remove(cssClass); }
  };
}

export function createGlitchLine(overlay, opts) {
  const el = document.createElement('div');
  el.className = 'nr-effect-glitch-line nr-active';
  el.style.background = opts.accentColor || '#00ff41';
  overlay.appendChild(el);
  return {
    cssClass: 'nr-effect-glitch-line',
    apply() {},
    remove() { el.remove(); }
  };
}

export function createGlitchText(overlay, opts) {
  const targets = overlay.querySelectorAll('.nr-inner h1, .nr-inner h2, .nr-inner h3, .nr-inner p, .nr-inner blockquote');
  const cssClass = 'nr-effect-glitch-text';
  return {
    cssClass,
    apply() {
      targets.forEach((el) => {
        el.classList.add(cssClass);
        el.setAttribute('data-text', el.textContent);
      });
    },
    remove() {
      targets.forEach((el) => {
        el.classList.remove(cssClass);
        el.removeAttribute('data-text');
      });
    }
  };
}

export function createChromaticAberration(overlay, opts) {
  const targets = overlay.querySelectorAll('.nr-inner h1, .nr-inner h2, .nr-inner h3, .nr-inner p');
  const cssClass = 'nr-effect-chromatic';
  return {
    cssClass,
    apply() {
      targets.forEach((el) => {
        el.classList.add(cssClass);
        el.setAttribute('data-text', el.textContent);
      });
    },
    remove() {
      targets.forEach((el) => {
        el.classList.remove(cssClass);
        el.removeAttribute('data-text');
      });
    }
  };
}

export function createNeonBorder(overlay, opts) {
  const inner = overlay.querySelector('.nr-inner');
  const cssClass = 'nr-effect-neon-border';
  return {
    cssClass,
    apply() {
      if (inner) {
        inner.classList.add(cssClass);
        inner.style.borderColor = opts.accentColor || '#f0d000';
      }
    },
    remove() {
      if (inner) inner.classList.remove(cssClass);
    }
  };
}

export function createTypewriter(overlay, opts) {
  const targets = overlay.querySelectorAll('.nr-inner h1, .nr-inner h2, .nr-inner h3');
  const cssClass = 'nr-effect-typewriter';
  return {
    cssClass,
    apply() {
      targets.forEach((el) => el.classList.add(cssClass));
    },
    remove() {
      targets.forEach((el) => el.classList.remove(cssClass));
    }
  };
}
