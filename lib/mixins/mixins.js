import { html } from '@polymer/lit-element'

export const withStyle = (base, ...styles) => class extends base {
  _renderStyles (...argv) { // eslint-disable-line class-methods-use-this
    return html`<style>${argv.join(' ')}</style>`
  }

  _render (props) {
    return html`
      ${this._renderStyles(...styles)}
      ${super._render(props)}
    `
  }
}

export const withStyleAfter = (base, ...styles) => class extends base {
  _renderStyles (...argv) { // eslint-disable-line class-methods-use-this
    return html`<style>${argv.join(' ')}</style>`
  }

  _render (props) {
    return html`
      ${super._render(props)}
      ${this._renderStyles(...styles)}
    `
  }
}
