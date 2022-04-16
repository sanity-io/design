import path from 'path'

export function _resolveExternal(opts: {pkg: Record<string, any>}): string[] {
  const {pkg} = opts
  const external: string[] = []

  for (const [name] of Object.entries(pkg.dependencies || {})) {
    external.push(name)
  }

  for (const [name] of Object.entries(pkg.devDependencies || {})) {
    external.push(name)
  }

  return external
}

interface ExportInfo {
  path: string
  source: string
  output: {
    commonjs: string
    module?: string
    modern?: string
  }
}

export function _resolveExports(pkg: Record<string, any>): ExportInfo[] {
  const exports: ExportInfo[] = []

  const mainExport: ExportInfo = {
    path: '.',
    source: pkg.source,
    output: {
      commonjs: pkg.main,
      module: pkg.module,
    },
  }

  exports.push(mainExport)

  for (const [exportPath, _exportParams] of Object.entries(pkg.exports || {})) {
    const exportParams = _exportParams as any

    if (exportPath === '.') {
      mainExport.source = exportParams.source
      mainExport.output.commonjs = exportParams.require
      mainExport.output.modern = exportParams.default
    } else {
      exports.push({
        path: exportPath,
        source: exportParams.source,
        output: {
          commonjs: exportParams.require,
          module: exportParams.module,
          modern: exportParams.default,
        },
      })
    }
  }

  return exports
}

export interface Inputs {
  commonjs: Record<string, string>
  module: Record<string, string>
  modern: Record<string, string>
}

export function _resolveInputs(pkg: Record<string, any>): Inputs {
  const exports = _resolveExports(pkg)

  const inputs: Inputs = {
    commonjs: {},
    module: {},
    modern: {},
  }

  // commonjs
  for (const info of exports) {
    const name = path.basename(info.output.commonjs, '.js')

    inputs.commonjs[name] = info.source
  }

  // module
  for (const info of exports) {
    if (info.output.module) {
      const name = path.basename(info.output.module, '.js')

      inputs.module[name] = info.source
    }
  }

  // modern
  for (const info of exports) {
    if (info.output.modern) {
      const name = path.basename(info.output.modern, '.js')

      inputs.modern[name] = info.source
    }
  }

  return inputs
}
