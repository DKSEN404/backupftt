import { MODULE_ID, SETTINGS, DEFAULT_SETTING } from './constants.mjs';
import NRSceneFade from './NRSceneFade.mjs';
import * as SocketManager from './SocketManager.mjs';
import { registerHooks } from './ContextMenu.mjs';
import DefaultOptionsForm from './forms/DefaultOptionsForm.mjs';
import { initDefaultPresets } from './presets/Registry.mjs';

let nrFade = null;

Hooks.once('init', function () {
  Handlebars.registerHelper('contains', function (arr, val) {
    return Array.isArray(arr) && arr.includes(val);
  });

  Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });

  nrFade = new NRSceneFade();
  initDefaultPresets();

  game.settings.register(MODULE_ID, SETTINGS.DEFAULT_OPTIONS, {
    name: `${MODULE_ID}.settings.defaultOptions.name`,
    hint: `${MODULE_ID}.settings.defaultOptions.hint`,
    scope: 'world',
    config: false,
    type: Object,
    default: DEFAULT_SETTING,
    onChange: () => {}
  });

  game.settings.registerMenu(MODULE_ID, SETTINGS.DEFAULT_OPTIONS_MENU_KEY, {
    name: `${MODULE_ID}.settings.defaultOptions.name`,
    label: `${MODULE_ID}.settings.defaultOptions.label`,
    hint: `${MODULE_ID}.settings.defaultOptions.hint`,
    icon: 'fas fa-sliders-h',
    type: DefaultOptionsForm,
    restricted: true
  });

  game.settings.register(MODULE_ID, SETTINGS.SHOW_JOURNAL_HEADER, {
    name: `${MODULE_ID}.settings.showJournalHeader.name`,
    hint: `${MODULE_ID}.settings.showJournalHeader.hint`,
    label: `${MODULE_ID}.settings.showJournalHeader.label`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: true
  });
});

Hooks.once('setup', function () {
  const socketlibMod = game.modules.get('socketlib');
  if (!socketlibMod?.active) {
    console.error(`${MODULE_ID} | socketlib is required but not active. Multiplayer sync disabled.`);
  }
});

Hooks.once('ready', function () {
  const socketlibMod = game.modules.get('socketlib');
  if (!socketlibMod?.active) {
    console.warn(`${MODULE_ID} | socketlib not active. Running in single-player mode. Context menus still available.`);
    registerHooks();
    game.modules.get(MODULE_ID).api = {
      play: (options) => nrFade.play(options),
      stop: (force) => nrFade.stop(force),
      isActive: () => nrFade.isActive,
      executeAction: (options) => nrFade.executeAction(options)
    };
    return;
  }

  SocketManager.registerSocket();
  registerHooks();

  game.modules.get(MODULE_ID).api = {
    play: (options) => nrFade.play(options),
    stop: (force) => nrFade.stop(force),
    isActive: () => nrFade.isActive,
    executeAction: (options) => nrFade.executeAction(options)
  };
});
