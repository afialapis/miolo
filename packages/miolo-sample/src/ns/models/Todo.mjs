import { MioloModel } from "miolo-model"

export default class Todo extends MioloModel {
  /**
   * Get the id of the todo.
   * @returns {number|null} The id of the todo.
   * @public
   */
  get id() {
    return this.get_value("id", null)
  }

  /**
   * Get the description of the todo.
   * @returns {string} The description of the todo.
   * @public
   */
  get description() {
    return this.get_value("description", "")
  }

  /**
   * Get the done status of the todo.
   * @returns {boolean} The done status of the todo.
   * @public
   */
  get done() {
    return this.get_value("done", false)
  }
  /**
   * Toggle the done status of the todo.
   * @public
   */
  toggle() {
    this.set_value("done", !this.done)
  }

  /**
   * Get the creation date of the todo.
   * @returns {number|undefined} The creation date of the todo.
   * @public
   */
  get createdAt() {
    return this.get_value("created_at")
  }

  /**
   * Get the last update date of the todo.
   * @returns {number|undefined} The last update date of the todo.
   * @public
   */  
  get lastUpdateAt() {
    return this.get_value("last_update_at")
  }

  /**
   * Get the user who created the todo.
   * @returns {number|undefined} The user who created the todo.
   * @public
   */
  get createdBy() {
    return this.get_value("created_by")
  }

  /**
   * Get the user who last updated the todo.
   * @returns {number|undefined} The user who last updated the todo.
   * @public
   */  
  get lastUpdateBy() {
    return this.get_value("last_update_by")
  }
}
