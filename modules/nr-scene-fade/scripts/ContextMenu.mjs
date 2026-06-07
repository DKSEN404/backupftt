import { MODULE_ID, HOOKS_CONTEXT } from './constants.mjs';
import * as Socket from './SocketManager.mjs';

export function registerHooks() {
  Hooks.on('getSceneNavigationContext', (html, contextOptions) => {
    addSceneButtons('getSceneNavigationContext', contextOptions);
  });

  Hooks.on('getSceneDirectoryEntryContext', (html, contextOptions) => {
    addSceneButtons('getSceneDirectoryEntryContext', contextOptions);
  });

  Hooks.on('getJournalDirectoryEntryContext', (html, contextOptions) => {
    addJournalButtons(contextOptions);
  });

  Hooks.on('renderJournalSheet', (journal) => {
    addJournalHeaderButton(journal);
  });

  Hooks.on('renderSceneDirectory', (app, html) => {
    injectGalleryButton(html);
  });
  Hooks.on('renderSidebarTab', (app, html) => {
    if (app.tabName !== 'scenes') return;
    injectGalleryButton(html);
  });
}

function addSceneButtons(hookName, contextOptions) {
  const idField = HOOKS_CONTEXT[hookName];

  contextOptions.push({
    name: game.i18n.localize(`${MODULE_ID}.context.stopTransition`),
    icon: '<i class="fas fa-stop-circle"></i>',
    condition: () => {
      if (!game.user?.isGM) return false;
      return game.modules.get(MODULE_ID)?.api?.isActive?.() ?? false;
    },
    callback: () => {
      Socket.executeForEveryone({ action: 'stop' });
    }
  });

  contextOptions.push({
    name: game.i18n.localize(`${MODULE_ID}.context.playTransition`),
    icon: '<i class="fas fa-play-circle"></i>',
    condition: (li) => {
      if (!game.user?.isGM) return false;
      const scene = game.scenes?.get(li.data(idField));
      return scene?.getFlag(MODULE_ID, 'transition') != null;
    },
    callback: (li) => {
      const scene = game.scenes?.get(li.data(idField));
      const transition = scene.getFlag(MODULE_ID, 'transition');
      if (!transition) return;
      const options = { ...transition.options, fromSocket: true, sceneId: scene.id };
      Socket.executeForEveryone(options);
    }
  });

  contextOptions.push({
    name: game.i18n.localize(`${MODULE_ID}.context.createTransition`),
    icon: '<i class="fas fa-plus-square"></i>',
    condition: (li) => {
      if (!game.user?.isGM) return false;
      const scene = game.scenes?.get(li.data(idField));
      return !scene?.getFlag(MODULE_ID, 'transition');
    },
    callback: async (li) => {
      const sceneID = li.data(idField);
      const { default: EditForm } = await import('./forms/EditTransitionForm.mjs');
      new EditForm(sceneID, { sceneID }).render(true);
    }
  });

  contextOptions.push({
    name: game.i18n.localize(`${MODULE_ID}.context.editTransition`),
    icon: '<i class="fas fa-edit"></i>',
    condition: (li) => {
      if (!game.user?.isGM) return false;
      const scene = game.scenes?.get(li.data(idField));
      return scene?.getFlag(MODULE_ID, 'transition') != null;
    },
    callback: async (li) => {
      const scene = game.scenes?.get(li.data(idField));
      const transition = scene.getFlag(MODULE_ID, 'transition');
      if (!transition) return;
      const { default: EditForm } = await import('./forms/EditTransitionForm.mjs');
      new EditForm(scene.id, transition.options).render(true);
    }
  });

  contextOptions.push({
    name: game.i18n.localize(`${MODULE_ID}.context.deleteTransition`),
    icon: '<i class="fas fa-trash-alt"></i>',
    condition: (li) => {
      if (!game.user?.isGM) return false;
      const scene = game.scenes?.get(li.data(idField));
      return scene?.getFlag(MODULE_ID, 'transition') != null;
    },
    callback: (li) => {
      const scene = game.scenes?.get(li.data(idField));
      scene.unsetFlag(MODULE_ID, 'transition');
    }
  });
}

