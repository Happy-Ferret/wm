import * as Window from './window'

const create = id => ({
  id,
  windows: [],
  currentWindow: null
})

// todo: maybe this should always take only ever a window
const addWindow = (workspace, window) => {
  if (!window) return
  if (typeof window == 'number') {
    window = Window.create(window)
  }
  workspace.windows.push(window)
  Window.show(window)
}

const removeWindow = (workspace, window) => {
  if (!window) return
  const {id} = window
  workspace.windows = workspace.windows.filter(window => window.id != id)
}

// todo: should root be a global?
// todo: should root be a *window*?
// todo: this root argument definitely doesn't belong here
const show = (workspace, root) => {
  workspace.currentWindow
    ? Window.focus(workspace.currentWindow)
    : global.X.SetInputFocus(root)
  workspace.windows.forEach(Window.show)
}

const hide = workspace => {
  workspace.windows.forEach(Window.hide)
}

const contains = (workspace, window) => {
  const {id} = window
  return workspace.windows.some(window => window.id == id)
}

export {create, addWindow, removeWindow, show, hide, contains}
