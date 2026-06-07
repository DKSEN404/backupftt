export const MODULE_ID = 'nr-scene-fade';
export const MODULE_NAME = 'NR Scene Fade';
export const MODULE_PATH = `modules/${MODULE_ID}/`;

export const DEFAULT_SETTING = {
  sceneId: '',
  gmHide: false,
  fontColor: '#f0d000',
  fontSize: 28,
  fontFamily: "'Share Tech Mono', 'Courier New', monospace",
  bgImg: '',
  bgPos: 'center center',
  bgLoop: true,
  bgMuted: true,
  bgSize: 'cover',
  bgColor: '#0a0a0a',
  bgOpacity: 0.95,
  fadeIn: 800,
  delay: 7000,
  fadeOut: 1000,
  volume: 0.7,
  audioLoop: false,
  gmEndAll: true,
  showUI: false,
  activateScene: false,
  content: '',
  rawContent: '',
  customCSS: '',
  fullscreen: false,
  contentMode: 'richtext',
  audio: '',
  fromSocket: false,
  users: [],
  presetId: 'amber-terminal',
  domEffects: ['scanlines', 'glitch-line'],
  canvasEffects: []
};

export const SETTINGS = {
  DEFAULT_OPTIONS_MENU_KEY: 'default-options-menu',
  DEFAULT_OPTIONS: 'default-options',
  SHOW_JOURNAL_HEADER: 'show-journal-header-transition'
};

export const TEMPLATES = {
  OVERLAY: `${MODULE_PATH}templates/overlay.hbs`,
  EDIT_FORM: `${MODULE_PATH}templates/edit-form.hbs`
};

export const EFFECTS_DOM = [
  { id: 'scanlines', name: 'Scanlines CRT', cssClass: 'nr-effect-scanlines' },
  { id: 'glitch-line', name: 'Glitch Line (Horizontal)', cssClass: 'nr-effect-glitch-line' },
  { id: 'glitch-text', name: 'Glitch Text', cssClass: 'nr-effect-glitch-text' },
  { id: 'chromatic-aberration', name: 'Aberración Cromática', cssClass: 'nr-effect-chromatic' },
  { id: 'neon-border', name: 'Borde Neón', cssClass: 'nr-effect-neon-border' },
  { id: 'typewriter', name: 'Máquina de Escribir', cssClass: 'nr-effect-typewriter' }
];

export const EFFECTS_CANVAS = [
  { id: 'digital-rain', name: 'Lluvia Digital' },
  { id: 'particles', name: 'Partículas' },
  { id: 'static-noise', name: 'Ruido Estático' },
  { id: 'cyber-grid', name: 'Rejilla 3D' }
];

export const HOOKS_CONTEXT = {
  getSceneNavigationContext: 'sceneId',
  getSceneDirectoryEntryContext: 'documentId',
  getJournalDirectoryEntryContext: 'documentId'
};
