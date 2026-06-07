# Changelog / Registro de Cambios

## v1.2.5 (2026-06-01)

### English
- **Fixed [Critical]**: `scripts/forms/GalleryForm.mjs` — `buildFolderTree()` used `f.parent?.id` to find child folders, but for Folder documents in Foundry v12, `parent` returns `null` for all primary documents (it refers to embedding, not folder membership). Changed to `f.folder?.id` — the correct property that resolves the parent Folder object. Root folders now correctly identified by `!f.folder` instead of `!f.parent`. This was the real cause of subfolders rendering as siblings across all prior v1.2.x versions.
- **Added**: `scripts/forms/GalleryForm.mjs` — Console debug logging for folder hierarchy and rendered HTML to aid future diagnosis.

### Español
- **Corregido [Crítico]**: `scripts/forms/GalleryForm.mjs` — `buildFolderTree()` usaba `f.parent?.id` para encontrar subcarpetas, pero para documentos Folder en Foundry v12, `parent` devuelve `null` para todos los documentos primarios (se refiere a incrustación, no a pertenencia a carpeta). Cambiado a `f.folder?.id` — la propiedad correcta que resuelve el objeto Folder padre. Las carpetas raíz ahora se identifican correctamente con `!f.folder` en vez de `!f.parent`. Esta era la causa real de que las subcarpetas se renderizaran como hermanas en todas las versiones v1.2.x anteriores.
- **Añadido**: `scripts/forms/GalleryForm.mjs` — Logs de depuración en consola para la jerarquía de carpetas y el HTML renderizado para facilitar diagnósticos futuros.

## v1.2.4 (2026-06-01)

### English
- **Fixed**: `scripts/forms/GalleryForm.mjs` — Chevron collapse no longer affects child folders. Changed `folder.find('.nr-folder-chevron')` to `$(e.currentTarget).find('.nr-folder-chevron')`, targeting only the clicked folder's chevron.
- **Fixed**: `scripts/forms/GalleryForm.mjs` — Replaced recursive Handlebars partial with pre-rendered HTML in JS (`renderFolderTree()` + `renderSceneGrid()`). The Handlebars `{{#*inline}}` partial in Foundry v12 did not propagate `children` context correctly, causing subfolders to render as siblings. Now the folder tree HTML is built as a string in `getData()` and rendered via `{{{folderTreeHTML}}}` in the template.
- **Fixed**: `templates/gallery-form.hbs` — Simplified: removed the `{{#*inline "galleryFolder"}}` recursive partial. Now only has a toolbar row and `{{{folderTreeHTML}}}`.
- **Added**: `scripts/forms/GalleryForm.mjs` — Collapse All button handler in `activateListeners`. Clicking `[data-action="collapse-all"]` collapses every folder in the gallery.
- **Added**: `templates/gallery-form.hbs` — `.nr-gallery-toolbar` with a "Collapse All" button at the top of the form.
- **Added**: `styles/nr-scene-fade.css` — `.nr-gallery-toolbar` styles (flex row, border-bottom, hover effects).
- **Added**: `lang/en.json`, `lang/es.json` — `gallery.collapseAll` i18n key.

### Español
- **Corregido**: `scripts/forms/GalleryForm.mjs` — El colapso de chevrón ya no afecta a carpetas hijas. Se cambió `folder.find('.nr-folder-chevron')` por `$(e.currentTarget).find('.nr-folder-chevron')`, apuntando solo al chevrón de la carpeta clickeada.
- **Corregido**: `scripts/forms/GalleryForm.mjs` — Se reemplazó el partial Handlebars recursivo por HTML pre-renderizado en JS (`renderFolderTree()` + `renderSceneGrid()`). El partial `{{#*inline}}` en Foundry v12 no propagaba correctamente el contexto `children`, causando que las subcarpetas se renderizaran como hermanos. Ahora el HTML del árbol de carpetas se construye como string en `getData()` y se renderiza via `{{{folderTreeHTML}}}`.
- **Corregido**: `templates/gallery-form.hbs` — Simplificado: se eliminó el partial recursivo `{{#*inline "galleryFolder"}}`. Ahora solo tiene una barra de herramientas y `{{{folderTreeHTML}}}`.
- **Añadido**: `scripts/forms/GalleryForm.mjs` — Manejador del botón Collapse All en `activateListeners`. Al hacer click en `[data-action="collapse-all"]` se contraen todas las carpetas de la galería.
- **Añadido**: `templates/gallery-form.hbs` — `.nr-gallery-toolbar` con un botón "Contraer todo" al inicio del formulario.
- **Añadido**: `styles/nr-scene-fade.css` — Estilos `.nr-gallery-toolbar` (flex row, border-bottom, hover).
- **Añadido**: `lang/en.json`, `lang/es.json` — Clave i18n `gallery.collapseAll`.

## v1.2.3 (2026-06-01)

