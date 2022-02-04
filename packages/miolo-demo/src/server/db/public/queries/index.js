const {q_todos_count_last_hour, q_todos_insert_fake} = require('./todos')

module.exports = [
  {
    path: '/crud/todos/last_hour',
    method: 'GET',
    callback: q_todos_count_last_hour
  },
  {
    path: '/crud/todos/fake',
    method: 'POST',
    callback: q_todos_insert_fake
  }
]

