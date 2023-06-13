export default [{
  prefix: '/crud',
  auth: {
    require: 'read-only',
    action: 'redirect',
    redirect_url: '/'
  },  
  routes: [
    {
      name: 'todos'
    } 
  ]
}]