### English
- **Fixed**: `scripts/forms/GalleryForm.mjs` — Filter folders by `folder.type === 'Scene'` to prevent Actor/Item/Journal folders from appearing in the gallery.
- **Fixed**: `scripts/forms/GalleryForm.mjs` — Replaced flat folder list with `buildFolderTree()` returning actual nested `{ children: [...] }` structure. Subfolders now render as proper HTML children inside their parent, not as indented siblings.
- **Fixed**: `templates/gallery-form.hbs` — Replaced `depthMargin` with a recursive Handlebars partial `{{#*inline "galleryFolder"}}` that nests subfolders within a `.nr-gallery-subfolders` container inside each folder.
- **Added**: Folders are now collapsible. Click the folder title to collapse/expand — chevron icon toggles between `fa-chevron-down` and `fa-chevron-right`. Collapsed state hides both the scene grid and subfolders.
- **Added**: `styles/nr-scene-fade.css` — `.nr-gallery-subfolders` with left border and margin for visual hierarchy. `.nr-folder--collapsed` hides grids and subfolders. Chevron rotation animation.

### Español
- **Corregido**: `scripts/forms/GalleryForm.mjs` — Filtrado de carpetas por `folder.type === 'Scene'` para evitar que carpetas de Actor/Objeto/Diario aparezcan en la galería.
- **Corregido**: `scripts/forms/GalleryForm.mjs` — Lista plana de carpetas reemplazada por `buildFolderTree()` que devuelve estructura anidada con `{ children: [...] }`. Las subcarpetas ahora se renderizan como hijos HTML dentro de su carpeta padre, no como hermanos indentados.
- **Corregido**: `templates/gallery-form.hbs` — `depthMargin` reemplazado por un partial Handlebars recursivo `{{#*inline "galleryFolder"}}` que anida subcarpetas dentro de un contenedor `.nr-gallery-subfolders` dentro de cada carpeta.
- **Añadido**: Las carpetas ahora son contraíbles. Click en el título de la carpeta para contraer/expandir — el icono del chevrón alterna entre `fa-chevron-down` y `fa-chevron-right`. El estado contraído oculta tanto la cuadrícula de escenas como las subcarpetas.
- **Añadido**: `styles/nr-scene-fade.css` — `.nr-gallery-subfolders` con borde izquierdo y margen para jerarquía visual. `.nr-folder--collapsed` oculta cuadrículas y subcarpetas. Animación de rotación del chevrón.

## v1.2.2 (2026-06-01)

### English
- **Fixed**: `scripts/forms/GalleryForm.mjs` — `scene.img` changed to `scene.thumb || scene.img || ''` so gallery thumbnails load the small auto-generated thumbnail instead of the full background image.
- **Fixed**: `scripts/forms/GalleryForm.mjs` — Folder order now uses `folder.sort` (the real Scene Directory order) instead of alphabetical by name.
- **Fixed**: `scripts/forms/GalleryForm.mjs` — Nested subfolders now render recursively via `folder.parent` tree with visual indentation (`depthMargin`). Flat grouping by immediate folder was losing the folder hierarchy.
- **Fixed**: `templates/gallery-form.hbs` — Added `{{#if this.img}}` conditional: renders an `<img>` if thumbnail exists, or a `.nr-gallery-cell-placeholder` with `<i class="fas fa-image"></i>` icon if not.
- **Fixed**: `templates/gallery-form.hbs` — Added `style="padding-left: {{depthMargin}}px"` to folder titles for subfolder visual indentation.
- **Added**: `styles/nr-scene-fade.css` — `.nr-gallery-cell-placeholder` class (centered fa-image icon on dark background) for scenes with no thumbnail available.

### Español
- **Corregido**: `scripts/forms/GalleryForm.mjs` — `scene.img` cambiado por `scene.thumb || scene.img || ''` para que los thumbnails de la galería carguen la miniatura pequeña auto-generada en vez de la imagen de fondo completa.
- **Corregido**: `scripts/forms/GalleryForm.mjs` — El orden de carpetas ahora usa `folder.sort` (el orden real del Directorio de Escenas) en vez de orden alfabético por nombre.
- **Corregido**: `scripts/forms/GalleryForm.mjs` — Las subcarpetas ahora se renderizan recursivamente mediante un árbol `folder.parent` con indentación visual (`depthMargin`). La agrupación plana por carpeta inmediata perdía la jerarquía de carpetas.
- **Corregido**: `templates/gallery-form.hbs` — Añadido condicional `{{#if this.img}}`: renderiza un `<img>` si existe thumbnail, o un `.nr-gallery-cell-placeholder` con icono `<i class="fas fa-image"></i>` si no.
- **Corregido**: `templates/gallery-form.hbs` — Añadido `style="padding-left: {{depthMargin}}px"` a los títulos de carpeta para indentación visual de subcarpetas.
- **Añadido**: `styles/nr-scene-fade.css` — Clase `.nr-gallery-cell-placeholder` (icono fa-image centrado sobre fondo oscuro) para escenas sin thumbnail disponible.

