const FONT_DIGITAL_RAIN = '14px "Share Tech Mono", monospace';

export function createDigitalRain(ctx, opts) {
  const cols = Math.floor(ctx.canvas.width / 14);
  const drops = Array(cols).fill(0);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
  let fontSet = false;

  return {
    render(ctx, progress, w, h) {
      const accent = opts.accentColor || '#00ff41';
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, w, h);

      if (!fontSet) { ctx.font = FONT_DIGITAL_RAIN; fontSet = true; }
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 14;
        const y = drops[i] * 14;

        ctx.fillStyle = accent;
        ctx.fillText(char, x, y);

        if (y > h * 0.8 && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
  };
}

export function createParticles(ctx, opts) {
  const p = [];
  const count = 120;
  const accent = opts.accentColor || '#00ff41';
  for (let i = 0; i < count; i++) {
    p.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.004,
      vy: (Math.random() - 0.5) * 0.004,
      r: Math.random() * 2 + 0.5,
      a: Math.random() * 0.6 + 0.2
    });
  }

  return {
    render(ctx, progress, w, h) {
      for (const pt of p) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.x < 0 || pt.x > 1) pt.vx *= -1;
        if (pt.y < 0 || pt.y > 1) pt.vy *= -1;

        ctx.beginPath();
        ctx.arc(pt.x * w, pt.y * h, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = pt.a * (1 - progress * 0.5);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  };
}

export function createStaticNoise(ctx, opts) {
  let imageData = null;
  return {
    render(ctx, progress, w, h) {
      if (!imageData || imageData.width !== w || imageData.height !== h) {
        imageData = ctx.createImageData(w, h);
      }
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = Math.random() * 60;
      }
      ctx.putImageData(imageData, 0, 0);
    }
  };
}

export function createCyberGrid(ctx, opts) {
  const accent = opts.accentColor || '#00ff41';
  const spacing = 60;
  let frame = 0;

  return {
    render(ctx, progress, w, h) {
      frame++;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3 + Math.sin(frame * 0.02) * 0.1;

      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + Math.sin(frame * 0.01 + x * 0.01) * 5, h);
        ctx.stroke();
      }

      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + Math.sin(frame * 0.01 + y * 0.01) * 5);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }
  };
}
