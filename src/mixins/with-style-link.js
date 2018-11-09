import { html as lithtml } from '@polymer/lit-element'

export const withStyleLink = (html) => {
  html = html || lithtml // eslint-disable-line no-param-reassign

  return (base, ...links) => class extends base {
    __renderStyleLink (...argv) { // eslint-disable-line class-methods-use-this
      return argv.map(link => (html`<link href$='${link}' rel='stylesheet' type='text/css' />`))
    }

    _render (props) {
      return (html`
        ${this.__renderStyleLink(...links)}
        ${super._render(props)}
      `)
    }
  }
}
