module.exports= {
  prefix: '/crud',
  authUser: {
    require: 'read-only',
    action: 'redirect',
    redirect_url: '/'
  },  
  routes: [
    {
      name: 'todos'
    } 
  ]
}