function addJournalButtons(contextOptions) {
  contextOptions.push({
    name: game.i18n.localize(`${MODULE_ID}.context.playFromJournal`),
    icon: '<i class="fas fa-play-circle"></i>',
    condition: () => game.user?.isGM,
    callback: (li) => {
      const id = li.data('documentId');
      const journal = game.journal?.get(id);
      if (!journal) return;

      const content = retrieveTextFromJournal(journal);
      const img = retrieveImageFromJournal(journal);

      const options = {
        content,
        bgImg: img,
        fromSocket: true
      };
      Socket.executeForEveryone(options);
    }
  });
}

function addJournalHeaderButton(journal) {
  const pageTypes = ['image', 'text', 'video'];
  if (!game.user?.isGM) return;

  const showSetting = game.settings.get(MODULE_ID, 'show-journal-header-transition');
  if (!showSetting) return;

  const header = journal.element[0].querySelector('header');
  if (!header) return;

  const windowTitle = header.querySelector('h4.window-title');
  if (!windowTitle) return;

  const existing = header.querySelector('a.nr-play-transition');
  if (existing) existing.remove();

  const pages = journal.getData().pages;
  if (!pages || !pages.length) return;
  const page = pages[0];
  if (!pageTypes.includes(page.type)) return;

  const link = document.createElement('a');
  link.classList.add('nr-play-transition');
  link.innerHTML = `<i class="fas fa-play-circle"></i> ${game.i18n.localize(`${MODULE_ID}.context.playFromJournal`)}`;
  link.style.marginLeft = '8px';
  link.style.cursor = 'pointer';
  link.style.fontSize = '0.8em';

  link.addEventListener('click', () => onClickJournalButton(page));
  windowTitle.after(link);
}

function onClickJournalButton(page) {
  let content = null;
  let bgImg = null;
  let bgLoop = null;

  switch (page.type) {
    case 'image':
      bgImg = page.src;
      break;
    case 'text':
      content = getTextFromPage(page);
      bgImg = getFirstImageFromPage(page);
      break;
    case 'video':
      bgImg = page.src;
      bgLoop = page.video?.loop;
      break;
    default:
      return;
  }

  const options = { content, bgImg, bgLoop, fromSocket: true };
  Socket.executeForEveryone(options);
}

function getTextFromPage(page) {
  const content = page?.text?.content;
  if (!content) return null;

  const textTags = ['BLOCKQUOTE', 'CODE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P'];
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const tags = Array.from(doc.body.children);
  const filtered = tags.filter((tag) => textTags.includes(tag.tagName));
  return filtered.map((tag) => tag.outerHTML).join('') || null;
}

function getFirstImageFromPage(page) {
  const content = page?.text?.content;
  if (!content) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const img = doc.querySelector('img');
  return img?.getAttribute('src') || null;
}

function retrieveTextFromJournal(journal) {
  if (!journal?.pages?.size) return null;

  const pages = journal.pages.contents.sort((a, b) => a.sort - b.sort);
  for (const page of pages) {
    if (page.type === 'text' && page.text?.content) {
      return getTextFromPage(page);
    }
  }
  return null;
}

function retrieveImageFromJournal(journal) {
  if (!journal?.pages?.size) return null;

  const pages = journal.pages.contents.sort((a, b) => a.sort - b.sort);
  for (const page of pages) {
    if (page.type === 'image' && page.src) {
      return page.src;
    }
    if (page.src) return page.src;
  }
  return null;
}

/* ─── Gallery Dashboard Button ─── */

function injectGalleryButton(html) {
  const header = html?.[0]?.querySelector('.directory-header');
  if (!header) return;
  if (header.querySelector('.nr-gallery-button')) return;

  const btn = document.createElement('a');
  btn.className = 'nr-gallery-button';
  btn.innerHTML = `<i class="fas fa-th"></i> ${game.i18n.localize(`${MODULE_ID}.gallery.gallery`)}`;
  btn.style.cssText = 'cursor:pointer;margin-left:auto;padding:0 6px;flex:0 0 auto;';

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const { default: GalleryForm } = await import('./forms/GalleryForm.mjs');
    const form = new GalleryForm();
    form.render(true);
  });

  header.appendChild(btn);
}