## v1.2.1 (2026-05-31)

### English
- **Fixed**: `scripts/main.mjs` — When removing the `GALLERY_MODE` setting registration in v1.2.0, the `});` closing `Hooks.once('init')` was accidentally deleted, causing a syntax error that prevented the entire module from loading. Re-added it. All core functionality (transitions, context menus, socket sync, settings) is restored.

### Español
- **Corregido**: `scripts/main.mjs` — Al eliminar el registro del setting `GALLERY_MODE` en v1.2.0, se eliminó accidentalmente el `});` que cerraba `Hooks.once('init')`, causando un error de sintaxis que impedía cargar todo el módulo. Re-agregado. Toda la funcionalidad base (transiciones, menús contextuales, socket sync, settings) está restaurada.

## v1.2.0 (2026-05-31)

### English
- **New**: `scripts/forms/GalleryForm.mjs` — Replaced the unreliable Gallery Mode toggle (v1.1.3 through v1.1.6) with a standalone `FormApplication` (400×750px) opened via a button in the Scene Directory header. All scenes are grouped by folder in a thumbnail grid. Hover on a cell reveals buttons: Activate (eye), Preload (download), Play Transition (if exists), Edit/Create Transition (plus/edit). Zero dependency on Foundry's async DOM — the form renders its own HTML.
- **Removed**: `scripts/ContextMenu.mjs` — Deleted `injectGallery`, `applyGalleryMode`, `toggleGalleryMode`, `buildGalleryButtons`, `onGalleryClick`, `openEditForm`, and the `changeSidebarTab`/`renderMainApp` hooks. Replaced `renderSceneDirectory`/`renderSidebarTab` with `injectGalleryButton(html)` which adds a "Scene Gallery" button to the directory header.
- **Removed**: `styles/nr-scene-fade.css` — Section 27 (Gallery Mode) replaced with Section 27 (Gallery Form styles).
- **Removed**: `scripts/main.mjs` — `GALLERY_MODE` setting removed (the button replaces the toggle).
- **Added**: `templates/gallery-form.hbs` — Handlebars template for the gallery FormApplication.

### Español
- **Nuevo**: `scripts/forms/GalleryForm.mjs` — Se reemplazó el poco fiable toggle del Modo Galería (v1.1.3 a v1.1.6) por una `FormApplication` independiente (400×750px) que se abre mediante un botón en el encabezado del Directorio de Escenas. Las escenas se agrupan por carpeta en una cuadrícula de miniaturas. Al pasar el mouse sobre una celda aparecen botones: Activar (ojo), Precargar (descarga), Reproducir Transición (si existe), Editar/Crear Transición (más/editar). Dependencia cero del DOM asíncrono de Foundry — el formulario renderiza su propio HTML.
- **Eliminado**: `scripts/ContextMenu.mjs` — Se eliminaron `injectGallery`, `applyGalleryMode`, `toggleGalleryMode`, `buildGalleryButtons`, `onGalleryClick`, `openEditForm` y los hooks `changeSidebarTab`/`renderMainApp`. Se reemplazaron `renderSceneDirectory`/`renderSidebarTab` con `injectGalleryButton(html)` que agrega un botón "Galería de Escenas" al encabezado del directorio.
- **Eliminado**: `styles/nr-scene-fade.css` — Sección 27 (Modo Galería) reemplazada por Sección 27 (estilos del formulario de galería).
- **Eliminado**: `scripts/main.mjs` — Se eliminó el setting `GALLERY_MODE` (el botón reemplaza al toggle).
- **Agregado**: `templates/gallery-form.hbs` — Template Handlebars para la FormApplication de la galería.

## v1.1.6 (2026-05-31)

### English
- **Fixed**: `scripts/ContextMenu.mjs` — All previous triggers (`changeSidebarTab`, `renderMainApp`, `onChange`) fire before `#scene-list` is in the DOM. `requestAnimationFrame` was insufficient. Rewrote `toggleGalleryMode()` to use a `MutationObserver` on `#sidebar` that detects the exact moment `#scene-list` appears in the DOM and applies gallery mode immediately. 10s safety timeout prevents observer leaks.
- **Restored**: `scripts/ContextMenu.mjs` — `changeSidebarTab` hook (from v1.1.4) + `renderMainApp` hook (from v1.1.5) both call `toggleGalleryMode()`. Neither needs to check for `#scene-list` — the observer handles timing.

