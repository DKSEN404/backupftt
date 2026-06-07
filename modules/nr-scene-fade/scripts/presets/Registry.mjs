import { MODULE_ID } from '../constants.mjs';

const _presets = new Map();

export function getPresets() {
  return _presets;
}

export function getPreset(id) {
  return _presets.get(id);
}

export function registerPreset(id, config) {
  if (_presets.has(id)) {
    console.warn(`${MODULE_ID} | Preset "${id}" already registered. Overwriting.`);
  }
  _presets.set(id, config);
}

export function initDefaultPresets() {
  registerPreset('amber-terminal', {
    id: 'amber-terminal',
    label: `${MODULE_ID}.presets.amber-terminal.label`,
    description: `${MODULE_ID}.presets.amber-terminal.description`,
    theme: {
      fontColor: '#f0d000',
      fontSize: 28,
      fontFamily: "'Share Tech Mono', 'Courier New', monospace",
      bgColor: '#0a0800',
      accentColor: '#ffaa00',
      bgOpacity: 0.95
    },
    effects: { dom: ['scanlines', 'glitch-line'], canvas: [] },
    fullscreen: true,
    customCSS: [
      '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}',
      '@keyframes gs{0%{top:0;opacity:0}3%{opacity:.8}6%{opacity:0}25%{top:25%;opacity:0}28%{opacity:.9}31%{opacity:0}55%{top:55%;opacity:0}58%{opacity:.6}61%{opacity:0}80%{top:80%;opacity:0}83%{opacity:1}86%{opacity:0}100%{top:100%;opacity:0}}',
      '@keyframes pf{0%{width:0}30%{width:35%}60%{width:68%}85%{width:88%}100%{width:100%}}',
      '@keyframes lp{0%,100%{box-shadow:0 0 15px rgba(218,41,28,.06),inset 0 0 15px rgba(218,41,28,.04)}50%{box-shadow:0 0 30px rgba(218,41,28,.12),inset 0 0 25px rgba(218,41,28,.08)}}',
      '@keyframes sw{0%{left:-100%}100%{left:100%}}',
      '.gl{position:fixed;left:0;width:100%;height:2px;background:#f0d000;z-index:99;box-shadow:0 0 10px #f0d000,0 0 30px #f0d000;opacity:0;animation:gs 6s linear infinite}',
      '.pt{width:100%;height:10px;background:rgba(240,208,0,.08);border:1px solid rgba(240,208,0,.2);overflow:hidden}',
      '.pf{height:100%;width:0;background:linear-gradient(90deg,#da291c,#f0d000);box-shadow:0 0 15px rgba(240,208,0,.3);animation:pf 3.5s ease-out .8s forwards}',
      '.lb{width:200px;height:3px;background:rgba(240,208,0,.06);position:relative;overflow:hidden;margin:8px auto 0}',
      '.lb:before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,#f0d000,transparent);animation:sw 2.5s ease-in-out infinite}'
    ].join(' '),
    rawContent: [
      '<div style="font-family:Share Tech Mono,monospace;text-align:center;padding:40px;width:100%;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#0a0a0a">',
      '<div class="gl"></div>',
      '<div style="max-width:960px;width:92%;margin:0 auto;padding:40px 50px;border:1px solid rgba(240,208,0,.25);box-shadow:0 0 20px rgba(240,208,0,.08),inset 0 0 20px rgba(240,208,0,.04);background:rgba(10,10,10,.92)">',
      '<div style="display:flex;justify-content:space-between;font-size:.6em;color:rgba(240,208,0,.4);letter-spacing:2px;margin-bottom:30px;text-transform:uppercase"><span>NOVA-RED NET v4.2</span><span style="animation:blink 1.2s step-end infinite">&#9679; EN LINEA</span><span>2045 d.C.</span></div>',
      '<div style="text-align:center;margin:20px 0 25px;padding:15px;border:1px solid rgba(218,41,28,.2);animation:lp 3s ease-in-out infinite"><pre style="color:#da291c;font-size:.7em;line-height:1.15;text-shadow:0 0 8px rgba(218,41,28,.4)">    \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n    \u2551  \u2588\u2580\u2580 \u2588 \u2588 \u2588\u2580\u2580 \u2588\u2580\u2580\u2588       \u2551\n    \u2551  \u2588\u2580\u2580 \u2580\u2534\u2580\u2534\u2580 \u2588\u2584\u2584 \u2588\u2584\u2584\u2588     \u2551\n    \u2551  \u2580\u2580\u2580  \u2580 \u2580  \u2580\u2580\u2580 \u2580  \u2580     \u2551\n    \u2551                          \u2551\n    \u2551   \u2588\u2580\u2580\u2588 \u2588 \u2588 \u2588\u2580\u2580\u2588 \u2588\u2580\u2580     \u2551\n    \u2551   \u2588\u2584\u2584\u2580 \u2588\u2584\u2588 \u2588\u2584\u2584\u2588 \u2588\u2584\u2584     \u2551\n    \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d</pre></div>',
      '<h1 style="font-size:2.2em;letter-spacing:8px;text-transform:uppercase;color:#f0d000;text-align:center;text-shadow:0 0 7px #f0d000,0 0 15px #f0d000,0 0 30px rgba(240,208,0,.4)">NOVA-RED HUB</h1>',
      '<p style="text-align:center;font-size:.75em;color:rgba(240,208,0,.35);letter-spacing:6px;margin-top:6px;text-transform:uppercase">Servidor Westmarch &#183; Cyberpunk Red</p>',
      '<p style="text-align:center;font-size:.75em;color:rgba(240,208,0,.5);letter-spacing:4px;margin:15px 0 25px"><span style="color:rgba(218,41,28,.5)">&#10022;</span> PRIM, NEVADA &#8212; INTERSTATE 15 <span style="color:rgba(218,41,28,.5)">&#10022;</span></p>',
      '<div style="font-size:.78em;line-height:2;color:#888;margin-bottom:20px"><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Inicializando modulos de juego...</div><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Handshake con <span style="color:#0fa">Nova-Red Hub</span> establecido</div><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Sincronizando datos del mundo: <span style="color:#0fa">OK</span></div><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Enlace biometrico: <span style="color:#0fa">verificado</span></div><div><span style="color:rgba(240,208,0,.7)">&gt;</span> Conexion de red: <span style="color:#f0d000">cifrado AES-256</span></div></div>',
      '<div style="margin:10px 0 20px"><p style="font-size:.7em;color:rgba(240,208,0,.6);letter-spacing:3px;margin-bottom:6px">SINCRONIZANDO LOBBY</p><div class="pt"><div class="pf"></div></div><p style="font-size:.6em;color:rgba(240,208,0,.4);text-align:right;margin-top:4px;letter-spacing:2px">100%</p></div>',
      '<div style="margin:25px 0 20px;padding:15px 20px;border-left:2px solid rgba(240,208,0,.15);background:rgba(240,208,0,.02)"><p style="font-size:.85em;font-style:italic;color:#aaa;line-height:1.6">"Alla afuera la ley la escribis con el humo de tu arma y el polvo de la interestatal. Acordate: en el yermo no hay segundas oportunidades. Solo vos, tu vehiculo y lo que quede de tu suerte."</p><p style="font-size:.65em;color:rgba(240,208,0,.4);text-align:right;margin-top:8px">&#8212; Runner, lideresa de los Aldecaldos</p></div>',
      '<div style="text-align:center;margin-top:25px;padding-top:15px;border-top:1px solid rgba(240,208,0,.08)"><p style="font-size:.7em;color:rgba(240,208,0,.35);letter-spacing:5px">CARGANDO LOBBY</p><div class="lb"></div><p style="font-size:.7em;color:rgba(240,208,0,.2);margin-top:12px"><span style="color:rgba(240,208,0,.4)">root@nova-red</span><span style="color:#666">:</span><span style="color:#0fa">~</span>$<span style="animation:blink 1s step-end infinite">_</span></p></div>',
      '</div></div>'
    ].join('\n')
  });

  registerPreset('netrunner', {
    id: 'netrunner',
    label: `${MODULE_ID}.presets.netrunner.label`,
    description: `${MODULE_ID}.presets.netrunner.description`,
    theme: {
      fontColor: '#00ff41',
      fontSize: 24,
      fontFamily: "'Share Tech Mono', 'Courier New', monospace",
      bgColor: '#000a00',
      accentColor: '#00ff41',
      bgOpacity: 0.92
    },
    effects: { dom: ['scanlines', 'glitch-text'], canvas: ['digital-rain'] },
    fullscreen: true,
    customCSS: [
      '@keyframes hex-pulse{0%,100%{opacity:.6}50%{opacity:1}}',
      '@keyframes cursor-blink{0%,100%{opacity:1}50%{opacity:0}}',
      '@keyframes data-stream{0%{background-position:0 0}100%{background-position:0 -40px}}',
      '@keyframes node-pulse{0%,100%{box-shadow:0 0 8px rgba(0,255,65,.2)}50%{box-shadow:0 0 25px rgba(0,255,65,.5)}}',
      '.dh{display:flex;justify-content:space-between;font-size:.55em;color:rgba(0,255,65,.35);letter-spacing:2px;margin-bottom:30px;text-transform:uppercase}',
      '.hg{display:inline-grid;grid-template-columns:repeat(6,1fr);gap:4px;margin:10px auto;max-width:360px;font-family:monospace;font-size:.6em;font-weight:700;text-align:center}',
      '.hc{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border:1px solid rgba(0,255,65,.15);background:rgba(0,255,65,.03);color:rgba(0,255,65,.5);font-size:.9em;border-radius:2px;animation:hex-pulse 3s ease-in-out infinite}',
      '.hc:nth-child(6n+1){animation-delay:0s}.hc:nth-child(6n+2){animation-delay:.5s}.hc:nth-child(6n+3){animation-delay:1s}.hc:nth-child(6n+4){animation-delay:1.5s}.hc:nth-child(6n+5){animation-delay:2s}.hc:nth-child(6n){animation-delay:2.5s}',
      '.hc.s{color:#00ff41;border-color:rgba(0,255,65,.5);text-shadow:0 0 6px rgba(0,255,65,.4)}',
      '.ds{font-size:.7em;line-height:2;color:rgba(0,255,65,.5);font-family:monospace}',
      '.ds>div{opacity:0;animation:node-pulse .3s ease forwards}.ds>div:nth-child(1){animation-delay:.8s}.ds>div:nth-child(2){animation-delay:1.3s}.ds>div:nth-child(3){animation-delay:1.8s}.ds>div:nth-child(4){animation-delay:2.3s}.ds>div:nth-child(5){animation-delay:2.8s}',
      '.np{width:100%;height:6px;background:rgba(0,255,65,.08);border:1px solid rgba(0,255,65,.15);overflow:hidden;border-radius:3px}'
    ].join(' '),
    rawContent: [
      '<div style="font-family:Share Tech Mono,monospace;text-align:center;padding:40px;width:100%;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;background:radial-gradient(ellipse at center,#001a00 0%,#000a00 50%,#000400 100%)">',
      '<div class="dh"><span>CYBERDECK Mk.IV</span><span style="animation:cursor-blink 1.2s step-end infinite">&#9679; CONECTADO</span><span>ICE: ACTIVO</span></div>',
      '<div style="max-width:960px;width:92%;margin:0 auto;padding:40px 50px;border:1px solid rgba(0,255,65,.2);box-shadow:0 0 25px rgba(0,255,65,.06),inset 0 0 25px rgba(0,255,65,.03);background:rgba(0,10,0,.92)">',
      '<div class="hg">',
      '<div class="hc">7C</div><div class="hc s">BD</div><div class="hc">E9</div><div class="hc s">1A</div><div class="hc">55</div><div class="hc">FF</div>',
      '<div class="hc s">1A</div><div class="hc">E9</div><div class="hc s">7C</div><div class="hc">FF</div><div class="hc">BD</div><div class="hc">55</div>',
      '<div class="hc">55</div><div class="hc">FF</div><div class="hc">BD</div><div class="hc s">7C</div><div class="hc">E9</div><div class="hc s">1A</div>',
      '<div class="hc">BD</div><div class="hc s">55</div><div class="hc">1A</div><div class="hc">E9</div><div class="hc s">FF</div><div class="hc">7C</div>',
      '<div class="hc s">FF</div><div class="hc">7C</div><div class="hc">55</div><div class="hc s">BD</div><div class="hc">1A</div><div class="hc">E9</div>',
      '<div class="hc">E9</div><div class="hc">1A</div><div class="hc s">FF</div><div class="hc">55</div><div class="hc s">7C</div><div class="hc">BD</div>',
      '</div>',
      '<h1 style="font-size:2em;letter-spacing:6px;text-transform:uppercase;color:#00ff41;text-align:center;text-shadow:0 0 7px #00ff41,0 0 15px #00ff41,0 0 30px rgba(0,255,65,.3);margin:15px 0 5px">NETRUNNER OS</h1>',
      '<p style="text-align:center;font-size:.65em;color:rgba(0,255,65,.25);letter-spacing:4px;margin:4px 0 12px;text-transform:uppercase">Protocolo de Brecha &#183; Encriptacion Cuantica</p>',
      '<div class="ds"><div><span style="color:#00ff41;text-shadow:0 0 4px rgba(0,255,65,.5)">&gt;</span> Iniciando secuencia de <span style="color:#0fa">breach protocol</span>...</div><div><span style="color:#00ff41;text-shadow:0 0 4px rgba(0,255,65,.5)">&gt;</span> ICE perimetral: <span style="color:#0fa">Raven-SYNC v3.2</span></div><div><span style="color:#00ff41;text-shadow:0 0 4px rgba(0,255,65,.5)">&gt;</span> Buffer de datos: <span style="color:#0fa">6/6 secuencias</span></div><div><span style="color:#00ff41;text-shadow:0 0 4px rgba(0,255,65,.5)">&gt;</span> Daemon <span style="color:#0fa">&#39;Sabertooth&#39;</span> cargado en RAM</div><div><span style="color:#00ff41;text-shadow:0 0 4px rgba(0,255,65,.5)">&gt;</span> Enlace neuronal: <span style="color:#0fa">sincronizado</span></div></div>',
      '<div style="margin:20px 0 15px;padding:15px 20px;border-left:2px solid rgba(0,255,65,.12);background:rgba(0,255,65,.02)"><p style="font-size:.8em;font-style:italic;color:rgba(0,255,65,.6);line-height:1.6">"La realidad es solo la capa superficial. Abajo corre el codigo crudo del mundo. Aprendi a leerlo, a reescribirlo. En la matrix no hay cerraduras que resistan, no hay secretos que el protocolo no pueda desnudar."</p><p style="font-size:.6em;color:rgba(0,255,65,.3);text-align:right;margin-top:8px">&#8212; Rache Bartmoss, <span style="color:#0fa">Legacy Archives</span></p></div>',
      '<div style="margin:10px 0 10px"><p style="font-size:.65em;color:rgba(0,255,65,.45);letter-spacing:3px;margin-bottom:6px">DESENCRIPTANDO NODO CENTRAL</p><div class="np" style="position:relative;overflow:hidden"><div style="height:100%;width:100%;background:repeating-linear-gradient(0deg,transparent,transparent 4px,rgba(0,255,65,.05) 4px,rgba(0,255,65,.05) 8px);animation:data-stream .8s linear infinite"></div><div style="position:absolute;top:0;left:0;height:100%;width:0;background:linear-gradient(90deg,#00ff41,rgba(0,255,65,.3));animation:nr-progress-fill 3.5s ease-out .8s forwards;border-radius:3px;box-shadow:0 0 10px rgba(0,255,65,.3)"></div></div><p style="font-size:.55em;color:rgba(0,255,65,.3);text-align:right;margin-top:4px;letter-spacing:2px">ACCESO CONCEDIDO</p></div>',
      '<div style="text-align:center;margin-top:20px;padding-top:12px;border-top:1px solid rgba(0,255,65,.06)"><p style="font-size:.6em;color:rgba(0,255,65,.25);letter-spacing:4px">CARGANDO INTERFAZ NEURONAL</p><div class="nr-loading-bar" style="border-color:rgba(0,255,65,.15)"></div><p style="font-size:.6em;color:rgba(0,255,65,.15);margin-top:10px"><span style="color:rgba(0,255,65,.35)">root@netrunner</span><span style="color:#666">:</span><span style="color:#0fa">~</span>$<span style="animation:cursor-blink 1s step-end infinite">_</span></p></div>',
      '</div></div>'
    ].join('\n')
  });

  registerPreset('combat', {
    id: 'combat',
    label: `${MODULE_ID}.presets.combat.label`,
    description: `${MODULE_ID}.presets.combat.description`,
    theme: {
      fontColor: '#ff2020',
      fontSize: 32,
      fontFamily: "'Orbitron', 'Share Tech Mono', sans-serif",
      bgColor: '#0a0000',
      accentColor: '#ff2020',
      bgOpacity: 0.9
    },
    effects: { dom: ['glitch-line', 'chromatic-aberration'], canvas: ['particles', 'static-noise'] },
    fullscreen: true,
    customCSS: [
      '@keyframes alarm-pulse{0%,100%{opacity:1}50%{opacity:.4}}',
      '@keyframes threat-sweep{0%{left:-100%}100%{left:100%}}',
      '@keyframes target-lock{0%,100%{box-shadow:0 0 5px rgba(255,32,32,.3),inset 0 0 5px rgba(255,32,32,.1)}50%{box-shadow:0 0 25px rgba(255,32,32,.6),inset 0 0 20px rgba(255,32,32,.2)}}',
      '@keyframes radar-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}',
      '@keyframes danger-flash{0%,100%{border-color:rgba(255,32,32,.3)}50%{border-color:rgba(255,32,32,.8)}}',
      '.sb{display:flex;justify-content:space-between;font-size:.55em;color:rgba(255,32,32,.35);letter-spacing:3px;margin-bottom:30px;text-transform:uppercase}',
      '.sb .a{color:#ff2020;text-shadow:0 0 6px rgba(255,32,32,.4)}',
      '.tm{display:flex;align-items:center;justify-content:center;gap:30px;margin:10px auto}',
      '.tr{width:100px;height:100px;border:2px solid rgba(255,32,32,.25);border-radius:50%;position:relative;animation:target-lock 2s ease-in-out infinite;display:flex;align-items:center;justify-content:center}',
      '.tr-in{width:20px;height:20px;border:2px solid #ff2020;border-radius:50%;background:rgba(255,32,32,.1);box-shadow:0 0 10px rgba(255,32,32,.4)}',
      '.tr-cr{position:absolute;width:100%;height:2px;background:rgba(255,32,32,.15)}',
      '.tr-cr.v{transform:rotate(90deg)}.tr-cr.d1{transform:rotate(45deg)}.tr-cr.d2{transform:rotate(-45deg)}',
      '.st{font-size:.65em;line-height:2.2;color:rgba(255,32,32,.5);font-family:monospace}',
      '.st>div{opacity:0;animation:target-lock .4s ease forwards}.st>div:nth-child(1){animation-delay:.6s}.st>div:nth-child(2){animation-delay:1s}.st>div:nth-child(3){animation-delay:1.4s}.st>div:nth-child(4){animation-delay:1.8s}.st>div:nth-child(5){animation-delay:2.2s}',
      '.wb{width:100%;height:4px;background:rgba(255,32,32,.1);overflow:hidden;border-radius:2px}',
      '.wb-f{height:100%;width:0;background:linear-gradient(90deg,#ff2020,#ff6600);animation:nr-progress-fill 3s ease-out .5s forwards;border-radius:2px;box-shadow:0 0 8px rgba(255,32,32,.4)}'
    ].join(' '),
    rawContent: [
      '<div style="font-family:Orbitron,Share Tech Mono,monospace;text-align:center;padding:30px;width:100%;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;background:radial-gradient(ellipse at center,#1a0000 0%,#0a0000 40%,#050000 100%)">',
      '<div class="sb"><span>&#9762; NIVEL DE AMENAZA: <span class="a" style="animation:alarm-pulse 1s step-end infinite">ALTO</span></span><span style="animation:alarm-pulse 1.2s step-end infinite">&#9679; MODO COMBATE</span><span>2045 d.C. &#8212; ZONA ROJA</span></div>',
      '<div style="max-width:960px;width:92%;margin:0 auto;padding:40px 50px;border:1px solid rgba(255,32,32,.25);box-shadow:0 0 25px rgba(255,32,32,.08),inset 0 0 20px rgba(255,32,32,.04);background:rgba(10,0,0,.92);animation:danger-flash 4s ease-in-out infinite">',
      '<div class="tm">',
      '<div class="tr"><div class="tr-cr"></div><div class="tr-cr v"></div><div class="tr-cr d1"></div><div class="tr-cr d2"></div><div class="tr-in"></div></div>',
      '<div style="text-align:left"><p style="font-size:.7em;color:rgba(255,32,32,.4);letter-spacing:2px;line-height:2"><span style="color:rgba(255,32,32,.7)">OBJETIVO:</span> <span style="color:#ff2020;text-shadow:0 0 6px rgba(255,32,32,.3)">ADQUIRIDO</span><br><span style="color:rgba(255,32,32,.7)">RANGO:</span> <span style="color:#ff2020">45m</span> &#8212; <span style="color:rgba(255,32,32,.7)">AZIMUTH:</span> <span style="color:#ff2020">280&#176;</span><br><span style="color:rgba(255,32,32,.7)">ARMAS:</span> <span style="color:#ff2020">SISTEMA OPERATIVO</span></p></div>',
      '</div>',
      '<h1 style="font-size:2.2em;letter-spacing:10px;text-transform:uppercase;color:#ff2020;text-align:center;text-shadow:0 0 7px #ff2020,0 0 20px #ff2020,0 0 40px rgba(255,32,32,.3);margin:10px 0 5px">COMBAT PROTOCOL</h1>',
      '<p style="text-align:center;font-size:.6em;color:rgba(255,32,32,.2);letter-spacing:5px;margin:4px 0 15px;text-transform:uppercase">Sistema de Combate Integrado &#183; Ciberpsicosis Latente: 62%</p>',
      '<div class="st"><div><span style="color:#ff2020;text-shadow:0 0 4px rgba(255,32,32,.5)">&gt;</span> Iniciando <span style="color:#ff6600">subrutinas tacticas</span>...</div><div><span style="color:#ff2020;text-shadow:0 0 4px rgba(255,32,32,.5)">&gt;</span> Reflejos ciberneticos: <span style="color:#0fa">calibrados</span></div><div><span style="color:#ff2020;text-shadow:0 0 4px rgba(255,32,32,.5)">&gt;</span> Armamento: <span style="color:#0fa">disponible</span> &#8212; Municion: <span style="color:#ff2020">comprobando...</span></div><div><span style="color:#ff2020;text-shadow:0 0 4px rgba(255,32,32,.5)">&gt;</span> Enlace de escuadra: <span style="color:#0fa">estable</span> (3 unidades)</div><div><span style="color:#ff2020;text-shadow:0 0 4px rgba(255,32,32,.5)">&gt;</span> Cortisol sintetico: <span style="color:#0fa">nivel optimo</span></div></div>',
      '<div style="margin:18px 0 15px;padding:12px 18px;border-left:2px solid rgba(255,32,32,.15);background:rgba(255,32,32,.02)"><p style="font-size:.75em;font-style:italic;color:rgba(255,32,32,.5);line-height:1.6">"En el fragor del combate no hay tiempo para pensar. Tu entrenamiento, tus reflejos, tu hardware. Eso es lo que te separa de los que estan alimentando a los gusanos. Recuerda: el primer tiro no se anuncia."</p><p style="font-size:.55em;color:rgba(255,32,32,.25);text-align:right;margin-top:8px">&#8212; Morgan Blackhand, Manual de Combate Urbano</p></div>',
      '<div style="margin:10px 0 10px"><p style="font-size:.6em;color:rgba(255,32,32,.4);letter-spacing:3px;margin-bottom:4px">DESPLIEGUE TACTICO</p><div class="wb"><div class="wb-f"></div></div><p style="font-size:.5em;color:rgba(255,32,32,.25);text-align:right;margin-top:3px;letter-spacing:2px">SISTEMA LISTO</p></div>',
      '<div style="text-align:center;margin-top:18px;padding-top:10px;border-top:1px solid rgba(255,32,32,.06)"><p style="font-size:.55em;color:rgba(255,32,32,.2);letter-spacing:4px">CARGANDO INTERFAZ DE COMBATE</p><div class="nr-loading-bar" style="border-color:rgba(255,32,32,.15)"></div></div>',
      '</div></div>'
    ].join('\n')
  });

  registerPreset('mystery', {
    id: 'mystery',
    label: `${MODULE_ID}.presets.mystery.label`,
    description: `${MODULE_ID}.presets.mystery.description`,
    theme: {
      fontColor: '#b080ff',
      fontSize: 26,
      fontFamily: "'Courier New', monospace",
      bgColor: '#050008',
      accentColor: '#b080ff',
      bgOpacity: 0.93
    },
    effects: { dom: ['glitch-text', 'chromatic-aberration'], canvas: ['digital-rain', 'cyber-grid'] },
    fullscreen: true,
    customCSS: [
      '@keyframes occult-pulse{0%,100%{opacity:.5;text-shadow:0 0 5px rgba(176,128,255,.2)}50%{opacity:1;text-shadow:0 0 20px rgba(176,128,255,.5)}}',
      '@keyframes rune-fade{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}',
      '@keyframes eye-dilate{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}',
      '@keyframes sigil-glow{0%,100%{box-shadow:0 0 10px rgba(176,128,255,.1),inset 0 0 10px rgba(176,128,255,.05)}50%{box-shadow:0 0 30px rgba(176,128,255,.3),inset 0 0 20px rgba(176,128,255,.1)}}',
      '@keyframes cipher-scroll{0%{background-position:0 0}100%{background-position:0 -30px}}',
      '.sh{display:flex;justify-content:space-between;font-size:.55em;color:rgba(176,128,255,.3);letter-spacing:3px;margin-bottom:30px;text-transform:uppercase}',
      '.sh .hl{color:#b080ff;text-shadow:0 0 8px rgba(176,128,255,.3)}',
      '.se{margin:10px auto;display:flex;justify-content:center;gap:8px;flex-wrap:wrap}',
      '.se span{font-size:1.8em;opacity:0;animation:rune-fade 1s ease forwards;color:rgba(176,128,255,.3)}',
      '.se span:nth-child(1){animation-delay:.3s}.se span:nth-child(2){animation-delay:.5s}.se span:nth-child(3){animation-delay:.7s}.se span:nth-child(4){animation-delay:.9s}.se span:nth-child(5){animation-delay:1.1s}.se span:nth-child(6){animation-delay:1.3s}.se span:nth-child(7){animation-delay:1.5s}.se span:nth-child(8){animation-delay:1.7s}.se span:nth-child(9){animation-delay:1.9s}.se span:nth-child(10){animation-delay:2.1s}.se span:nth-child(11){animation-delay:2.3s}.se span:nth-child(12){animation-delay:2.5s}',
      '.eo{display:flex;justify-content:center;align-items:center;gap:20px;margin:15px auto}',
      '.ey{width:60px;height:60px;border:2px solid rgba(176,128,255,.25);border-radius:50%;position:relative;animation:eye-dilate 4s ease-in-out infinite;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,rgba(176,128,255,.08),transparent)}',
      '.ey-in{width:16px;height:16px;border:1px solid rgba(176,128,255,.4);border-radius:50%;background:rgba(176,128,255,.12);box-shadow:0 0 15px rgba(176,128,255,.2),inset 0 0 8px rgba(176,128,255,.1)}',
      '.sl{font-size:.7em;line-height:2.4;color:rgba(176,128,255,.4);font-family:monospace}',
      '.sl>div{opacity:0;animation:rune-fade .6s ease forwards}.sl>div:nth-child(1){animation-delay:.8s}.sl>div:nth-child(2){animation-delay:1.3s}.sl>div:nth-child(3){animation-delay:1.8s}.sl>div:nth-child(4){animation-delay:2.3s}.sl>div:nth-child(5){animation-delay:2.8s}',
      '.pb{width:100%;height:6px;background:rgba(176,128,255,.06);border:1px solid rgba(176,128,255,.12);overflow:hidden;border-radius:3px}'
    ].join(' '),
    rawContent: [
      '<div style="font-family:Courier New,monospace;text-align:center;padding:40px;width:100%;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;background:radial-gradient(ellipse at center,#0d001a 0%,#050008 50%,#020004 100%)">',
      '<div class="sh"><span>&#9776; ARCHIVO: <span class="hl">CLASE VII</span></span><span style="animation:occult-pulse 2s ease-in-out infinite">&#9679; RED OCULTA</span><span>ACCESO: <span class="hl">RESTRINGIDO</span></span></div>',
      '<div style="max-width:960px;width:92%;margin:0 auto;padding:40px 50px;border:1px solid rgba(176,128,255,.18);box-shadow:0 0 30px rgba(176,128,255,.05),inset 0 0 30px rgba(176,128,255,.03);background:rgba(5,0,8,.92);animation:sigil-glow 6s ease-in-out infinite">',
      '<div class="eo"><div class="ey"><div class="ey-in"></div></div><div><p style="font-size:.65em;color:rgba(176,128,255,.3);letter-spacing:3px;text-transform:uppercase;line-height:1.8"><span style="color:rgba(176,128,255,.5)">SIGILO:</span> <span style="color:#b080ff;text-shadow:0 0 6px rgba(176,128,255,.3)">TERCER OJO</span><br><span style="color:rgba(176,128,255,.5)">FRECUENCIA:</span> <span style="color:#b080ff">7.83 Hz</span><br><span style="color:rgba(176,128,255,.5)">ESTADO:</span> <span style="color:#b080ff">RECEPCION</span></p></div></div>',
      '<div class="se"><span>&#x0CA0;</span><span>&#x0CA1;</span><span>&#x0CA2;</span><span>&#x0CA3;</span><span>&#x0CA5;</span><span>&#x0CA6;</span><span>&#x0CA7;</span><span>&#x0CA8;</span><span>&#x0CAA;</span><span>&#x0CAB;</span><span>&#x0CAD;</span><span>&#x0CAE;</span></div>',
      '<h1 style="font-size:1.9em;letter-spacing:7px;text-transform:uppercase;color:#b080ff;text-align:center;text-shadow:0 0 7px #b080ff,0 0 18px #b080ff,0 0 35px rgba(176,128,255,.25);margin:8px 0 4px">VOID PROTOCOL</h1>',
      '<p style="text-align:center;font-size:.6em;color:rgba(176,128,255,.2);letter-spacing:5px;margin:4px 0 12px;text-transform:uppercase">Red de Conocimiento Arcano &#183; Nodo Thelema</p>',
      '<div class="sl"><div><span style="color:#b080ff;text-shadow:0 0 4px rgba(176,128,255,.4)">&gt;</span> Estableciendo enlace con <span style="color:#0fa">Thelema Node v2.1</span>...</div><div><span style="color:#b080ff;text-shadow:0 0 4px rgba(176,128,255,.4)">&gt;</span> Protocolo de <span style="color:#0fa">encriptacion esoterica</span> activado</div><div><span style="color:#b080ff;text-shadow:0 0 4px rgba(176,128,255,.4)">&gt;</span> Canal ethernet: <span style="color:#0fa">sincronizado</span> (Rango Theta)</div><div><span style="color:#b080ff;text-shadow:0 0 4px rgba(176,128,255,.4)">&gt;</span> Grimorio digital: <span style="color:#0fa">12/12 runas decodificadas</span></div><div><span style="color:#b080ff;text-shadow:0 0 4px rgba(176,128,255,.4)">&gt;</span> Barrera psionica: <span style="color:#0fa">estable</span> &#8212; No hay intrusos</div></div>',
      '<div style="margin:18px 0 12px;padding:12px 18px;border-left:2px solid rgba(176,128,255,.12);background:rgba(176,128,255,.02)"><p style="font-size:.75em;font-style:italic;color:rgba(176,128,255,.5);line-height:1.6">"La red profunda no es un lugar. Es un estado de conciencia. Hay frecuencias que el ojo humano no percibe, verdades que la mente racional rechaza. Para ver mas alla del velo hay que estar dispuesto a perderse en el."</p><p style="font-size:.55em;color:rgba(176,128,255,.2);text-align:right;margin-top:8px">&#8212; Alt Cunningham, <span style="color:#0fa">Fragmentos de la Red</span></p></div>',
      '<div style="margin:8px 0 8px"><p style="font-size:.6em;color:rgba(176,128,255,.35);letter-spacing:3px;margin-bottom:4px">DECODIFICANDO TRANSMISION</p><div class="pb"><div style="height:100%;width:100%;background:repeating-linear-gradient(0deg,transparent 0,rgba(176,128,255,.04) 2px,transparent 4px);animation:cipher-scroll 1.5s linear infinite"></div><div style="position:absolute;top:0;left:0;height:100%;width:0;background:linear-gradient(90deg,#b080ff,rgba(176,128,255,.2));animation:nr-progress-fill 4s ease-out .6s forwards;border-radius:3px;box-shadow:0 0 10px rgba(176,128,255,.2)"></div></div><p style="font-size:.5em;color:rgba(176,128,255,.2);text-align:right;margin-top:3px;letter-spacing:2px">MENSAJE RECIBIDO</p></div>',
      '<div style="text-align:center;margin-top:15px;padding-top:10px;border-top:1px solid rgba(176,128,255,.05)"><p style="font-size:.55em;color:rgba(176,128,255,.18);letter-spacing:4px">SINCRONIZANDO CON LA RED OCULTA</p><div class="nr-loading-bar" style="border-color:rgba(176,128,255,.12)"></div></div>',
      '</div></div>'
    ].join('\n')
  });

  registerPreset('road', {
    id: 'road',
    label: `${MODULE_ID}.presets.road.label`,
    description: `${MODULE_ID}.presets.road.description`,
    theme: {
      fontColor: '#ffaa00',
      fontSize: 30,
      fontFamily: "'Share Tech Mono', 'Courier New', monospace",
      bgColor: '#0a0500',
      accentColor: '#ff6600',
      bgOpacity: 0.88
    },
    effects: { dom: ['scanlines', 'neon-border'], canvas: ['cyber-grid'] },
    fullscreen: true,
    customCSS: [
      '@keyframes speed-dash{0%{background-position:0 0}100%{background-position:-40px 0}}',
      '@keyframes heat-shimmer{0%,100%{opacity:.6}50%{opacity:1}}',
      '@keyframes fuel-drop{0%{height:100%}100%{height:12%}}',
      '@keyframes road-glow{0%,100%{box-shadow:0 0 8px rgba(255,170,0,.1),inset 0 0 8px rgba(255,170,0,.05)}50%{box-shadow:0 0 25px rgba(255,170,0,.25),inset 0 0 15px rgba(255,170,0,.1)}}',
      '@keyframes dust-drift{0%{transform:translateX(0);opacity:0}20%{opacity:.4}80%{opacity:.2}100%{transform:translateX(60px);opacity:0}}',
      '.rh{display:flex;justify-content:space-between;font-size:.55em;color:rgba(255,170,0,.3);letter-spacing:2px;margin-bottom:30px;text-transform:uppercase}',
      '.rh .hl{color:#ffaa00;text-shadow:0 0 6px rgba(255,170,0,.3)}',
      '.rd{display:flex;justify-content:center;align-items:center;gap:25px;margin:10px auto;padding:15px;background:rgba(255,170,0,.03);border:1px solid rgba(255,170,0,.1);border-radius:4px}',
      '.rd-l{font-size:.6em;color:rgba(255,170,0,.35);line-height:2;letter-spacing:1px;text-align:left}',
      '.rd-l .v{font-size:2.5em;font-weight:700;color:#ffaa00;text-shadow:0 0 10px rgba(255,170,0,.3);letter-spacing:2px}',
      '.fg{width:100%;height:8px;background:repeating-linear-gradient(90deg,rgba(255,170,0,.08) 0,rgba(255,170,0,.08) 4px,transparent 4px,transparent 8px);overflow:hidden;border-radius:4px}',
      '.fg-f{height:100%;width:0;background:linear-gradient(90deg,#ff6600,#ffaa00,#ffcc00);animation:nr-progress-fill 3.5s ease-out .5s forwards;border-radius:4px;box-shadow:0 0 8px rgba(255,170,0,.3)}',
      '.rl{font-size:.7em;line-height:2.2;color:rgba(255,170,0,.45);font-family:monospace}',
      '.rl>div{opacity:0;animation:heat-shimmer .5s ease forwards}.rl>div:nth-child(1){animation-delay:.8s}.rl>div:nth-child(2){animation-delay:1.3s}.rl>div:nth-child(3){animation-delay:1.8s}.rl>div:nth-child(4){animation-delay:2.3s}.rl>div:nth-child(5){animation-delay:2.8s}'
    ].join(' '),
    rawContent: [
      '<div style="font-family:Share Tech Mono,Courier New,monospace;text-align:center;padding:40px;width:100%;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;background:radial-gradient(ellipse at center,#1a0e00 0%,#0a0500 50%,#050200 100%)">',
      '<div class="rh"><span>RUTA: <span class="hl">I-15</span></span><span style="animation:heat-shimmer 2s ease-in-out infinite">&#9679; EN RUTA</span><span>DESTINO: <span class="hl">NIGHT CITY</span></span></div>',
      '<div style="max-width:960px;width:92%;margin:0 auto;padding:40px 50px;border:1px solid rgba(255,170,0,.2);box-shadow:0 0 25px rgba(255,170,0,.06),inset 0 0 25px rgba(255,170,0,.03);background:rgba(10,5,0,.92);animation:road-glow 5s ease-in-out infinite">',
      '<div class="rd">',
      '<div class="rd-l"><span class="v">128</span><br><span style="font-size:.7em;color:rgba(255,170,0,.25)">KM/H</span></div>',
      '<div style="width:2px;height:50px;background:rgba(255,170,0,.12)"></div>',
      '<div class="rd-l"><span style="color:rgba(255,170,0,.5);font-size:.7em">COMBUSTIBLE</span><br><div style="width:80px;height:80px;border:2px solid rgba(255,170,0,.15);border-radius:50%;position:relative;overflow:hidden;margin:4px auto 0"><div style="position:absolute;bottom:0;left:0;width:100%;height:100%;background:linear-gradient(0deg,rgba(255,170,0,.3),transparent 70%);animation:fuel-drop 3s ease-out .5s forwards"></div></div></div>',
      '<div style="width:2px;height:50px;background:rgba(255,170,0,.12)"></div>',
      '<div class="rd-l"><span style="color:rgba(255,170,0,.5);font-size:.7em">AUTONOMIA</span><br><span style="font-size:1.5em;color:#ffaa00;text-shadow:0 0 6px rgba(255,170,0,.2)">340</span><br><span style="font-size:.6em;color:rgba(255,170,0,.25)">KM</span></div>',
      '</div>',
      '<h1 style="font-size:2.1em;letter-spacing:8px;text-transform:uppercase;color:#ffaa00;text-align:center;text-shadow:0 0 7px #ffaa00,0 0 15px #ffaa00,0 0 30px rgba(255,170,0,.25);margin:10px 0 5px">NOMAD ROAD</h1>',
      '<p style="text-align:center;font-size:.6em;color:rgba(255,170,0,.2);letter-spacing:4px;margin:4px 0 12px;text-transform:uppercase">Badlands Convoy &#183; Frecuencia Aldecaldo: 142.7</p>',
      '<div class="rl"><div><span style="color:#ffaa00;text-shadow:0 0 4px rgba(255,170,0,.4)">&gt;</span> Motor: <span style="color:#0fa">OK</span> &#8212; Presion de aceite: <span style="color:#0fa">normal</span></div><div><span style="color:#ffaa00;text-shadow:0 0 4px rgba(255,170,0,.4)">&gt;</span> Navegacion: <span style="color:#0fa">enlace satelital activo</span></div><div><span style="color:#ffaa00;text-shadow:0 0 4px rgba(255,170,0,.4)">&gt;</span> Radio: <span style="color:#0fa">Aldecaldo Base</span> &#8212; Clima despejado hasta Baker</div><div><span style="color:#ffaa00;text-shadow:0 0 4px rgba(255,170,0,.4)">&gt;</span> Carga: <span style="color:#0fa">2.4t</span> &#8212; ETA: <span style="color:#0fa">6 horas</span></div><div><span style="color:#ffaa00;text-shadow:0 0 4px rgba(255,170,0,.4)">&gt;</span> Sistemas defensivos: <span style="color:#0fa">activos</span></div></div>',
      '<div style="margin:18px 0 12px;padding:12px 18px;border-left:2px solid rgba(255,170,0,.12);background:rgba(255,170,0,.02)"><p style="font-size:.75em;font-style:italic;color:rgba(255,170,0,.5);line-height:1.6">"El yermo te enseña una cosa: la libertad tiene precio. Cada kilometro de asfalto caliente, cada tormenta de arena, cada noche bajo las estrellas. Pero cuando el sol se pone sobre la llanura y el unico ruido es el motor de tu maquina, sabes que vale la pena."</p><p style="font-size:.55em;color:rgba(255,170,0,.2);text-align:right;margin-top:8px">&#8212; Santiago, Clan Aldecaldo</p></div>',
      '<div style="margin:8px 0 8px"><p style="font-size:.6em;color:rgba(255,170,0,.35);letter-spacing:3px;margin-bottom:4px">CALENTANDO MOTORES</p><div class="fg"><div class="fg-f"></div></div><p style="font-size:.5em;color:rgba(255,170,0,.2);text-align:right;margin-top:3px;letter-spacing:2px">SISTEMA LISTO</p></div>',
      '<div style="text-align:center;margin-top:15px;padding-top:10px;border-top:1px solid rgba(255,170,0,.05)"><p style="font-size:.55em;color:rgba(255,170,0,.18);letter-spacing:4px">SINCRONIZANDO CONVOY</p><div class="nr-loading-bar" style="border-color:rgba(255,170,0,.12)"></div></div>',
      '</div></div>'
    ].join('\n')
  });

  registerPreset('afterlife', {
    id: 'afterlife',
    label: `${MODULE_ID}.presets.afterlife.label`,
    description: `${MODULE_ID}.presets.afterlife.description`,
    theme: {
      fontColor: '#ff00ff',
      fontSize: 34,
      fontFamily: "'Orbitron', 'Share Tech Mono', sans-serif",
      bgColor: '#050005',
      accentColor: '#ff00ff',
      bgOpacity: 0.9
    },
    effects: { dom: ['scanlines', 'glitch-text', 'neon-border'], canvas: ['particles', 'digital-rain'] },
    fullscreen: true,
    customCSS: [
      '@keyframes neon-pulse-mg{0%,100%{text-shadow:0 0 7px #ff00ff,0 0 15px #ff00ff,0 0 30px rgba(255,0,255,.3)}50%{text-shadow:0 0 10px #ff00ff,0 0 25px #ff00ff,0 0 50px rgba(255,0,255,.5)}}',
      '@keyframes strobe{0%,100%{opacity:1}50%{opacity:.3}}',
      '@keyframes bass-wave{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.8)}}',
      '@keyframes club-glow{0%,100%{box-shadow:0 0 15px rgba(255,0,255,.08),inset 0 0 15px rgba(255,0,255,.04),0 0 30px rgba(0,255,255,.04)}50%{box-shadow:0 0 35px rgba(255,0,255,.2),inset 0 0 25px rgba(255,0,255,.08),0 0 60px rgba(0,255,255,.08)}}',
      '@keyframes float-up{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}',
      '@keyframes eq-bar{0%,100%{height:8px}25%{height:28px}50%{height:14px}75%{height:34px}}',
      '.ah{display:flex;justify-content:space-between;font-size:.5em;color:rgba(255,0,255,.28);letter-spacing:3px;margin-bottom:30px;text-transform:uppercase}',
      '.ah .hl{color:#ff00ff;text-shadow:0 0 8px rgba(255,0,255,.3)}',
      '.ae{display:flex;justify-content:center;align-items:center;gap:15px;margin:8px auto;padding:10px 20px;background:rgba(255,0,255,.03);border:1px solid rgba(255,0,255,.08);border-radius:4px}',
      '.ae .eq{display:flex;align-items:flex-end;gap:3px;height:40px}',
      '.ae .eq span{width:4px;background:linear-gradient(0deg,#ff00ff,#00ffff);border-radius:2px 2px 0 0;animation:eq-bar 1.2s ease-in-out infinite}',
      '.ae .eq span:nth-child(1){animation-delay:0s}.ae .eq span:nth-child(2){animation-delay:.15s}.ae .eq span:nth-child(3){animation-delay:.3s}.ae .eq span:nth-child(4){animation-delay:.45s}.ae .eq span:nth-child(5){animation-delay:.6s}.ae .eq span:nth-child(6){animation-delay:.15s}.ae .eq span:nth-child(7){animation-delay:.3s}.ae .eq span:nth-child(8){animation-delay:0s}',
      '.al{font-size:.7em;line-height:2.2;color:rgba(255,0,255,.4);font-family:monospace}',
      '.al>div{opacity:0;animation:float-up .5s ease forwards}.al>div:nth-child(1){animation-delay:.6s}.al>div:nth-child(2){animation-delay:1s}.al>div:nth-child(3){animation-delay:1.4s}.al>div:nth-child(4){animation-delay:1.8s}.al>div:nth-child(5){animation-delay:2.2s}',
      '.nb{width:100%;height:6px;background:repeating-linear-gradient(90deg,rgba(255,0,255,.06) 0,rgba(255,0,255,.06) 6px,transparent 6px,transparent 12px);overflow:hidden;border-radius:3px}'
    ].join(' '),
    rawContent: [
      '<div style="font-family:Orbitron,Share Tech Mono,monospace;text-align:center;padding:40px;width:100%;height:100vh;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;background:radial-gradient(ellipse at center,#1a001a 0%,#0a000a 50%,#050005 100%)">',
      '<div class="ah"><span>AFTERLIFE &#8212; <span class="hl">NIVEL: VIP</span></span><span style="animation:strobe 1.5s step-end infinite">&#9679; EN VIVO</span><span>NIGHT CITY &#183; <span class="hl">SECTOR 6</span></span></div>',
      '<div style="max-width:960px;width:92%;margin:0 auto;padding:45px 55px;border:1px solid rgba(255,0,255,.2);box-shadow:0 0 30px rgba(255,0,255,.06),inset 0 0 30px rgba(255,0,255,.03);background:rgba(5,0,5,.92);animation:club-glow 3s ease-in-out infinite">',
      '<div class="ae">',
      '<div class="eq"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>',
      '<div style="font-size:.55em;color:rgba(255,0,255,.3);letter-spacing:3px;text-transform:uppercase"><span style="color:#00ffff;text-shadow:0 0 6px rgba(0,255,255,.3)">SAMURAI</span> &#183; <span style="color:#ff00ff;text-shadow:0 0 6px rgba(255,0,255,.3)">US CRIBS</span> &#183; <span style="color:#00ffff;text-shadow:0 0 6px rgba(0,255,255,.3)">LIZARD WIZARD</span></div>',
      '<div class="eq"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>',
      '</div>',
      '<p style="font-size:.45em;color:rgba(255,0,255,.15);letter-spacing:6px;margin:4px 0 8px;text-transform:uppercase">&#9835; Sesion en vivo &#8212; 128 BPM &#9835;</p>',
      '<h1 style="font-size:2.3em;letter-spacing:8px;text-transform:uppercase;color:#ff00ff;text-align:center;animation:neon-pulse-mg 2s ease-in-out infinite;margin:5px 0">AFTERLIFE</h1>',
      '<p style="text-align:center;font-size:.55em;color:rgba(255,0,255,.18);letter-spacing:5px;margin:2px 0 12px;text-transform:uppercase">Donde los muertos vivientes vienen a beber</p>',
      '<div class="al"><div><span style="color:#ff00ff;text-shadow:0 0 4px rgba(255,0,255,.4)">&gt;</span> Lista VIP: <span style="color:#0fa">acceso confirmado</span></div><div><span style="color:#ff00ff;text-shadow:0 0 4px rgba(255,0,255,.4)">&gt;</span> Barra: <span style="color:#0fa">abierta</span> &#8212; <span style="color:#00ffff">&#39;Saker gaseoso&#39;</span> en promocion</div><div><span style="color:#ff00ff;text-shadow:0 0 4px rgba(255,0,255,.4)">&gt;</span> Capacidad: <span style="color:#0fa">312/400</span> &#8212; Tu mesa: <span style="color:#0fa">V.I.P. 07</span></div><div><span style="color:#ff00ff;text-shadow:0 0 4px rgba(255,0,255,.4)">&gt;</span> Proximo set: <span style="color:#0fa">00:30</span> &#8212; <span style="color:#0fa">Denny &amp; la Banda</span></div><div><span style="color:#ff00ff;text-shadow:0 0 4px rgba(255,0,255,.4)">&gt;</span> Dopamina sintetica: <span style="color:#0fa">niveles optimos</span></div></div>',
      '<div style="margin:18px 0 12px;padding:12px 18px;border-left:2px solid rgba(255,0,255,.1);background:rgba(255,0,255,.02)"><p style="font-size:.7em;font-style:italic;color:rgba(255,0,255,.45);line-height:1.6">"El Afterlife no es solo un bar. Es un estado mental. Aca los mercenarios se vuelven leyendas y las leyendas se ahogan en whiskey synth antes de la proxima carrera. Si ois tu nombre en estos parlantes, significa que ya no estas para contarlo."</p><p style="font-size:.5em;color:rgba(255,0,255,.18);text-align:right;margin-top:8px">&#8212; Rogue Amendiares, Dueña del Afterlife</p></div>',
      '<div style="margin:8px 0 8px"><p style="font-size:.55em;color:rgba(255,0,255,.3);letter-spacing:3px;margin-bottom:4px">AMBIENTANDO</p><div class="nb"><div style="height:100%;width:0;background:linear-gradient(90deg,#ff00ff,#00ffff,#ff00ff);animation:nr-progress-fill 3.5s ease-out .5s forwards;border-radius:3px;box-shadow:0 0 10px rgba(255,0,255,.25)"></div></div></div>',
      '<div style="text-align:center;margin-top:12px;padding-top:8px;border-top:1px solid rgba(255,0,255,.04)"><p style="font-size:.5em;color:rgba(255,0,255,.15);letter-spacing:4px">SINTONIZANDO FRECUENCIA</p><div class="nr-loading-bar" style="border-color:rgba(255,0,255,.1)"></div></div>',
      '</div></div>'
    ].join('\n')
  });
}
