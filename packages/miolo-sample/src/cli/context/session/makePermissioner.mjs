const _ADMIN_PERMISSIONS= [
  'prop_see_all',
  'prop_remove',
  'guest_remove'
]

const _DEV_PERMISSIONS= [
  'debug_data'
]

const _ALL_PERMISSIONS= [..._ADMIN_PERMISSIONS, ..._DEV_PERMISSIONS]



class Permissioner {
  constructor( permissions) {
    this.permissions= permissions
  }
  has_permission (code) {
    if (! code) {
      return true
    }
    return this.permissions
      .filter(p => p==code)
      .length >= 1
  }
  can_user_debug() { return this.has_permission('debug_data') }
  can_user_remove_prop() { return this.has_permission('prop_remove') }
  can_user_see_all() { return this.has_permission('prop_see_all') }
  can_user_remove_guest() { return this.has_permission('guest_remove') }
}

export default function makePermissioner(user) {
  // TODO User logic based on user
  return new Permissioner(_ALL_PERMISSIONS)
}

