import { toBinary } from '../utils'

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
