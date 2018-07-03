import { html } from '@polymer/lit-element'

export const styledElementMixin = (base, stylesheet) => class extends base {
  _render (props) {
    return html`
      <style>${stylesheet}</style>
      ${super._render(props)}
    `
  }
}
