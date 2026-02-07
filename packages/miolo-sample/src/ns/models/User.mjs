import BaseModel from "./base/BaseModel.mjs"

export default class User extends BaseModel {
  constructor(data) {
    super(data)
  }

  get id() { return this._get('id') }
  get username() { return this._get('username') }
  get password() { return this._get('password') }
  get name() { return this._get('name') }
  get email() { return this._get('email') }
  get active() { return this._get('active') }
  get admin() { return this._get('admin') }
  get lastLoginDate() { return this._get('last_login_date') }
  get lastLoginIp() { return this._get('last_login_ip') }
  get loginCount() { return this._get('login_count') }
  get lastConnAt() { return this._get('last_conn_at') }
  get createdAt() { return this._get('created_at') }
  get lastUpdateAt() { return this._get('last_update_at') }
}



