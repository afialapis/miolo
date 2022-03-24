const {q_todos_count_last_hour, q_todos_insert_fake} = require('./todos')

module.exports = {
  options: {
    /*
    auth: {
      require: 'read-only',
      action: 'redirect',
      redirect_path: '/'
    },
    */    
  },
  routes: [
    {
      path: '/crud/todos/last_hour',
      method: 'GET',
      callback: q_todos_count_last_hour
    },
    {
      path: '/crud/todos/fake',
      method: 'POST',
      callback: q_todos_insert_fake,
      auth: {
        require: true,
        action: 'redirect',
        redirect_path: '/'
      },         
    }
  ]
}


