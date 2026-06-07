class NovaRedTheme {
  static ID = 'nova-red-theme';

  static THEMES = {
    'nova-red': 'nova-red-theme.theme.nova-red',
    'bluewire': 'nova-red-theme.theme.bluewire',
    'afterlife': 'nova-red-theme.theme.afterlife',
    'afterlife2': 'nova-red-theme.theme.afterlife2',
  };

  static log(...args) {
    const shouldLog =
      game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);
    if (shouldLog) {
      console.log(this.ID, '|', ...args);
    }
  }

  static registerThemes() {
    const module = game.modules.get(this.ID);
    if (!module) {
      this.log(true, 'ERROR: Module not found in game.modules');
      return;
    }
    module.cprcThemes = {};
    for (const [key, label] of Object.entries(this.THEMES)) {
      module.cprcThemes[key] = label;
    }
    this.log(false, 'Registered themes:', Object.keys(module.cprcThemes));
  }
}

Hooks.once('init', () => {
  NovaRedTheme.log(false, 'Initializing Nova Red Theme...');
  NovaRedTheme.registerThemes();
});
