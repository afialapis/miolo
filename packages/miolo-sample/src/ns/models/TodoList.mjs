import { MioloArray } from "miolo-model"
import Todo from "./Todo.mjs"

export default class TodoList extends MioloArray {
  constructor(items = []) {
    super(Todo, items)
  }
}