### Español
- **Corregido**: `scripts/ContextMenu.mjs` — Todos los triggers anteriores (`changeSidebarTab`, `renderMainApp`, `onChange`) se disparaban antes de que `#scene-list` estuviera en el DOM. `requestAnimationFrame` era insuficiente. Se reescribió `toggleGalleryMode()` para usar un `MutationObserver` en `#sidebar` que detecta el momento exacto en que `#scene-list` aparece en el DOM y aplica el modo galería al instante. Timeout de seguridad de 10s previene fugas del observer.
- **Restaurado**: `scripts/ContextMenu.mjs` — Hook `changeSidebarTab` (de v1.1.4) + hook `renderMainApp` (de v1.1.5) ambos llaman a `toggleGalleryMode()`. Ninguno necesita verificar `#scene-list` — el observer maneja el timing.

## v1.1.5 (2026-05-31)

### English
- **Fixed**: `scripts/ContextMenu.mjs` — `changeSidebarTab` fires before Scene Directory DOM is available (`#scene-list` not yet mounted). Replaced with `renderMainApp` hook which fires **after** sidebar tab content is rendered and attached to the DOM. `onChange` in `main.mjs` is unchanged (covers immediate toggle when Scene Directory is already open).

### Español
- **Corregido**: `scripts/ContextMenu.mjs` — `changeSidebarTab` se dispara antes de que el DOM del Scene Directory esté disponible (`#scene-list` no montado). Reemplazado por el hook `renderMainApp`, que se dispara **después** de que el contenido del tab sidebar está renderizado y adjunto al DOM. `onChange` en `main.mjs` sin cambios (cubre el toggle inmediato cuando el Scene Directory ya está abierto).

## v1.1.4 (2026-05-31)

### English
- **Fixed**: `scripts/ContextMenu.mjs` — `changeSidebarTab` hook received `SceneDirectory` (constructor name) instead of string `'scenes'`. The guard `if (tabName !== 'scenes') return;` silently discarded the hook call. Now resolves the tab name from both string and object forms.

### Español
- **Corregido**: `scripts/ContextMenu.mjs` — El hook `changeSidebarTab` recibía `SceneDirectory` (nombre del constructor) en vez del string `'scenes'`. La guardia `if (tabName !== 'scenes') return;` descartaba silenciosamente la llamada. Ahora resuelve el nombre del tab desde ambas formas (string y objeto).

## v1.1.3 (2026-05-31)

### English
- **Fixed**: `scripts/ContextMenu.mjs` — Refactored gallery logic: extracted `applyGalleryMode()`, exported `toggleGalleryMode()`. Added `changeSidebarTab` hook so gallery mode applies when navigating back to the cached Scenes tab. Added DOM cleanup (removes injected labels/actions) when disabling gallery mode.
- **Fixed**: `scripts/main.mjs` — Added `onChange` callback to `gallery-mode` setting that calls `toggleGalleryMode()`, so gallery mode applies immediately when toggled in Module Settings (even while the Scene Directory is open).

### Español
- **Corregido**: `scripts/ContextMenu.mjs` — Refactorizada la lógica de galería: extraído `applyGalleryMode()`, exportado `toggleGalleryMode()`. Agregado hook `changeSidebarTab` para que el modo galería se aplique al navegar de vuelta a la pestaña Scenes cacheada. Agregado cleanup del DOM al desactivar (remueve labels/actions inyectados).
- **Corregido**: `scripts/main.mjs` — Agregado callback `onChange` al setting `gallery-mode` que llama `toggleGalleryMode()`, para que el modo galería se aplique inmediatamente al togglear en Module Settings (incluso si el Scene Directory está abierto).

## v1.1.2 (2026-05-31)

### English
- **Fixed [Critical]**: `scripts/main.mjs` — Setting `default-options` had `config: true` with `type: Object`. Foundry rendered a text input whose stringified value (`[object Object]`) got cast to a String wrapper object by `Object()` coercion. `flattenObject` expanded the String wrapper into spurious keys (e.g. `default-options.0`, `.1`, …) causing `TypeError: Cannot read properties of undefined (reading 'namespace')` when saving any setting in Module Settings. Changed to `config: false` — the Object setting is now edited exclusively via its menu form (`DefaultOptionsForm`), which was already correctly registered.
- **Fixed**: `scripts/constants.mjs` — Added `GALLERY_MODE` to `SETTINGS` object for consistency.
- **Fixed**: `scripts/ContextMenu.mjs` — Now reads gallery-mode via `SETTINGS.GALLERY_MODE` constant instead of raw string.

### Español
- **Corregido [Crítico]**: `scripts/main.mjs` — El setting `default-options` tenía `config: true` con `type: Object`. Foundry renderizaba un input de texto cuyo valor serializado (`[object Object]`) era convertido a String wrapper por la coerción `Object()`. `flattenObject` expandía el String wrapper en claves espurias (ej. `default-options.0`, `.1`, …) causando `TypeError: Cannot read properties of undefined (reading 'namespace')` al guardar cualquier cambio en Module Settings. Se cambió a `config: false` — el setting Object ahora se edita exclusivamente vía su formulario menú (`DefaultOptionsForm`), que ya estaba correctamente registrado.
- **Corregido**: `scripts/constants.mjs` — Añadida constante `GALLERY_MODE` al objeto `SETTINGS` para consistencia.
- **Corregido**: `scripts/ContextMenu.mjs` — Ahora lee gallery-mode mediante la constante `SETTINGS.GALLERY_MODE` en vez del string literal.

