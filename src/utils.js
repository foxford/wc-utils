import compose from 'ramda/es/compose'
import partialRight from 'ramda/es/partialRight'

// it: Array<mixed>
const apply = it => it.map(([mixin, ...v]) => partialRight(mixin, v))

/**
 * Apply multiple mixins to the CustomElement
 *
 * var applyTo = combineMixins([
 *   [mixin: Mixin<mixed>, data]
 * ])
 * customElements.define('custom-element', applyTo(customElement))
 *
 * @param {Array<Array<[Mixin<mixed>, mixed]>>} it
 */
export const combineMixins = it => compose(...apply(it))

export const bindMixins = context => map => Object.keys(map).reduce((acc, key) => {
  acc[key] = acc[key].length >= 1 ? map[key](context) : map[key]()

  return acc
}, Object.assign({}, map))

export const toBinary = policy => parseInt(policy, 2)

export const registerCustomElement = (key, value) => {
  if (!key || !value) throw new Error('CustomElement is not specified')
  !window.customElements.get(key) && window.customElements.define(key, value)
}
