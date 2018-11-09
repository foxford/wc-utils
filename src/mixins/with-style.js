import { html as lithtml } from '@polymer/lit-element'

export const withStyle = (html) => {
  html = html || lithtml // eslint-disable-line no-param-reassign

  return (base, ...styles) => class extends base {
    __renderStyles (...argv) { // eslint-disable-line class-methods-use-this
      return (html`<style>${argv.join(' ')}</style>`)
    }

    _render (props) {
      return (html`
        ${this.__renderStyles(...styles)}
        ${super._render(props)}
      `)
    }
  }
}
