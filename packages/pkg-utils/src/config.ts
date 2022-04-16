export interface BabelConfig {
  presets: string[]
}

export const babelConfig: BabelConfig = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
}

export const babelTargets = {
  modern: {esmodules: true},
  node: {node: '12'},
  web: {browsers: ['> 0.5%, last 2 versions, Firefox ESR, not dead, not IE 11']},
}
