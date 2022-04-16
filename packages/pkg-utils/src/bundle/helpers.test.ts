import {_resolveExports, _resolveExternal, _resolveInputs} from './helpers'

describe.skip('bundle/_resolveExternal', () => {
  it('should resolve list of external modules', () => {
    const external = _resolveExternal({
      pkg: {
        dependencies: {
          foo: '1',
          bar: '1',
        },

        devDependencies: {
          baz: '1',
          qux: '1',
        },

        peerDependencies: {
          react: '1',
        },
      },
    })

    expect(external).toEqual(['foo', 'bar', 'baz', 'qux'])
  })
})

describe('bundle/_resolveExports', () => {
  it('should resolve module inputs', () => {
    const exports = _resolveExports({
      source: './src/index.js',
      main: './lib/index.js',
      module: './lib/index.module.js',

      exports: {
        '.': {
          source: './src/index.ts',
          require: './lib/index.js',
          default: './lib/index.modern.js',
        },

        './utils': {
          source: './src/utils.ts',
          require: './lib/utils.js',
          module: './lib/utils.module.js',
          default: './lib/utils.modern.js',
        },
      },
    })

    expect(exports).toEqual([
      {
        path: '.',
        source: './src/index.ts',
        output: {
          commonjs: './lib/index.js',
          module: './lib/index.module.js',
          modern: './lib/index.modern.js',
        },
      },
      {
        path: './utils',
        source: './src/utils.ts',
        output: {
          commonjs: './lib/utils.js',
          module: './lib/utils.module.js',
          modern: './lib/utils.modern.js',
        },
      },
    ])
  })
})

describe('bundle/_resolveInputs', () => {
  it('...', () => {
    const inputs = _resolveInputs({
      source: './src/index.js',
      main: './lib/index.js',
      module: './lib/index.module.js',

      exports: {
        '.': {
          source: './src/index.ts',
          require: './lib/index.js',
          default: './lib/index.modern.js',
        },

        './utils': {
          source: './src/utils.ts',
          require: './lib/utils.js',
          module: './lib/utils.module.js',
          default: './lib/utils.modern.js',
        },
      },
    })

    expect(inputs).toEqual({
      commonjs: {
        index: './src/index.ts',
        utils: './src/utils.ts',
      },
      module: {
        'index.module': './src/index.ts',
        'utils.module': './src/utils.ts',
      },
      modern: {
        'index.modern': './src/index.ts',
        'utils.modern': './src/utils.ts',
      },
    })
  })
})
