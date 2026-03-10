import CacheMixin from "./CacheMixin.mjs"

export default class MioloModel extends CacheMixin() {
  constructor(data) {
    super()
    this.data = data
  }

  _get(field, def) {
    if (this.data !== undefined) {
      if (this.data[field] !== undefined && this.data[field] !== null) {
        return this.data[field]
      }
    }
    return def
  }

  _set(field, val) {
    if (this.data === undefined) {
      this.data = {}
    }
    this.data[field] = val
  }

  get_extra_data() {
    const data = {}
    for (const [key, value] of Object.entries(this)) {
      if (value instanceof MioloModel) {
        data[key] = value.get_data()
      } else if (Array.isArray(value) && value.every((v) => v instanceof MioloModel)) {
        data[key] = value.map((v) => v.get_data())
      }
    }
    return data
  }

  getExtraData = this.get_extra_data

  get_data() {
    const extra = this.get_extra_data() || {}
    return {
      ...this.data,
      ...extra
    }
  }

  getData = this.get_data

  update(changes) {
    if (this.data === undefined) {
      this.data = {}
    }
    this.data = {
      ...this.data,
      ...changes
    }
  }
}
