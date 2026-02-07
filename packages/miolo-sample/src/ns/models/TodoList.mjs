import BaseArray from './base/BaseArray.mjs'
import Todo from './Todo.mjs'

export default class TodoList extends BaseArray {
  constructor(items= []) {
    super(Todo, items)
  }
}