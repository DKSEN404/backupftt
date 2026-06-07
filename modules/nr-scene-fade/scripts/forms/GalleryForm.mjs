import { MODULE_ID } from '../constants.mjs';
import * as Socket from '../SocketManager.mjs';

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderSceneGrid(scenes) {
  let html = '';
  for (const scene of scenes) {
    const activeClass = scene.active ? ' nr-gallery-cell--active' : '';
    const editIcon = scene.hasTransition ? 'edit' : 'plus';
    html += `<div class="nr-gallery-cell${activeClass}">
      <div class="nr-gallery-cell-img">`;
    if (scene.img) {
      html += `<img src="${esc(scene.img)}" alt="${esc(scene.name)}" loading="lazy">`;
    } else {
      html += `<div class="nr-gallery-cell-placeholder"><i class="fas fa-image"></i></div>`;
    }
    html += `</div>
      <div class="nr-gallery-cell-label">${esc(scene.name)}</div>
      <div class="nr-gallery-cell-actions">
        <button data-action="activate" data-scene-id="${scene.id}" title="${game.i18n.localize('nr-scene-fade.gallery.activate')}">
          <i class="fas fa-eye"></i>
        </button>
        <button data-action="preload" data-scene-id="${scene.id}" title="${game.i18n.localize('nr-scene-fade.gallery.preload')}">
          <i class="fas fa-download"></i>
        </button>`;
    if (scene.hasTransition) {
      html += `<button data-action="play" data-scene-id="${scene.id}" title="${game.i18n.localize('nr-scene-fade.gallery.play')}">
          <i class="fas fa-play"></i>
        </button>`;
    }
    html += `<button data-action="edit" data-scene-id="${scene.id}" title="${game.i18n.localize('nr-scene-fade.gallery.edit')}">
          <i class="fas fa-${editIcon}"></i>
        </button>
      </div>
    </div>`;
  }
  return html;
}

function renderFolderTree(nodes) {
  let html = '';
  for (const node of nodes) {
    html += `<div class="nr-gallery-folder">
      <h3 class="nr-gallery-folder-title">
        <i class="fas fa-chevron-down nr-folder-chevron"></i>
        <i class="fas fa-folder"></i> ${esc(node.name)}
      </h3>
      <div class="nr-gallery-grid">
        ${renderSceneGrid(node.scenes)}
      </div>`;
    if (node.children && node.children.length) {
      html += `<div class="nr-gallery-subfolders">
        ${renderFolderTree(node.children)}
      </div>`;
    }
    html += `</div>`;
  }
  return html;
}

export default class GalleryForm extends FormApplication {
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      id: 'nr-gallery-form',
      title: game.i18n.localize(`${MODULE_ID}.gallery.gallery`),
      template: `modules/${MODULE_ID}/templates/gallery-form.hbs`,
      width: 400,
      height: 750,
      resizable: false,
      classes: ['nr-gallery-form']
    };
  }

  getData() {
    const isGM = game.user?.isGM || false;

    const scenesList = game.scenes?.map(scene => {
      const hasTransition = !!scene.getFlag(MODULE_ID, 'transition');
      return {
        id: scene.id,
        name: scene.name,
        img: scene.thumb || scene.img || '',
        active: scene.id === game.scenes.active?.id,
        hasTransition,
        isGM
      };
    }) || [];

    const scenesByFolder = {};
    const rootScenes = [];
    for (const s of scenesList) {
      const scene = game.scenes.get(s.id);
      const folderId = scene?.folder?.id;
      if (folderId) {
        if (!scenesByFolder[folderId]) scenesByFolder[folderId] = [];
        scenesByFolder[folderId].push(s);
      } else {
        rootScenes.push(s);
      }
    }

    for (const folderId of Object.keys(scenesByFolder)) {
      scenesByFolder[folderId].sort((a, b) => a.name.localeCompare(b.name));
    }
    rootScenes.sort((a, b) => a.name.localeCompare(b.name));

    const allFolders = (game.folders || []).filter(f => f.type === 'Scene');

    // Debug: log folder hierarchy to verify parent-child relationships
    console.log('NR Scene Fade | Gallery | Folder hierarchy:',
      allFolders.map(f => ({ id: f.id, name: f.name, folder: f.folder?.id || null, sort: f.sort })));

    const rootFolders = allFolders.filter(f => !f.folder).sort((a, b) => a.sort - b.sort);

    function buildFolderTree(parentFolders) {
      const result = [];
      for (const folder of parentFolders) {
        const childFolders = allFolders
          .filter(f => f.folder?.id === folder.id)
          .sort((a, b) => a.sort - b.sort);
        result.push({
          id: folder.id,
          name: folder.name,
          scenes: scenesByFolder[folder.id] || [],
          children: buildFolderTree(childFolders)
        });
      }
      return result;
    }

    const folders = buildFolderTree(rootFolders);

    folders.push({
      id: '__root__',
      name: game.i18n.localize('SCENES'),
      scenes: rootScenes,
      children: []
    });

    const folderTreeHTML = renderFolderTree(folders);
    console.log('NR Scene Fade | Gallery | folderTreeHTML:', folderTreeHTML);

    return {
      folderTreeHTML,
      hasSocket: !!game.modules.get('socketlib')?.active
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.on('click', '.nr-gallery-folder-title', (e) => {
      const folder = $(e.currentTarget).closest('.nr-gallery-folder');
      folder.toggleClass('nr-folder--collapsed');
      $(e.currentTarget).find('.nr-folder-chevron').toggleClass('fa-chevron-down fa-chevron-right');
    });
    html.on('click', '[data-action="collapse-all"]', (e) => {
      html.find('.nr-gallery-folder').each((i, el) => {
        const $folder = $(el);
        if (!$folder.hasClass('nr-folder--collapsed')) {
          $folder.addClass('nr-folder--collapsed');
          $folder.children('.nr-gallery-folder-title').find('.nr-folder-chevron')
            .removeClass('fa-chevron-down').addClass('fa-chevron-right');
        }
      });
    });
    html.on('click', '[data-action]', async (e) => {
      const btn = e.currentTarget;
      const sceneId = btn.dataset.sceneId;
      const action = btn.dataset.action;
      const scene = game.scenes?.get(sceneId);
      if (!scene) return;

      switch (action) {
        case 'activate':
          scene.view();
          break;
        case 'preload':
          game.scenes.preload(scene.id);
          break;
        case 'play': {
          const transition = scene.getFlag(MODULE_ID, 'transition');
          if (!transition) return;
          const options = { ...transition.options, fromSocket: true, sceneId: scene.id };
          Socket.executeForEveryone(options);
          break;
        }
        case 'edit': {
          const { default: EditForm } = await import('./EditTransitionForm.mjs');
          const t = scene.getFlag(MODULE_ID, 'transition');
          new EditForm(scene.id, t ? t.options : { sceneId: scene.id }).render(true);
          break;
        }
      }
    });
  }
}
