import BaseModel from "./base/BaseModel.mjs"

export default class Todo extends BaseModel {
  constructor(data) {
    super(data)
  }

  get id() { return this._get('id', null) }
  get description() { return this._get('description', '') }
  get done() { return this._get('done', false) }

  get createdAt() { return this._get('created_at') }
  get lastUpdateAt() { return this._get('last_update_at') }
  get createdBy() { return this._get('created_by') }
  get lastUpdateBy() { return this._get('last_update_by') }
}