## v1.1.1 (2026-05-31)

### English
- **Fixed**: `scripts/main.mjs` — Missing `label` property on Boolean settings `gallery-mode` and `show-journal-header-transition` prevented toggle from appearing/working in Foundry v12 Module Settings panel.
- **Fixed**: `lang/en.json`, `lang/es.json` — Added `label` key (`Enable` / `Activar`) to `settings.galleryMode` and `settings.showJournalHeader` i18n entries.

### Español
- **Corregido**: `scripts/main.mjs` — La propiedad `label` faltaba en los settings Boolean `gallery-mode` y `show-journal-header-transition`, impidiendo que el toggle apareciera/funcionara en el panel Module Settings de Foundry v12.
- **Corregido**: `lang/en.json`, `lang/es.json` — Añadida clave `label` (`Enable` / `Activar`) a las entradas i18n `settings.galleryMode` y `settings.showJournalHeader`.

## v1.1.0 (2026-05-31)

### English
- **Added**: `Gallery Mode` — Scene Directory sidebar shows scenes as square thumbnails in a responsive grid (instead of the default list). Setting `gallery-mode` in Module Settings (world, GM).
- **Added**: Hover footer with 4 quick-action buttons: Activate, Preload, Play Transition (if configured), Edit/Create Transition.
- **Added**: `ContextMenu.mjs` — `renderSceneDirectory` + `renderSidebarTab` dual hooks inject buttons into each `<li class="scene">`. Click delegation handles activate, preload, play (socket broadcast), and edit/create form opening.
- **Added**: `nr-scene-fade.css` — Section 27: Gallery Mode. CSS grid layout `auto-fill, minmax(140px, 1fr)`. Square aspect-ratio tiles with object-fit cover thumbnails. Native scene controls hidden. Labels overlay top-left. Action buttons footer (30px) fades in on hover.
- **Added**: `lang/en.json`, `lang/es.json` — 6 keys: `settings.galleryMode.name`, `settings.galleryMode.hint`, `gallery.activate`, `gallery.preload`, `gallery.play`, `gallery.edit`.
- **Note**: Gallery Mode is a visual-only enhancement. The existing context menu remains functional for advanced operations.
- **Note**: Version jump from 0.0.x to 1.1.0 marks the first UI enhancement feature beyond transition fixes.

### Español
- **Añadido**: `Modo Galería` — El Scene Directory muestra las escenas como miniaturas cuadradas en una cuadrícula responsive. Setting `gallery-mode` en Module Settings (world, DJ).
- **Añadido**: Pié de hover con 4 botones de acción rápida: Activar, Precargar, Reproducir Transición (si configurada), Editar/Crear Transición.
- **Añadido**: `ContextMenu.mjs` — Hooks duales `renderSceneDirectory` + `renderSidebarTab` inyectan botones en cada `<li class="scene">`. Delegación de clicks para activate, preload, play (socket broadcast) y edit/create form.
- **Añadido**: `nr-scene-fade.css` — Sección 27: Modo Galería. Grid CSS `auto-fill, minmax(140px, 1fr)`. Tiles cuadrados con thumbnails object-fit cover. Controles nativos ocultos. Etiqueta superior. Botones de acción (30px) aparecen al hover.
- **Añadido**: `lang/en.json`, `lang/es.json` — 6 claves: `settings.galleryMode.name`, `settings.galleryMode.hint`, `gallery.activate`, `gallery.preload`, `gallery.play`, `gallery.edit`.
- **Nota**: El Modo Galería es solo visual. El menú contextual existente sigue funcionando para operaciones avanzadas.
- **Nota**: Salto de versión de 0.0.x a 1.1.0 marca la primera funcionalidad de mejora de UI más allá de fixes de transición.

