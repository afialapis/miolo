import { MioloModel } from "miolo-model"

export default class Todo extends MioloModel {
  get id() {
    return this._get("id", null)
  }
  get description() {
    return this._get("description", "")
  }
  get done() {
    return this._get("done", false)
  }
  toggle() {
    this._set("done", !this.done)
  }

  get createdAt() {
    return this._get("created_at")
  }
  get lastUpdateAt() {
    return this._get("last_update_at")
  }
  get createdBy() {
    return this._get("created_by")
  }
  get lastUpdateBy() {
    return this._get("last_update_by")
  }
}
