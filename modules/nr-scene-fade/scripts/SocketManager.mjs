let socket = null;

export function registerSocket() {
  if (socket) return socket;

  socket = socketlib.registerModule('nr-scene-fade');
  socket.register('executeAction', executeActionArr);
  socket.register('macro', macroArr);

  const module = game.modules.get('nr-scene-fade');
  if (module) module.socket = socket;

  return socket;
}

export function getSocket() {
  return socket;
}

function executeActionArr(...inAttributes) {
  if (!Array.isArray(inAttributes)) {
    throw new Error('executeActionArr: inAttributes must be an array');
  }
  const [options] = inAttributes;
  executeAction(options);
}

export async function executeAction(options) {
  const api = game.modules.get('nr-scene-fade')?.api;
  if (!api) return;

  if (options?.action === 'stop') {
    await api.stop(true);
    return;
  }

  await api.stop(true);
  await api.play({ ...options, presetId: options?.presetId || 'amber-terminal' });
}

function macroArr(...inAttributes) {
  if (!Array.isArray(inAttributes)) {
    throw new Error('macroArr: inAttributes must be an array');
  }
  const [options, showMe] = inAttributes;
  macro(options, showMe);
}

export async function macro(options, showMe = true) {
  options.fromSocket = true;

  if (!socket) registerSocket();

  const userId = game.user.id;
  const users = options?.users;

  if (users?.length) {
    if (showMe && !users.includes(userId)) {
      users.push(userId);
    } else if (!showMe) {
      options.users = users.filter((id) => id !== userId);
    }
    socket.executeForUsers('executeAction', options.users || users, options);
  } else {
    if (showMe) {
      socket.executeForEveryone('executeAction', options);
    } else {
      socket.executeForOthers('executeAction', options);
    }
  }
}

export async function executeForEveryone(options) {
  if (!socket) registerSocket();
  return socket.executeForEveryone('executeAction', options);
}

export async function executeForUsers(users, options) {
  if (!socket) registerSocket();
  return socket.executeForUsers('executeAction', users, options);
}
