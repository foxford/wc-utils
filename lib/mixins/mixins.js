import { toBinary } from '../utils'

export const withStyle = html => (base, ...styles) => class extends base {
  __renderStyles (...argv) { // eslint-disable-line class-methods-use-this
    return html`<style>${argv.join(' ')}</style>`
  }

  _render (props) {
    return html`
      ${this.__renderStyles(...styles)}
      ${super._render(props)}
    `
  }
}

export const withStyleAfter = html => (base, ...styles) => class extends base {
  __renderStyles (...argv) { // eslint-disable-line class-methods-use-this
    return html`<style>${argv.join(' ')}</style>`
  }

  _render (props) {
    return html`
      ${super._render(props)}
      ${this.__renderStyles(...styles)}
    `
  }
}

export const withStyleLink = html => (base, ...links) => class extends base {
  __renderStyleLink (...argv) { // eslint-disable-line class-methods-use-this
    return argv.map(link => html`<link href$="${link}" rel="stylesheet" type="text/css" />`)
  }

  _render (props) {
    return html`
      ${this.__renderStyleLink(...links)}
      ${super._render(props)}
    `
  }
}

export const withPermissions = () => (base, permissions = '00000') => class extends base {
  static get properties () {
    return {
      ...super.properties,
      permissions: String,
    }
  }

  _getPermissions () { return this.permissions || permissions }

  _isAllowed (policy) {
    return toBinary(policy) & toBinary(this._getPermissions()) // eslint-disable-line no-bitwise
  }
}
