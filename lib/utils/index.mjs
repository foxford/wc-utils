import reverse from 'ramda/es/reverse'

import { merge, getStyleSheet } from './stylesheets.mjs'

export const stringifyStyle = style => getStyleSheet(style).toLocaleString()

export const mergeLeft = (stylesheet, ...sheets) => stringifyStyle(merge(stylesheet, sheets))

export const mergeRight = (stylesheet, ...sheets) => stringifyStyle(merge(
  sheets[sheets.length - 1],
  [...reverse(sheets), stylesheet],
))
