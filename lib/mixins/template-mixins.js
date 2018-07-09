import { html } from '@polymer/lit-element'

export const withStyle = (base, ...styles) => props => html`
  <style>${styles.join(' ')}</style>
  ${base(props)}
`
