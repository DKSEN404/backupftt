import { MODULE_ID, DEFAULT_SETTING, SETTINGS, TEMPLATES, EFFECTS_DOM, EFFECTS_CANVAS } from '../constants.mjs';

export default class DefaultOptionsForm extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: `${MODULE_ID}-default-options`,
      template: TEMPLATES.EDIT_FORM,
      title: game.i18n.localize(`${MODULE_ID}.settings.defaultOptions.title`),
      width: 500,
      height: 680,
      closeOnSubmit: true,
      resizable: true
    });
  }

  async getData() {
    const data = game.settings.get(MODULE_ID, SETTINGS.DEFAULT_OPTIONS) ?? DEFAULT_SETTING;
    return {
      ...data,
      isEdit: false,
      isPreset: false,
      presets: [],
      domEffects: EFFECTS_DOM,
      canvasEffects: EFFECTS_CANVAS,
      selectedDomEffects: data.domEffects || [],
      selectedCanvasEffects: data.canvasEffects || []
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.on('change', 'select[name="contentMode"]', (event) => {
      const form = event.currentTarget.closest('.nr-edit-form');
      if (form) form.dataset.contentMode = event.currentTarget.value;
    });

    html.on('click', '.tabs .item', (event) => {
      event.preventDefault();
      const item = event.currentTarget;
      const tabId = item.dataset.tab;
      const nav = item.closest('.tabs');
      const tabbed = nav?.nextElementSibling;
      if (!nav || !tabbed) return;

      nav.querySelectorAll('.item').forEach((i) => i.classList.remove('active'));
      tabbed.querySelectorAll('.tab').forEach((p) => p.classList.remove('active'));

      item.classList.add('active');
      const panel = tabbed.querySelector(`.tab[data-tab="${tabId}"]`);
      if (panel) panel.classList.add('active');
    });

    html.on('click', '[data-action="reset"]', async () => {
      await game.settings.set(MODULE_ID, SETTINGS.DEFAULT_OPTIONS, DEFAULT_SETTING);
      this.render(true);
    });
  }

  async _updateObject(event, formData) {
    const expanded = foundry.utils.expandObject(formData);
    expanded.domEffects = expanded.domEffects || [];
    expanded.canvasEffects = expanded.canvasEffects || [];
    await game.settings.set(MODULE_ID, SETTINGS.DEFAULT_OPTIONS, expanded);
  }
}
