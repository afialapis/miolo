import CacheMixin from "./CacheMixin.mjs"
import MioloArray from "./MioloArray.mjs"

export default class MioloModel extends CacheMixin() {
  constructor(data) {
    super()
    this.data = data
    this.reset_cache()
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
      if (value instanceof MioloModel || value instanceof MioloArray) {
        data[key] = value.get_data()
      } else if (Array.isArray(value) && value.every((v) => v instanceof MioloModel)) {
        data[key] = value.map((v) => v.get_data())
      }
    }
    return data
  }

  getExtraData() {
    const data = {}
    for (const [key, value] of Object.entries(this)) {
      if (value instanceof MioloModel || value instanceof MioloArray) {
        data[key] = value.getData()
      } else if (Array.isArray(value) && value.every((v) => v instanceof MioloModel)) {
        data[key] = value.map((v) => v.getData())
      }
    }
    return data
  }

  get_data() {
    const extra = this.get_extra_data() || {}
    return {
      ...this.data,
      ...extra
    }
  }

  getData() {
    const extra = this.getExtraData() || {}
    return {
      ...this.data,
      ...extra
    }
  }

  update(changes) {
    if (this.data === undefined) {
      this.data = {}
    }
    this.data = {
      ...this.data,
      ...changes
    }
  }

  merge(model) {
    this.update(model.getData())
    for (const [key, value] of Object.entries(model)) {
      if (value instanceof MioloModel || value instanceof MioloArray) {
        this[key] = value
      } else if (Array.isArray(value) && value.every((v) => v instanceof MioloModel)) {
        this[key] = value
      }
    }
  }
}
