# NR Scene Fade

**Cyberpunk scene transitions for Foundry VTT** — DOM overlay effects + real-time Canvas animations. Synchronised via socketlib for multiplayer.

[![Version](https://img.shields.io/badge/v0.0.9-ff00ff?label=version)](https://github.com/DKSEN404/nr-scene-fade)
[![Foundry VTT](https://img.shields.io/badge/Foundry_VTT-12-orange)](https://foundryvtt.com)
[![License](https://img.shields.io/badge/MIT-00ff41?label=license)](LICENSE)
[![socketlib](https://img.shields.io/badge/depends-socketlib-4fc3f7)](https://github.com/manuelVo/foundryvtt-socketlib)

---

## Features

- **DOM effects:** scanlines, horizontal glitch, glitch text, chromatic aberration, neon border, typewriter
- **Canvas effects:** digital rain, particles, static noise, cyber grid
- **6 presets:** Amber Terminal, Netrunner, Combat, Mystery, Road, Afterlife
- **Multiplayer sync** via socketlib
- **Context menu** integration (scenes + journals)
- **Full i18n:** English, Spanish
- **No dependencies** beyond socketlib — no GSAP, no Three.js

## Presets

| Preset | DOM effects | Canvas effects |
|--------|------------|----------------|
| Amber Terminal | scanlines, glitch-line | — |
| Netrunner | scanlines, glitch-text | digital-rain |
| Combat | glitch-line, chromatic-aberration | particles, static-noise |
| Mystery | glitch-text, chromatic-aberration | digital-rain, cyber-grid |
| Road | scanlines, neon-border | cyber-grid |
| Afterlife | scanlines, glitch-text, neon-border | particles, digital-rain |

## Installation

1. Install **socketlib** from the Foundry module manager.
2. Add this manifest URL:
   ```
   https://github.com/DKSEN404/nr-scene-fade/releases/latest/download/module.json
   ```

## API

```js
game.modules.get('nr-scene-fade').api.play({ presetId: 'netrunner', content: '<p>Hello</p>' });
game.modules.get('nr-scene-fade').api.stop();
game.modules.get('nr-scene-fade').api.isActive();
```

## Credits

NR Scene Fade was inspired by the **[scene-transitions](https://github.com/manuelVo/foundryvtt-scene-transitions)** module by manuelVo. Built with socketlib by the same author.

---

# NR Scene Fade

**Transiciones cyberpunk para Foundry VTT** — efectos DOM overlay + animaciones Canvas en tiempo real. Sincronizado via socketlib para multijugador.

## Características

- **Efectos DOM:** scanlines, glitch horizontal, glitch text, aberración cromática, borde neón, máquina de escribir
- **Efectos Canvas:** lluvia digital, partículas, ruido estático, rejilla 3D
- **6 presets:** Terminal Ámbar, Netrunner, Combate, Misterio, Carretera, Afterlife
- **Sincronización multijugador** via socketlib
- **Menú contextual** integrado (escenas + journals)
- **i18n completo:** inglés, español
- **Sin dependencias** más allá de socketlib — sin GSAP, sin Three.js

## Presets

| Preset | Efectos DOM | Efectos Canvas |
|--------|------------|----------------|
| Terminal Ámbar | scanlines, glitch-line | — |
| Netrunner | scanlines, glitch-text | digital-rain |
| Combate | glitch-line, chromatic-aberration | particles, static-noise |
| Misterio | glitch-text, chromatic-aberration | digital-rain, cyber-grid |
| Carretera | scanlines, neon-border | cyber-grid |
| Afterlife | scanlines, glitch-text, neon-border | particles, digital-rain |

## Instalación

1. Instala **socketlib** desde el gestor de módulos de Foundry.
2. Añade esta URL de manifiesto:
   ```
   https://github.com/DKSEN404/nr-scene-fade/releases/latest/download/module.json
   ```

## API

```js
game.modules.get('nr-scene-fade').api.play({ presetId: 'netrunner', content: '<p>Hola</p>' });
game.modules.get('nr-scene-fade').api.stop();
game.modules.get('nr-scene-fade').api.isActive();
```

## Créditos

NR Scene Fade se inspiró en el módulo **[scene-transitions](https://github.com/manuelVo/foundryvtt-scene-transitions)** de manuelVo. Construido con socketlib del mismo autor.
