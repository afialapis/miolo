import test_app_guest from './units/guest.mjs'
import test_app_basic from './units/basic.mjs'
import test_app_passport from './units/passport.mjs'

export const test_app = () => {
  test_app_guest()
  test_app_basic()
  test_app_passport()
}
