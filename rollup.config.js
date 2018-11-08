import { terser as uglify } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'

import { directories } from './package.json'

const entry = process.env.ENTRY || 'index.js'
const ns = process.env.NS || 'WCMixins'

const uglifyOptions = {
  compress: {
    drop_console: true,
    pure_getters: true,
    unsafe_comps: true,
    warnings: false,
  },
}

const shouldUglify = (options = uglifyOptions, minifier) => process.env.NODE_ENV === 'production'
  ? uglify(options, minifier)
  : []

const es = it => ({
  input: `${directories.lib}/${it}`,
  output: {
    exports: 'named',
    format: 'umd',
    name: ns,
  },
  external: ['@polymer/lit-element'],
  plugins: [babel({ exclude: ['node_modules/**', '*.json'] }), json()].concat(shouldUglify()),
})

export default es(entry)
