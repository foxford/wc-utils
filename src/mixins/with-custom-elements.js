import Debug from 'debug'

import pkg from '../../package.json'
import { registerCustomElement } from '../utils'

const debug = Debug(`${pkg.name}:with-custom-elements`)

const isMap = it => it instanceof Map

export const withCustomElements = () => (base, fn) => class extends base {
  constructor (props) {
    super(props)

    this.__childrenElements = new Map()
    this.__setup()
  }

  get _childrenElements () {
    return super._childrenElements || this.__childrenElements
  }

  __registerCustomElements (children) {
    if (!isMap(children)) throw new TypeError('Wrong children type')

    debug('Default customElements:', this._childrenElements)
    debug('External customElements:', children)

    this._childrenElements.forEach((element, key) => {
      registerCustomElement(key, children.has(key) ? children.get(key) : element)
    })
  }

  __setup () {
    this.__registerCustomElements(fn(this._childrenElements))
  }
}
