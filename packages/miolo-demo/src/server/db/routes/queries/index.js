const {q_todos_count_last_hour, q_todos_insert_fake} = require('./todos')

module.exports = {
  prefix: '/crud',
  routes: [
    {
      url: '/todos/last_hour',
      method: 'GET',
      callback: q_todos_count_last_hour
    },
    {
      url: '/todos/fake',
      method: 'POST',
      callback: q_todos_insert_fake,
      authUser: {
        require: true,
        action: 'redirect',
        redirect_url: '/'
      },         
    }
  ]
}


