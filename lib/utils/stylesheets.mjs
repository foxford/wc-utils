import { create } from 'jss/lib'
import StyleSheet from 'jss/lib/StyleSheet'
import preset from 'jss-preset-default'
import mergeDeepLeft from 'ramda/es/mergeDeepLeft'

const jss = create(preset())

jss.setup({ createGenerateClassName: () => rule => rule.key })

const createSheet = hashmap => jss.createStyleSheet(hashmap)

export const getStyleSheet = styles => styles instanceof StyleSheet ? styles : createSheet(styles)

export const merge = (primary, secondary) => {
  if (!primary) throw new TypeError('Primary stylesheet was not specified')

  return (secondary || []).reduce((acc, next) => mergeDeepLeft(acc, next || {}), primary)
}

export { jss }
