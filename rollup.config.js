import { terser as uglify } from 'rollup-plugin-terser'

const entry = process.env.ENTRY || 'index.js'
const ns = process.env.NS || 'WCMixins'

const uglifyOptions = {
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    warnings: false,
  },
}

const shouldUglify = (options = uglifyOptions, minifier) => process.env.NODE_ENV === 'production' ? uglify(options, minifier) : []

const es = it => ({
  input: `src/${it}`,
  output: {
    exports: 'named',
    format: 'umd',
    name: ns,
  },
  plugins: shouldUglify(uglifyOptions),
})

export default es(entry)
