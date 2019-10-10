import { basename } from 'path'

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('.', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, module) => {
  if (module === './index.js') return

  const moduleName = basename(module, '.js')

  modules[moduleName] = {
    namespaced: true,
    ...modulesFiles(module)
  }

  return modules
}, {})

export default modules
