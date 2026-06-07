var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _reset, reset_fn, _updateFontColor, updateFontColor_fn, _updateFontSize, updateFontSize_fn, _updateContent, updateContent_fn, _updateBgImage, updateBgImage_fn, _updateBgPos, updateBgPos_fn, _updateBgSize, updateBgSize_fn, _updateBgColor, updateBgColor_fn, _updateBgOpacity, updateBgOpacity_fn, _updateAudio, updateAudio_fn, _updateVolume, updateVolume_fn, _buildOptions, buildOptions_fn, _buildTransition, buildTransition_fn, _addCloseEvent, addCloseEvent_fn, _executeFadeIn, executeFadeIn_fn;
const CONSTANTS = {
  MODULE: {
    ID: "scene-transitions",
    NAME: "Scene Transitions",
    PATH: "modules/scene-transitions/"
  },
  DEFAULT_SETTING: {
    sceneID: "",
    gmHide: false,
    fontColor: "#777777",
    fontSize: 28,
    bgImg: "",
    bgPos: "center center",
    bgLoop: true,
    bgMuted: true,
    bgSize: "cover",
    bgColor: "#000000",
    bgOpacity: 0.7,
    fadeIn: 400,
    delay: 4e3,
    fadeOut: 1e3,
    volume: 1,
    audioLoop: true,
    allowPlayersToEnd: true,
    gmEndAll: true,
    showUI: false,
    activateScene: false,
    content: "",
    audio: "",
    fromSocket: false,
    users: []
  },
  SETTING: {
    DEBUG: "debug",
    DEFAULT_OPTIONS_MENU: {
      KEY: "default-options-menu",
      NAME: "scene-transitions.setting.defaultOptionsMenu.name",
      HINT: "scene-transitions.setting.defaultOptionsMenu.hint",
      LABEL: "scene-transitions.setting.defaultOptionsMenu.label",
      ICON: "fas fa-gear"
    },
    DEFAULT_OPTIONS: "default-options",
    SHOW_JOURNAL_HEADER: "show-journal-header-transition",
    RESET: "resetAllSettings"
  },
  TEMPLATE: {
    EDIT_TRANSITION_FORM: "modules/scene-transitions/templates/edit-transition-form.hbs",
    SCENE_TRANSITION: "modules/scene-transitions/templates/scene-transition.hbs"
  }
};
const _Utils = class _Utils {
  /**
   * Convert seconds into milliseconds
   * @param {number} seconds The seconds
   * @returns {number}       The milliseconds
   */
  static convertSecondsToMilliseconds(seconds) {
    if (!seconds)
      return 0;
    return seconds * 1e3;
  }
  /**
   * Get the first image source from a journal page
   * @param {object} page The page
   * @returns {string}    The image source
   */
  static getFirstImageFromPage(page) {
    const content = page?.text?.content;
    if (!content)
      return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const src = doc.querySelector("img").getAttribute("src");
    return src || null;
  }
  /**
   * Get text including HTML tags from a journal page
   * @param {object} page The page
   * @returns {string}    The text
   */
  static getTextFromPage(page) {
    const content = page?.text?.content;
    if (!content)
      return null;
    const textTags = ["BLOCKQUOTE", "CODE", "H1", "H2", "H3", "H4", "H5", "H6", "P"];
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const tags = Array.from(doc.body.children);
    const filteredTags = tags.filter((tag) => textTags.includes(tag.tagName));
    const text = filteredTags.map((tag) => tag.outerHTML).join("");
    return text || null;
  }
  /**
   * Preload video metadata
   * @param {string} src The video source
   * @returns {object}   The video
   */
  static async preloadVideoMetadata(src) {
    return new Promise((resolve, reject) => {
      try {
        const video = document.createElement("video");
        video.setAttribute("src", src);
        video.preload = "metadata";
        video.onloadedmetadata = function() {
          resolve(this);
        };
        video.onerror = function() {
          reject("Invalid video. Please select a video file.");
        };
        return video;
      } catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Get video duration from metadata
   * @param {string} src The video source
   * @returns {number}   The duration in milliseconds
   */
  static async getVideoDuration(src) {
    const video = await this.preloadVideoMetadata(src);
    return this.convertSecondsToMilliseconds(video.duration);
  }
  /**
   * Get the video type
   * @param {*} src    The source
   * @returns {string} The video type
   */
  static getVideoType(src) {
    if (src.endsWith("webm")) {
      return "video/webm";
    } else if (src.endsWith("mp4")) {
      return "video/mp4";
    }
    return "video/mp4";
  }
  /**
   * Get module setting
   * @param {string} key          The key
   * @param {string} defaultValue The default value
   * @returns {*}                 The setting
   */
  static getSetting(key, defaultValue = null) {
    let value = defaultValue ?? null;
    try {
      value = game.settings.get(CONSTANTS.MODULE.ID, key);
    } catch {
      Logger.debug(`Setting '${key}' not found`);
    }
    return value;
  }
  /**
   * Set module setting
   * @param {string} key The key
   * @param {*} value    The value
   */
  static async setSetting(key, value) {
    if (game.settings.settings.get(`${CONSTANTS.MODULE.ID}.${key}`)) {
      await game.settings.set(CONSTANTS.MODULE.ID, key, value);
      Logger.debug(`Setting '${key}' set to '${value}'`);
    } else {
      Logger.debug(`Setting '${key}' not found`);
    }
  }
  /**
   * Whether the value is a boolean
   * @param {*} value   The value
   * @returns {boolean} Whether the value is a boolean
   */
  static isBoolean(value) {
    if (String(value) === "true" || String(value) === "false") {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Whether the file is a video
   * @param {string} src The source
   * @returns {boolean}  Whether the file is a video
   */
  static isVideo(src) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(src)?.[1];
    return ext === "webm" || ext === "mp4";
  }
  static stripQueryStringAndHashFromPath(url) {
    let myUrl = url;
    if (!myUrl) {
      return myUrl;
    }
    if (myUrl.includes("?")) {
      myUrl = myUrl.split("?")[0];
    }
    if (myUrl.includes("#")) {
      myUrl = myUrl.split("#")[0];
    }
    return myUrl;
  }
  static retrieveFirstImageFromJournalId(id, pageId, noDefault) {
    const journalEntry = game.journal.get(id);
    let firstImage = void 0;
    if (!journalEntry) {
      return firstImage;
    }
    if (journalEntry?.pages.size > 0) {
      const sortedArray = journalEntry.pages.contents.sort((a, b) => a.sort - b.sort);
      if (pageId) {
        const pageSelected = sortedArray.find((page) => page.id === pageId);
        if (pageSelected) {
          if (pageSelected.type === "image" && pageSelected.src) {
            firstImage = stripQueryStringAndHashFromPath(pageSelected.src);
          } else if (pageSelected.src) {
            firstImage = stripQueryStringAndHashFromPath(pageSelected.src);
          }
        }
      }
      if (!noDefault && !firstImage) {
        for (const pageEntry of sortedArray) {
          if (pageEntry.type === "image" && pageEntry.src) {
            firstImage = stripQueryStringAndHashFromPath(pageEntry.src);
            break;
          } else if (pageEntry.src && pageEntry.type === "pdf") {
            firstImage = stripQueryStringAndHashFromPath(pageEntry.src);
            break;
          } else if (pageEntry.src) {
            firstImage = stripQueryStringAndHashFromPath(pageEntry.src);
            break;
          }
        }
      }
    }
    return firstImage;
  }
  static retrieveFirstTextFromJournalId(id, pageId, noDefault) {
    const journalEntry = game.journal.get(id);
    let firstText = void 0;
    if (!journalEntry) {
      return firstText;
    }
    if (journalEntry?.pages.size > 0) {
      const sortedArray = journalEntry.pages.contents.sort((a, b) => a.sort - b.sort);
      if (pageId) {
        const pageSelected = sortedArray.find((page) => page.id === pageId);
        if (pageSelected) {
          if (pageSelected.type === "text" && pageSelected.text?.content) {
            firstText = pageSelected.text?.content;
          } else if (pageSelected.text?.content) {
            firstText = pageSelected.text?.content;
          }
        }
      }
      if (!noDefault && !firstText) {
        for (const journalEntry2 of sortedArray) {
          if (journalEntry2.type === "text" && journalEntry2.text?.content) {
            firstText = journalEntry2.text?.content;
            break;
          } else if (journalEntry2.text?.content) {
            firstText = journalEntry2.text?.content;
            break;
          }
        }
      }
    }
    return firstText;
  }
};
__name(_Utils, "Utils");
let Utils = _Utils;
const _Logger = class _Logger {
  static get DEBUG() {
    return Utils.getSetting("debug") || game.modules.get("_dev-mode")?.api?.getPackageDebugValue(CONSTANTS.MODULE.ID, "boolean");
  }
  // export let debugEnabled = 0;
  // 0 = none, warnings = 1, debug = 2, all = 3
  static debug(msg, ...args) {
    try {
      if (Utils.getSetting("debug") || game.modules.get("_dev-mode")?.api?.getPackageDebugValue(CONSTANTS.MODULE.ID, "boolean")) {
        console.log(`DEBUG | ${CONSTANTS.MODULE.ID} | ${msg}`, ...args);
      }
    } catch (e) {
    }
    return msg;
  }
  static logObject(...args) {
    return this.log("", args);
  }
  static log(message, ...args) {
    try {
      message = `${CONSTANTS.MODULE.ID} | ${message}`;
      console.log(message.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return message;
  }
  static notify(message, ...args) {
    try {
      message = `${CONSTANTS.MODULE.NAME} | ${message}`;
      ui.notifications?.notify(message);
      console.log(message.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return message;
  }
  static info(info, notify = false, ...args) {
    try {
      info = `${CONSTANTS.MODULE.NAME} | ${info}`;
      if (notify) {
        ui.notifications?.info(info);
      }
      console.log(info.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return info;
  }
  static warn(warning, notify = false, ...args) {
    try {
      warning = `${CONSTANTS.MODULE.NAME} | ${warning}`;
      if (notify) {
        ui.notifications?.warn(warning);
      }
      console.warn(warning.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return warning;
  }
  static errorObject(...args) {
    return this.error("", false, args);
  }
  static error(error, notify = true, ...args) {
    try {
      error = `${CONSTANTS.MODULE.ID} | ${error}`;
      if (notify) {
        ui.notifications?.error(error);
      }
      console.error(error.replace("<br>", "\n"), ...args);
    } catch (e) {
      console.error(e.message);
    }
    return new Error(error.replace("<br>", "\n"));
  }
  static timelog(message) {
    warn(Date.now(), message);
  }
  // setDebugLevel = (debugText): void => {
  //   debugEnabled = { none: 0, warn: 1, debug: 2, all: 3 }[debugText] || 0;
  //   // 0 = none, warnings = 1, debug = 2, all = 3
  //   if (debugEnabled >= 3) CONFIG.debug.hooks = true;
  // };
  static dialogWarning(message, icon = "fas fa-exclamation-triangle") {
    return `<p class="${CONSTANTS.MODULE.ID}-dialog">
        <i style="font-size:3rem;" class="${icon}"></i><br><br>
        <strong style="font-size:1.2rem;">${CONSTANTS.MODULE.ID}</strong>
        <br><br>${message}
    </p>`;
  }
};
__name(_Logger, "Logger");
__publicField(_Logger, "i18n", (key) => {
  return game.i18n.localize(key)?.trim();
});
__publicField(_Logger, "i18nFormat", (key, data = {}) => {
  return game.i18n.format(key, data)?.trim();
});
let Logger = _Logger;
const _SceneTransitionOptions = class _SceneTransitionOptions {
  constructor(options) {
    const defaultUserOption = Utils.getSetting(CONSTANTS.SETTING.DEFAULT_OPTIONS);
    const defaultSystemOption = CONSTANTS.DEFAULT_SETTING;
    const defaultOption = foundry.utils.mergeObject(defaultSystemOption, defaultUserOption);
    this.action = options.action || defaultOption.action;
    this.sceneID = options.sceneID || defaultOption.sceneID;
    this.gmHide = Utils.isBoolean(options.gmHide) ? options.gmHide : defaultOption.gmHide;
    this.fontColor = options.fontColor || defaultOption.fontColor;
    this.fontSize = parseInt(options.fontSize) || defaultOption.fontSize;
    this.bgImg = options.bgImg || defaultOption.bgImg;
    this.bgPos = options.bgPos || defaultOption.bgPos;
    this.bgLoop = Utils.isBoolean(options.bgLoop) ? options.bgLoop : defaultOption.bgLoop;
    this.bgMuted = Utils.isBoolean(options.bgMuted) ? options.bgMuted : defaultOption.bgMuted;
    this.bgSize = options.bgSize || defaultOption.bgSize;
    this.bgColor = options.bgColor || defaultOption.bgColor;
    this.bgOpacity = options.bgOpacity || defaultOption.bgOpacity;
    this.fadeIn = options.fadeIn || defaultOption.fadeIn;
    this.delay = options.delay || defaultOption.delay;
    this.fadeOut = options.fadeOut || defaultOption.fadeOut;
    this.volume = options.volume || defaultOption.volume;
    this.audioLoop = Utils.isBoolean(options.audioLoop) ? options.audioLoop : defaultOption.audioLoop;
    this.allowPlayersToEnd = Utils.isBoolean(options.allowPlayersToEnd) ? options.allowPlayersToEnd : defaultOption.allowPlayersToEnd;
    this.gmEndAll = Utils.isBoolean(options.gmEndAll) ? options.gmEndAll : defaultOption.gmEndAll;
    this.showUI = Utils.isBoolean(options.showUI) ? options.showUI : defaultOption.showUI;
    this.activateScene = Utils.isBoolean(options.activateScene) ? options.activateScene : defaultOption.activateScene;
    this.content = options.content || defaultOption.content;
    this.audio = options.audio || defaultOption.audio;
    this.fromSocket = Utils.isBoolean(options.fromSocket) ? options.fromSocket : defaultOption.fromSocket;
    this.users = options.users || defaultOption.users;
  }
};
__name(_SceneTransitionOptions, "SceneTransitionOptions");
let SceneTransitionOptions = _SceneTransitionOptions;
const _DefaultOptionsForm = class _DefaultOptionsForm extends FormApplication {
  constructor(...args) {
    super(args);
    __privateAdd(this, _reset);
  }
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: CONSTANTS.TEMPLATE.EDIT_TRANSITION_FORM,
      title: game.i18n.localize("scene-transitions.configureDefaultOptions"),
      width: 400,
      height: 680,
      closeOnSubmit: true,
      minimizable: true,
      resizable: true
    });
  }
  async getData() {
    const data = Utils.getSetting(CONSTANTS.SETTING.DEFAULT_OPTIONS) ?? CONSTANTS.DEFAULT_SETTING;
    return { ...data, default: CONSTANTS.DEFAULT_SETTING };
  }
  activateListeners(html) {
    super.activateListeners(html);
    html.on("click", "[data-action]", this.handleButtonClick.bind(this));
  }
  async handleButtonClick(event) {
    event.preventDefault();
    const clickedElement = $(event.currentTarget);
    const { action } = clickedElement.data();
    switch (action) {
      case "reset": {
        await __privateMethod(this, _reset, reset_fn).call(this);
        break;
      }
    }
  }
  async _updateObject(event, formData) {
    Utils.setSetting(CONSTANTS.SETTING.DEFAULT_OPTIONS, formData);
  }
};
_reset = new WeakSet();
reset_fn = /* @__PURE__ */ __name(async function() {
  await Utils.setSetting(CONSTANTS.SETTING.DEFAULT_OPTIONS, CONSTANTS.DEFAULT_SETTING);
  this.render(true);
}, "#reset");
__name(_DefaultOptionsForm, "DefaultOptionsForm");
let DefaultOptionsForm = _DefaultOptionsForm;
const _EditTransitionForm = class _EditTransitionForm extends DefaultOptionsForm {
  constructor(object, options) {
    super(object, options);
    __privateAdd(this, _updateFontColor);
    __privateAdd(this, _updateFontSize);
    __privateAdd(this, _updateContent);
    __privateAdd(this, _updateBgImage);
    __privateAdd(this, _updateBgPos);
    __privateAdd(this, _updateBgSize);
    __privateAdd(this, _updateBgColor);
    __privateAdd(this, _updateBgOpacity);
    __privateAdd(this, _updateAudio);
    __privateAdd(this, _updateVolume);
    this.transition = object || {};
    this.data = {};
    this.interval = null;
  }
  /**
   *
   */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "scene-transitions-form",
      title: game.i18n.localize("scene-transitions.editSceneTransition"),
      template: CONSTANTS.TEMPLATE.EDIT_TRANSITION_FORM,
      classes: ["sheet", "scene-transitions-form"],
      width: 400,
      height: 680,
      left: "100px",
      closeOnSubmit: true,
      minimizable: true,
      resizable: true
    });
  }
  /**
   * Get data for the triggler form
   */
  async getData(options) {
    const context = this.transition.options;
    context.default = CONSTANTS.DEFAULT_SETTING;
    context.isEdit = true;
    context.transitionContent = await TextEditor.enrichHTML(this.transition.options.content, {
      secrets: true,
      async: true
    });
    return context;
  }
  /** @inheritdoc */
  async activateEditor(name, options = {}, initialContent = "") {
    options.plugins = {
      menu: ProseMirror.ProseMirrorMenu.build(ProseMirror.defaultSchema, {
        compact: true,
        destroyOnSave: false,
        onSave: () => {
          this._saveEditor(name, { remove: false });
        }
      })
    };
    return super.activateEditor(name, options, initialContent);
  }
  /**
   * Handle saving the content of a specific editor by name
   * @param {string} name           The named editor to save
   * @param {boolean} [remove]      Remove the editor after saving its content
   * @returns {Promise<void>}
   */
  async _saveEditor(name, { remove = true } = {}) {
    const editor = this.editors[name];
    if (!editor || !editor.instance)
      throw new Error(`${name} is not an active editor name!`);
    editor.active = false;
    const { instance } = editor;
    await this._onSubmit(new Event("submit"), {
      preventClose: true
    });
    if (remove) {
      instance.destroy();
      editor.instance = editor.mce = null;
      if (editor.hasButton)
        editor.button.style.display = "block";
      this.render();
    }
    editor.changed = false;
  }
  async activateListeners(html) {
    super.activateListeners(html);
    const contentHTML = await TextEditor.enrichHTML(this.transition.options.content, {
      secrets: true,
      async: true
    });
    $('[data-edit="content"]').html(contentHTML);
    const fontColorSelector = `${foundry.utils.isNewerVersion(game.version, 11.315) ? "color-picker" : "input"}[name="fontColor"]`;
    const fontColorElement = html[0].querySelector(fontColorSelector);
    fontColorElement.addEventListener("change", __privateMethod(this, _updateFontColor, updateFontColor_fn).bind(this));
    const fontSizeElement = html[0].querySelector('input[name="fontSize"]');
    fontSizeElement.addEventListener("change", __privateMethod(this, _updateFontSize, updateFontSize_fn).bind(this));
    const editorElement = html[0].querySelector(".editor-content");
    editorElement.addEventListener("input", __privateMethod(this, _updateContent, updateContent_fn).bind(this));
    editorElement.addEventListener("cut", __privateMethod(this, _updateContent, updateContent_fn).bind(this));
    editorElement.addEventListener("paste", __privateMethod(this, _updateContent, updateContent_fn).bind(this));
    const bgImageElement = html[0].querySelector('input[name="bgImg"]');
    bgImageElement.addEventListener("change", __privateMethod(this, _updateBgImage, updateBgImage_fn).bind(this));
    const bgPosElement = html[0].querySelector('input[name="bgPos"]');
    bgPosElement.addEventListener("change", __privateMethod(this, _updateBgPos, updateBgPos_fn).bind(this));
    const bgSizeElement = html[0].querySelector('input[name="bgSize"]');
    bgSizeElement.addEventListener("change", __privateMethod(this, _updateBgSize, updateBgSize_fn).bind(this));
    const bgColorSelector = `${foundry.utils.isNewerVersion(game.version, 11.315) ? "color-picker" : "input"}[name="bgColor"]`;
    const bgColorElement = html[0].querySelector(bgColorSelector);
    bgColorElement.addEventListener("change", __privateMethod(this, _updateBgColor, updateBgColor_fn).bind(this));
    const bgOpacityElement = html[0].querySelector('input[name="bgOpacity"]');
    bgOpacityElement.addEventListener("change", __privateMethod(this, _updateBgOpacity, updateBgOpacity_fn).bind(this));
    const audioElement = html[0].querySelector('input[name="audio"]');
    audioElement.addEventListener("change", __privateMethod(this, _updateAudio, updateAudio_fn).bind(this));
    const volumeElement = html[0].querySelector('input[name="volume"]');
    volumeElement.addEventListener("change", __privateMethod(this, _updateVolume, updateVolume_fn).bind(this));
  }
  // @ts-ignore
  close() {
    this.transition.destroy(true);
    super.close({ force: true });
  }
  async _updateObject(event, formData) {
    this.transition.updateData(formData);
    const scene = game.scenes?.get(this.transition.options.sceneID);
    if (this.transition.options.sceneID && scene) {
      await scene.setFlag(CONSTANTS.MODULE.ID, "transition", this.transition);
    } else {
      Logger.warn(`No scene has been found with id ${this.transition.options.sceneID}`);
      return;
    }
  }
};
_updateFontColor = new WeakSet();
updateFontColor_fn = /* @__PURE__ */ __name(function(event) {
  if (!this.transition.element) {
    return;
  }
  this.transition.element.querySelector(".scene-transitions-content").style.color = event.target.value;
}, "#updateFontColor");
_updateFontSize = new WeakSet();
updateFontSize_fn = /* @__PURE__ */ __name(function(event) {
  if (!this.transition.element) {
    return;
  }
  this.transition.element.querySelector(".scene-transitions-content").style.fontSize = `${event.target.value}px`;
}, "#updateFontSize");
_updateContent = new WeakSet();
updateContent_fn = /* @__PURE__ */ __name(function(event) {
  if (!this.transition.element) {
    return;
  }
  this.transition.element.querySelector(".scene-transitions-content").innerHTML = this.editors.content.options.target.innerHTML;
}, "#updateContent");
_updateBgImage = new WeakSet();
updateBgImage_fn = /* @__PURE__ */ __name(function(event) {
  if (!this.transition.element) {
    return;
  }
  this.transition.element.querySelector(".scene-transitions-bg").style.backgroundImage = `url('${event.target.value}')`;
}, "#updateBgImage");
_updateBgPos = new WeakSet();
updateBgPos_fn = /* @__PURE__ */ __name(function(event) {
  if (!this.transition.element) {
    return;
  }
  this.transition.element.querySelector(".scene-transitions-bg").style.backgroundPosition = event.target.value;
}, "#updateBgPos");
_updateBgSize = new WeakSet();
updateBgSize_fn = /* @__PURE__ */ __name(function(event) {
  if (!this.transition.element) {
    return;
  }
  this.transition.element.querySelector(".scene-transitions-bg").style.backgroundSize = event.target.value;
}, "#updateBgSize");
_updateBgColor = new WeakSet();
updateBgColor_fn = /* @__PURE__ */ __name(function(event) {
  if (!this.transition.element) {
    return;
  }
  this.transition.element.querySelector(".scene-transitions-bg").style.backgroundColor = event.target.value;
}, "#updateBgColor");
_updateBgOpacity = new WeakSet();
updateBgOpacity_fn = /* @__PURE__ */ __name(function(event) {
  if (!this.transition.element) {
    return;
  }
  this.transition.element.querySelector(".scene-transitions-bg").style.opacity = event.target.value;
}, "#updateBgOpacity");
_updateAudio = new WeakSet();
updateAudio_fn = /* @__PURE__ */ __name(function(event) {
  this.transition.playAudio(event.target.value);
}, "#updateAudio");
_updateVolume = new WeakSet();
updateVolume_fn = /* @__PURE__ */ __name(function(event) {
  if (this.transition.audio?.playing) {
    this.transition.audio.gain.value = event.target.value;
  }
}, "#updateVolume");
__name(_EditTransitionForm, "EditTransitionForm");
let EditTransitionForm = _EditTransitionForm;
let sceneTransitionsSocket;
function registerSocket() {
  Logger.debug("Registered socket");
  if (sceneTransitionsSocket) {
    return sceneTransitionsSocket;
  }
  sceneTransitionsSocket = socketlib.registerModule(CONSTANTS.MODULE.ID);
  sceneTransitionsSocket.register("executeAction", (...args) => API.executeActionArr(...args));
  sceneTransitionsSocket.register("macro", (...args) => API.macroArr(...args));
  game.modules.get(CONSTANTS.MODULE.ID).socket = sceneTransitionsSocket;
  return sceneTransitionsSocket;
}
__name(registerSocket, "registerSocket");
const _SceneTransition = class _SceneTransition {
  /**
   *
   * @param {boolean} preview
   * @param {object} options: v0.1.1 options go here. Previously sceneID
   */
  constructor(preview, options = {}) {
    /**
     * Build options
     */
    __privateAdd(this, _buildOptions);
    /**
     * Build transition
     */
    __privateAdd(this, _buildTransition);
    /**
     * Add on click event listener to the Close button
     */
    __privateAdd(this, _addCloseEvent);
    /**
     * Execute the fade in of the main element
     * @private
     */
    __privateAdd(this, _executeFadeIn);
    this.preview = preview;
    this.options = foundry.utils.mergeObject(this.constructor.defaultOptions, options);
    this.journal = null;
    this.element = null;
    this.destroying = false;
    this.audio = null;
  }
  static get defaultOptions() {
    const defaultSettings = Utils.getSetting(CONSTANTS.SETTING.DEFAULT_OPTIONS) || {};
    return new SceneTransitionOptions(defaultSettings);
  }
  /********************
   * Button functions for Foundry menus and window headers
   *******************/
  /**
   * Handles the renderSceneConfig Hook
   *
   * Injects HTML into the scene config.
   *
   * @static
   * @param {SceneConfig} sceneConfig - The Scene config sheet
   * @param {jQuery} html - The HTML of the sheet
   * @param {object} data - Data associated with the sheet rendering
   * @memberof PinFixer
   */
  static async renderSceneConfig(sceneConfig, html, data) {
    const ambItem = html.find(".item[data-tab=ambience]");
    const ambTab = html.find(".tab[data-tab=ambience]");
    ambItem.after(`<a class="item" data-tab="scene-transitions">
		<i class="fas fa-bookmark"></i> ${game.i18n.localize(`${CONSTANTS.MODULE.ID}.scene.config.title`)}</a>`);
    ambTab.after(await this.getSceneHtml(this.getSceneTemplateData(data)));
    this.attachEventListeners(html);
  }
  /**
   * The HTML to be added to the scene configuration
   * in order to configure Pin Fixer for the scene.
   * @param {PinFixSettings} settings - The Pin Fixer settings of the scene being configured.
   * @static
   * @return {string} The HTML to be injected
   * @memberof PinFixer
   */
  static async getSceneHtml(settings) {
    return await renderTemplate(CONSTANTS.TEMPLATE.EDIT_TRANSITION_FORM, settings);
  }
  /**
   * Retrieves the current data for the scene being configured.
   *
   * @static
   * @param {object} data - The data being passed to the scene config template
   * @return {PinFixSettings}
   * @memberof PinFixer
   */
  static getSceneTemplateData(hookData) {
    let data = getProperty(hookData.data?.flags[CONSTANTS.MODULE.ID], "transition.options");
    if (!data) {
      const defaultSettings = Utils.getSetting(CONSTANTS.SETTING.DEFAULT_OPTIONS) || {};
      data = foundry.utils.mergeObject(defaultSettings, CONSTANTS.DEFAULT_SETTING);
    }
    return data;
  }
  static addPlayTransitionBtn(idField) {
    return {
      name: game.i18n.localize(`${CONSTANTS.MODULE.ID}.label.playTransition`),
      icon: '<i class="fas fa-play-circle"></i>',
      condition: (li) => {
        const scene = game.scenes?.get(li.data(idField));
        if (game.user?.isGM && typeof scene.getFlag(CONSTANTS.MODULE.ID, "transition") == "object") {
          return true;
        } else {
          return false;
        }
      },
      callback: (li) => {
        let sceneID = li.data(idField);
        game.scenes?.preload(sceneID, true);
        const scene = game.scenes?.get(li.data(idField));
        let transition = scene.getFlag(CONSTANTS.MODULE.ID, "transition");
        let options = transition.options;
        options.sceneID = sceneID;
        options = {
          ...options,
          fromSocket: true
        };
        if (!sceneTransitionsSocket) {
          registerSocket();
        }
        sceneTransitionsSocket.executeForEveryone("executeAction", options);
      }
    };
  }
  static addCreateTransitionBtn(idField) {
    return {
      name: "Create Transition",
      icon: '<i class="fas fa-plus-square"></i>',
      condition: (li) => {
        const scene = game.scenes?.get(li.data(idField));
        if (game.user?.isGM && !scene.getFlag(CONSTANTS.MODULE.ID, "transition")) {
          return true;
        } else {
          return false;
        }
      },
      callback: (li) => {
        let sceneID = li.data(idField);
        let options = {
          sceneID
        };
        let activeTransition = new _SceneTransition(true, options, void 0);
        activeTransition.render();
        new EditTransitionForm(activeTransition, void 0).render(true);
      }
    };
  }
  static addEditTransitionBtn(idField) {
    return {
      name: "Edit Transition",
      icon: '<i class="fas fa-edit"></i>',
      condition: (li) => {
        const scene = game.scenes?.get(li.data(idField));
        if (game.user?.isGM && scene.getFlag(CONSTANTS.MODULE.ID, "transition")) {
          return true;
        } else {
          return false;
        }
      },
      callback: (li) => {
        let scene = game.scenes?.get(li.data(idField));
        let transition = scene.getFlag(CONSTANTS.MODULE.ID, "transition");
        let activeTransition = new _SceneTransition(true, transition.options, void 0);
        activeTransition.render();
        new EditTransitionForm(activeTransition, void 0).render(true);
      }
    };
  }
  static addDeleteTransitionBtn(idField) {
    return {
      name: game.i18n.localize(`${CONSTANTS.MODULE.ID}.label.deleteTransition`),
      icon: '<i class="fas fa-trash-alt"></i>',
      condition: (li) => {
        const scene = game.scenes?.get(li.data(idField));
        if (game.user?.isGM && scene.getFlag(CONSTANTS.MODULE.ID, "transition")) {
          return true;
        } else {
          return false;
        }
      },
      callback: (li) => {
        let scene = game.scenes?.get(li.data(idField));
        scene.unsetFlag(CONSTANTS.MODULE.ID, "transition");
      }
    };
  }
  static addPlayTransitionBtnJE(idField) {
    return {
      name: game.i18n.localize(`${CONSTANTS.MODULE.ID}.label.playTransitionFromJournal`),
      icon: '<i class="fas fa-play-circle"></i>',
      condition: (li) => {
        if (game.user?.isGM) {
          return true;
        } else {
          return false;
        }
      },
      callback: (li) => {
        let id = li.data(idField);
        let journal = game.journal?.get(id)?.data;
        if (!journal) {
          Logger.warn(`No journal is found`);
          return;
        }
        const content = Utils.retrieveFirstTextFromJournalId(id, void 0, false);
        const img = Utils.retrieveFirstImageFromJournalId(id, void 0, false);
        let options = new SceneTransitionOptions({
          sceneID: void 0,
          content,
          bgImg: img
        });
        options = {
          ...options,
          fromSocket: true
        };
        if (!sceneTransitionsSocket) {
          registerSocket();
        }
        sceneTransitionsSocket.executeForEveryone("executeAction", options);
      }
    };
  }
  /**
   * Render the transition
   */
  async render() {
    _SceneTransition.activeTransition = this;
    if (this.options.gmHide && game.user?.isGM) {
      Logger.info(`Option 'gmHide' is true and you are a GM so you don't see the transition`);
      return;
    }
    await __privateMethod(this, _buildOptions, buildOptions_fn).call(this);
    await __privateMethod(this, _buildTransition, buildTransition_fn).call(this);
  }
  /**
   * Play the audio
   * @private
   */
  playAudio(src = this.options.audio, volume = this.options.volume, loop = this.options.audioLoop) {
    if (game.audio.locked) {
      Logger.info("Audio playback locked, cannot play " + this.options.audio);
    } else {
      let thisTransition = this;
      if (this.audio?.playing) {
        this.audio.stop();
      }
      this.audio = null;
      AudioHelper.play(
        {
          src,
          volume,
          loop: String(loop) === "true" ? true : false
        },
        false
      ).then(function(audio) {
        audio.on("stop", (a) => {
        });
        audio.on("end", (a) => {
        });
        thisTransition.audio = audio;
      });
    }
  }
  /**
   * Set delay before fading out the transition
   */
  setDelay() {
    if (!this.options.delay)
      return;
    this.timeout = setTimeout(
      function() {
        this.destroy();
      }.bind(this),
      this.options.delay
    );
  }
  /**
   * Destroy the transition
   */
  async destroy(instant = false) {
    if (this.destroying == true)
      return;
    this.destroying = true;
    let time = instant ? 0 : this.options.fadeOut;
    clearTimeout(this.timeout);
    if (this.audio?.playing) {
      this.fadeAudio(this.audio, time);
    }
    return $(this.element)?.fadeOut(time, () => {
      this.element.remove();
      this.element = null;
    }).promise();
  }
  updateData(newData) {
    this.options = foundry.utils.mergeObject(this.options, newData);
    return this;
  }
  getJournalText() {
    return Utils.retrieveFirstTextFromJournalId(this.journal?.id, void 0, false);
  }
  getJournalImg() {
    return Utils.retrieveFirstImageFromJournalId(this.journal?.id, void 0, false);
  }
  /**
   * Fade audio
   * @param {*} audio The audio
   * @param {*} time  The fade duration
   * @returns
   */
  fadeAudio(audio, time) {
    if (!audio?.playing) {
      return;
    }
    if (time == 0) {
      audio.stop();
      return;
    }
    let volume = audio.gain.value;
    let targetVolume = 1e-6;
    let speed = volume / time * 50;
    audio.gain.value = volume;
    let fade = /* @__PURE__ */ __name(function() {
      volume -= speed;
      audio.gain.value = volume.toFixed(6);
      if (volume.toFixed(6) <= targetVolume) {
        audio.stop();
        clearInterval(audioFadeTimer);
      }
    }, "fade");
    let audioFadeTimer = setInterval(fade, 50);
    fade();
  }
};
_buildOptions = new WeakSet();
buildOptions_fn = /* @__PURE__ */ __name(async function() {
  this.options.showCloseButton = game.user?.isGM || this.options.allowPlayersToEnd;
  this.options.isVideo = Utils.isVideo(this.options.bgImg);
  this.options.zIndex = game.user?.isGM || this.options.showUI ? 1 : 5e3;
  if (this.options.isVideo) {
    this.options.sourceType = Utils.getVideoType(this.options.bgImg);
    this.options.delay = await Utils.getVideoDuration(this.options.bgImg);
  }
}, "#buildOptions");
_buildTransition = new WeakSet();
buildTransition_fn = /* @__PURE__ */ __name(async function() {
  if (this.element) {
    this.destroy(true);
  }
  const template = await renderTemplate(CONSTANTS.TEMPLATE.SCENE_TRANSITION, this.options);
  document.body.insertAdjacentHTML("beforeend", template);
  this.element = document.body.querySelector("#scene-transitions");
  __privateMethod(this, _addCloseEvent, addCloseEvent_fn).call(this);
  if (this.options.audio) {
    this.playAudio();
  }
  __privateMethod(this, _executeFadeIn, executeFadeIn_fn).call(this);
}, "#buildTransition");
_addCloseEvent = new WeakSet();
addCloseEvent_fn = /* @__PURE__ */ __name(function() {
  const closeButton = this.element.querySelector("#scene-transitions-close-button");
  if (!closeButton)
    return;
  const onClick = /* @__PURE__ */ __name(() => {
    if (game.user.isGM && this.options.gmEndAll) {
      let options = new SceneTransitionOptions({ action: "end" });
      options.fromSocket = true;
      if (!sceneTransitionsSocket) {
        registerSocket();
      }
      sceneTransitionsSocket.executeForEveryone("executeAction", options);
    }
    this.destroy();
  }, "onClick");
  $(closeButton).on("click", onClick);
}, "#addCloseEvent");
_executeFadeIn = new WeakSet();
executeFadeIn_fn = /* @__PURE__ */ __name(function() {
  const contentElement = this.element.querySelector(".scene-transitions-content");
  const activateScene = /* @__PURE__ */ __name(() => {
    if (!this.options.preview) {
      const scene = game.scenes?.get(this.options.sceneID);
      if (game.user?.isGM && !scene) {
        Logger.info(`The scene has not been activated as scene [${this.options.sceneID}] was not found`);
        return;
      }
      if (game.user?.isGM) {
        scene.activate();
      } else if (game.user?.isGM) {
        scene.view();
      }
    }
  }, "activateScene");
  $(contentElement).fadeIn();
  this.setDelay();
  $(this.element).fadeIn(this.options.fadeIn, activateScene);
}, "#executeFadeIn");
__name(_SceneTransition, "SceneTransition");
let SceneTransition = _SceneTransition;
async function executeActionArr(...inAttributes) {
  if (!Array.isArray(inAttributes)) {
    throw Logger.error("executeActionArr | inAttributes must be of type array");
  }
  let [options] = inAttributes;
  options = {
    ...options,
    fromSocket: true
  };
  this.executeAction(options);
}
__name(executeActionArr, "executeActionArr");
async function executeAction(options) {
  if (options?.action == "end") {
    await SceneTransition?.activeTransition?.destroy();
    return;
  } else {
    await SceneTransition?.activeTransition?.destroy(true);
  }
  const sceneTransition = new SceneTransition(false, options, void 0);
  sceneTransition.render();
}
__name(executeAction, "executeAction");
async function macroArr(...inAttributes) {
  if (!Array.isArray(inAttributes)) {
    throw Logger.error("macroArr | inAttributes must be of type array");
  }
  let [options, showMe] = inAttributes;
  options = {
    ...options,
    fromSocket: true
  };
  macro(options, showMe);
}
__name(macroArr, "macroArr");
async function macro(options, showMe) {
  if (options.fromSocket) {
    executeAction(options);
    return;
  }
  options.fromSocket = true;
  const userId = game.user.id;
  const users = options?.users;
  if (users?.length) {
    if (showMe && !users.includes(userId)) {
      users.push(userId);
    } else if (!showMe) {
      options.users = users.filter((name) => name !== userId);
    }
    sceneTransitionsSocket.executeForUsers("executeAction", options.users, options);
  } else {
    if (showMe) {
      sceneTransitionsSocket.executeForEveryone("executeAction", options);
    } else {
      sceneTransitionsSocket.executeForOthers("executeAction", options);
    }
  }
}
__name(macro, "macro");
const API = {
  executeActionArr,
  executeAction,
  macroArr,
  macro
};
function registerSettings() {
  game.settings.registerMenu(CONSTANTS.MODULE.ID, CONSTANTS.SETTING.DEFAULT_OPTIONS_MENU.KEY, {
    name: CONSTANTS.SETTING.DEFAULT_OPTIONS_MENU.NAME,
    hint: CONSTANTS.SETTING.DEFAULT_OPTIONS_MENU.HINT,
    label: CONSTANTS.SETTING.DEFAULT_OPTIONS_MENU.LABEL,
    icon: CONSTANTS.SETTING.DEFAULT_OPTIONS_MENU.ICON,
    type: DefaultOptionsForm,
    restricted: true
  });
  game.settings.register(CONSTANTS.MODULE.ID, CONSTANTS.SETTING.DEFAULT_OPTIONS, {
    scope: "world",
    config: false,
    restricted: true,
    type: Object,
    default: CONSTANTS.DEFAULT_SETTING
  });
  game.settings.register(CONSTANTS.MODULE.ID, CONSTANTS.SETTING.SHOW_JOURNAL_HEADER, {
    name: `${CONSTANTS.MODULE.ID}.setting.${CONSTANTS.SETTING.SHOW_JOURNAL_HEADER}.name`,
    hint: `${CONSTANTS.MODULE.ID}.setting.${CONSTANTS.SETTING.SHOW_JOURNAL_HEADER}.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(CONSTANTS.MODULE.ID, CONSTANTS.SETTING.DEBUG, {
    name: `${CONSTANTS.MODULE.ID}.setting.${CONSTANTS.SETTING.DEBUG}.name`,
    hint: `${CONSTANTS.MODULE.ID}.setting.${CONSTANTS.SETTING.DEBUG}.hint`,
    scope: "client",
    config: true,
    default: false,
    type: Boolean
  });
}
__name(registerSettings, "registerSettings");
Hooks.once("init", async () => {
  registerSettings();
  registerSocket();
});
Hooks.once("setup", () => {
  game.modules.get(CONSTANTS.MODULE.ID).api = API;
});
Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(CONSTANTS.MODULE.ID);
});
Hooks.on(
  "getSceneNavigationContext",
  (html, contextOptions) => addContextButtons("getSceneNavigationContext", contextOptions)
);
Hooks.on(
  "getSceneDirectoryEntryContext",
  (html, contextOptions) => addContextButtons("getSceneDirectoryEntryContext", contextOptions)
);
Hooks.on(
  "getJournalDirectoryEntryContext",
  (html, contextOptions) => addContextButtons("getJournalDirectoryEntryContext", contextOptions)
);
Hooks.on("renderJournalSheet", (journal) => addJournalButton(journal));
function addContextButtons(hookName, contextOptions) {
  const idField = {
    getJournalDirectoryEntryContext: "documentId",
    getSceneDirectoryEntryContext: "documentId",
    getSceneNavigationContext: "sceneId"
  };
  if (hookName === "getJournalDirectoryEntryContext") {
    contextOptions.push(SceneTransition.addPlayTransitionBtnJE(idField[hookName]));
    return;
  }
  contextOptions.push(SceneTransition.addPlayTransitionBtn(idField[hookName]));
  contextOptions.push(SceneTransition.addCreateTransitionBtn(idField[hookName]));
  contextOptions.push(SceneTransition.addEditTransitionBtn(idField[hookName]));
  contextOptions.push(SceneTransition.addDeleteTransitionBtn(idField[hookName]));
}
__name(addContextButtons, "addContextButtons");
function addJournalButton(journal) {
  const pageTypes = ["image", "text", "video"];
  if (!game.user?.isGM)
    return;
  const showJournalHeaderSetting = game.settings.get(CONSTANTS.MODULE.ID, CONSTANTS.SETTING.SHOW_JOURNAL_HEADER);
  if (!showJournalHeaderSetting)
    return;
  const header = journal.element[0].querySelector("header");
  if (!header)
    return;
  const windowTitle = header.querySelector("h4.window-title");
  if (!windowTitle)
    return;
  const existingLink = header.querySelector("a.play-transition");
  if (existingLink)
    existingLink.remove();
  const page = journal.getData().pages[0];
  if (!pageTypes.includes(page.type))
    return;
  const linkElement = document.createElement("a");
  linkElement.classList.add("play-transition");
  linkElement.innerHTML = `<i class="fas fa-play-circle"></i>Play as Transition`;
  windowTitle.after(linkElement);
  linkElement.addEventListener("click", () => onClickJournalButton(page));
}
__name(addJournalButton, "addJournalButton");
function onClickJournalButton(page) {
  let content = null;
  let bgImg = null;
  let bgLoop = null;
  switch (page.type) {
    case "image":
      bgImg = page.src;
      break;
    case "text":
      content = Utils.getTextFromPage(page);
      bgImg = Utils.getFirstImageFromPage(page);
      break;
    case "video":
      bgImg = page.src;
      bgLoop = page.video.loop;
      page.video.volume;
      break;
    default:
      return;
  }
  const options = new SceneTransitionOptions({ content, bgImg, bgLoop });
  sceneTransitionsSocket.executeForEveryone("executeAction", options);
}
__name(onClickJournalButton, "onClickJournalButton");
//# sourceMappingURL=module.js.map