### Fixed (post-release, 2026-05-31)
- `ContextMenu.mjs` — Added `renderSidebarTab(app, html)` fallback hook with `app.tabName === 'scenes'` guard for Foundry v12 compatibility, in case `renderSceneDirectory` does not fire.
- `ContextMenu.mjs` — Fixed event listener leak: `addEventListener('click', onGalleryClick)` accumulated on every re-render. Now calls `removeEventListener` before `addEventListener`.
- `ContextMenu.mjs` — Added `console.log('NR Scene Fade | Gallery |', ...)` traces at every step (hook fired, setting read, #scene-list found, scenes processed) for F12 debugging.
- `ContextMenu.mjs` — Added guard for `game.scenes` being undefined at hook time.
- `nr-scene-fade.css` — Changed all gallery selectors from `#scene-list.nr-gallery-mode` to `#scenes #scene-list.nr-gallery-mode` for max specificity override against other scene-modifying modules.
- `nr-scene-fade.css` — Added `!important` to `display: grid`, `aspect-ratio`, `width/height` on thumbnails, `display: flex` on actions footer, `border-color`/`box-shadow` on active/pinned states.

### Corregido (post-release, 2026-05-31)
- `ContextMenu.mjs` — Añadido hook de respaldo `renderSidebarTab(app, html)` con guardia `app.tabName === 'scenes'` para compatibilidad con FVTT v12, en caso de que `renderSceneDirectory` no se dispare.
- `ContextMenu.mjs` — Corregida fuga de event listeners: `addEventListener('click', onGalleryClick)` se acumulaba en cada re-render. Ahora llama `removeEventListener` antes de `addEventListener`.
- `ContextMenu.mjs` — Añadidos `console.log('NR Scene Fade | Gallery |', ...)` en cada paso (hook disparado, setting leído, #scene-list encontrado, escenas procesadas) para debugging via F12.
- `ContextMenu.mjs` — Añadida guardia para `game.scenes` undefined al momento del hook.
- `nr-scene-fade.css` — Todos los selectores de galería cambiados de `#scene-list.nr-gallery-mode` a `#scenes #scene-list.nr-gallery-mode` para máxima especificidad contra otros módulos de escenas.
- `nr-scene-fade.css` — Añadido `!important` a `display: grid`, `aspect-ratio`, `width/height` en thumbnails, `display: flex` en footer de acciones, `border-color`/`box-shadow` en estados active/pinned.

## v0.0.10 (2026-05-31)

### English
- **Fixed [Medium]**: `NRSceneFade.mjs` — `gmHide` checkbox existed in the form but had no runtime effect. Added guard in `#createOverlay`: if `game.user?.isGM && options.gmHide`, returns without creating the overlay. GM sees no overlay, players see normal.
- **Fixed [Medium]**: `NRSceneFade.mjs` — No way to abort a running transition after close button removal (v0.0.7). Added `#onKeyDown` handler: Escape key calls `stop(true)` locally; if `gmEndAll` is true, also broadcasts `Socket.executeForEveryone({ action: 'stop' })`. Listener registered in `play()`, removed in `#cleanup()`.
- **Fixed [Medium]**: `ContextMenu.mjs` — Added "Stop Transition" entry in scene navigation and directory context menus. Condition: `isGM && api.isActive()`. Callback: `Socket.executeForEveryone({ action: 'stop' })`.
- **Fixed [Medium]**: `lang/en.json`, `lang/es.json` — Added `stopTransition` localization key.
- **Note**: `gmEndAll=false` disables broadcast from both Escape and context menu.

### Español
- **Corregido [Medio]**: `NRSceneFade.mjs` — El checkbox `gmHide` existía en el formulario pero no tenía efecto en tiempo de ejecución. Se agregó guardia en `#createOverlay`: si `game.user?.isGM && options.gmHide`, retorna sin crear el overlay. El DJ no ve overlay, los jugadores ven normal.
- **Corregido [Medio]**: `NRSceneFade.mjs` — No había forma de abortar una transición activa tras la eliminación del botón de cierre (v0.0.7). Se agregó handler `#onKeyDown`: tecla Escape ejecuta `stop(true)` local; si `gmEndAll` es true, también envía `Socket.executeForEveryone({ action: 'stop' })`. Listener registrado en `play()`, removido en `#cleanup()`.
- **Corregido [Medio]**: `ContextMenu.mjs` — Se agregó entrada "Detener Transición" en menús contextuales de navegación y directorio de escenas. Condición: `isGM && api.isActive()`. Callback: `Socket.executeForEveryone({ action: 'stop' })`.
- **Corregido [Medio]**: `lang/en.json`, `lang/es.json` — Clave `stopTransition` agregada.
- **Nota**: `gmEndAll=false` desactiva el broadcast tanto de Escape como del menú contextual.

## v0.0.9 (2026-05-31)

### English
- **Fixed [Critical]**: `constants.mjs` — `sceneID → sceneId` casing mismatch; form saved `sceneID` but NRSceneFade read `sceneId`, causing `activateScene` to fail silently.
- **Fixed [Critical]**: `NRSceneFade.mjs` — Race condition in `play()`. Multiple rapid play/stop calls could leave stale async operations modifying the overlay after cleanup. Added generation counter (`#playGen`) that invalidates stale coroutines at every async boundary.
- **Fixed [High]**: `SocketManager.mjs` — User filtering passed `users` (original array) instead of `options.users` (filtered array) to `socket.executeForUsers`, causing filtered-out users to still receive the transition. Added `presetId` defaulting in `executeAction`. Added `await` on `api.play()` and `return` on socket calls.
- **Fixed [High]**: `main.mjs` — No graceful fallback when socketlib is missing. Added guard in `ready` hook: if socketlib is not active, NR Scene Fade runs in single-player mode with context menus still available.
- **Fixed [High]**: `EditTransitionForm.mjs` — `secrets: true` in `enrichHTML()` revealed hidden content in the editor. Removed duplicate `activateListeners` handler that created orphan tab references.
- **Fixed [High]**: `CSS` — Canvas and content-wrapper used hardcoded `z-index: 5001/5002` independent of the overlay's dynamic z-index (could show above UI for GM or below content for players). Now set dynamically via inline style as `overlayZ + 1` / `overlayZ + 2`.
- **Fixed [Medium]**: `CanvasEffects.mjs` — `createDigitalRain` set `ctx.font` every frame (costly). Cached to module-level constant and guarded with `fontSet` flag. `createStaticNoise` created new `ImageData` per frame (memory churn). Reuses instance with dimension change detection.
- **Fixed [Low]**: `lang/es.json` — Missing `road` preset translation.
- **Fixed [Low]**: `module.json` — Empty `"location": ""` in media icon (removed). socketlib dependency on `develop` branch (changed to `master`). Version bumped to 0.0.9.
- **Fixed [Low]**: `README.md` — Badge showed `v1.0.0` instead of actual version.
- **Fixed [Low]**: `CSS` — Dead `.nr-amber` scanline modifier (no amber preset). `#nr-scene-fade-canvas` dead selector (canvas uses `#nr-cfx-canvas`). Typewriter `steps(40)` made explicit as `steps(40, end)`.
- **Fixed [Low]**: `overlay.hbs` — Canvas `<canvas id="nr-cfx-canvas">` always rendered even without canvas effects. Now conditional on `hasCanvasEffects`.
- **Improved**: `NRSceneFade.mjs` — Swallowed `AudioHelper.play()` rejection logged as `console.warn`. Unused `#render()` method removed. `style` field from template data removed (never used in template).

### Español
- **Corregido [Crítico]**: `constants.mjs` — Error de mayúsculas `sceneID → sceneId`; el formulario guardaba `sceneID` pero NRSceneFade leía `sceneId`, causando que `activateScene` fallara silenciosamente.
- **Corregido [Crítico]**: `NRSceneFade.mjs` — Condición de carrera en `play()`. Múltiples llamadas rápidas play/stop dejaban operaciones asíncronas obsoletas modificando el overlay después de la limpieza. Se añadió contador de generación (`#playGen`) que invalida corrutinas obsoletas en cada punto asíncrono.
- **Corregido [Alto]**: `SocketManager.mjs` — El filtro de usuarios pasaba `users` (array original) en vez de `options.users` (array filtrado) a `socket.executeForUsers`, causando que usuarios filtrados recibieran la transición. Se añadió valor por defecto de `presetId` en `executeAction`. Se añadió `await` en `api.play()` y `return` en llamadas socket.
- **Corregido [Alto]**: `main.mjs` — Sin fallback cuando falta socketlib. Se añadió guardia en hook `ready`: si socketlib no está activo, NR Scene Fade funciona en modo monojugador con menús contextuales disponibles.
- **Corregido [Alto]**: `EditTransitionForm.mjs` — `secrets: true` en `enrichHTML()` revelaba contenido oculto en el editor. Se eliminó el manejador `activateListeners` duplicado que creaba referencias huérfanas de pestañas.
- **Corregido [Alto]**: `CSS` — Canvas y content-wrapper usaban `z-index: 5001/5002` fijos independientes del z-index dinámico del overlay (podían mostrarse sobre la UI del DJ o bajo el contenido de jugadores). Ahora se asignan dinámicamente como `overlayZ + 1` / `overlayZ + 2`.
- **Corregido [Medio]**: `CanvasEffects.mjs` — `createDigitalRain` asignaba `ctx.font` en cada frame (costoso). Cacheado en constante de módulo con bandera `fontSet`. `createStaticNoise` creaba nuevo `ImageData` por frame (fragmentación de memoria). Reusa instancia con detección de cambio de dimensiones.
- **Corregido [Bajo]**: `lang/es.json` — Traducción faltante del preset `road`.
- **Corregido [Bajo]**: `module.json` — `"location": ""` vacío en icono de medios (eliminado). Dependencia socketlib en rama `develop` (cambiada a `master`). Versión actualizada a 0.0.9.
- **Corregido [Bajo]**: `README.md` — Badge mostraba `v1.0.0` en vez de la versión actual.
- **Corregido [Bajo]**: `CSS` — Modificador `.nr-amber` muerto (sin preset ámbar). Selector `#nr-scene-fade-canvas` muerto (canvas usa `#nr-cfx-canvas`). Typewriter `steps(40)` hecho explícito como `steps(40, end)`.
- **Corregido [Bajo]**: `overlay.hbs` — Canvas `<canvas id="nr-cfx-canvas">` siempre renderizado incluso sin efectos canvas. Ahora condicional a `hasCanvasEffects`.
- **Mejorado**: `NRSceneFade.mjs` — Rechazo de `AudioHelper.play()` ahora registrado con `console.warn`. Método `#render()` no usado eliminado. Campo `style` eliminado de datos del template (nunca usado).

## v0.0.4 (2026-05-29)

### English
- Fixed: Scene activation now happens immediately after fadeIn instead of after fadeOut + cleanup — scene starts loading for players while the transition plays.
- Fixed: Close button didn't work during transition — `play()` kept running after manual `stop()`, causing stale lifecycle. Added `if (!this.#isActive) return;` guard after the display timer.
- Changed: Close button icon from X to play icon, restyled with dark glass aesthetic (translucent background, backdrop-filter blur, gray color) to blend with any transition.

### Español
- Corregido: La activación de escena ahora ocurre inmediatamente después del fadeIn — la escena empieza a cargar para los jugadores mientras la transición se reproduce.
- Corregido: El botón de cierre no funcionaba durante la transición — `play()` seguía ejecutándose después de un `stop()` manual. Se agregó guard `if (!this.#isActive) return;` tras el temporizador.
- Cambiado: Icono del botón de cierre de X a play, rediseñado con estética glass oscuro (fondo translúcido, blur, color gris) para mimetizarse con cualquier transición.

## v0.0.3 (2026-05-29)

### English
- Fixed: Transition overlay stayed frozen after the display period — `play()` never called `#fadeOut` or `stop()`, leaving the overlay visible permanently. Added `#fadeOut()` and auto-close lifecycle: fadeIn → display for `delay` ms → fadeOut → cleanup.
- Fixed: `activateScene` option was saved in the form but never executed during play. Added `sceneId` to play options in `ContextMenu.mjs` and `scene.view()` call in `play()` after fadeOut.
- Added: `#fadeOut(options)` method that animates overlay opacity to 0 over `fadeOut` ms.

### Español
- Corregido: El overlay de la transición se quedaba congelado — `play()` nunca llamaba a `#fadeOut` ni `stop()`, dejando el overlay visible permanentemente. Se agregó `#fadeOut()` y ciclo de vida automático: fadeIn → mostrar por `delay` ms → fadeOut → limpieza.
- Corregido: La opción `activateScene` se guardaba en el formulario pero nunca se ejecutaba al reproducir. Se agregó `sceneId` a las opciones de play en `ContextMenu.mjs` y llamada a `scene.view()` en `play()` después del fadeOut.
- Añadido: Método `#fadeOut(options)` que anima la opacidad del overlay a 0 durante `fadeOut` ms.

## v0.0.2 (2026-05-29)

### English
- Fixed: Overlay never displayed — `#createOverlay` created a wrapper `<div>` with `id="nr-scene-fade-overlay"` and then inserted the Handlebars template as inner HTML, which also created a `<div id="nr-scene-fade-overlay">` (duplicate ID). `getElementById()` returned the outer wrapper which had `display: none` (no `nr-visible` class), hiding the entire overlay. Removed the wrapper element — the template now appends directly to `document.body`.

### Español
- Corregido: Overlay nunca se mostraba — `#createOverlay` creaba un wrapper `<div>` con `id="nr-scene-fade-overlay"` y luego insertaba el template Handlebars como inner HTML, que también creaba un `<div id="nr-scene-fade-overlay">` (ID duplicado). `getElementById()` devolvía el wrapper externo con `display: none` (sin clase `nr-visible`), ocultando todo el overlay. Se eliminó el wrapper — el template ahora se inserta directamente en `document.body`.

## v0.0.1 (2026-05-29)

### English
- Fixed: Core data-flow bug — `EditTransitionForm.getData()` read `this.options` (FormApplication window config) instead of `this.object` (actual saved transition data). When editing, the form displayed defaults instead of saved values, and saving without changes overwrote real data with defaults.
- Fixed: Edit path passed `transition.options.sceneID` to constructor, but `sceneID` was never saved as a form field, causing `this.sceneID` to be `undefined` and `_updateObject` to fail finding the scene. Now uses `scene.id` directly.
- Initial release (rebased from v1.0.x series).

### Español
- Corregido: Bug fundamental de flujo de datos — `EditTransitionForm.getData()` leía `this.options` (config de ventana de FormApplication) en vez de `this.object` (datos reales de transición). Al editar, el formulario mostraba defaults en vez de valores guardados.
- Corregido: La ruta de edición pasaba `transition.options.sceneID` al constructor, pero `sceneID` nunca se guardaba como campo del formulario, causando que `this.sceneID` fuera `undefined` y `_updateObject` no encontrara la escena. Ahora usa `scene.id` directamente.
- Lanzamiento inicial (rebase de la serie v1.0.x).
