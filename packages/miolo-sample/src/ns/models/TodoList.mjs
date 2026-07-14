import { MioloArray } from "miolo-model"
import Todo from "./Todo.mjs"

export default class TodoList extends MioloArray {
  /**
   * @param {Array<Todo> | Array<Object>} [items=[]]
   * @public
   */
  constructor(items = []) {
    super(Todo, items)
  }
}
