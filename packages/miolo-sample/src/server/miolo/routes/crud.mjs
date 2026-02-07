export default [{
  prefix: '/crud',
  auth: {
    require: true,
    action: 'redirect',
    redirect_url: '/login'
  },
  routes: [
    {
      name: 'todo',
      mode: 'rw'
    },
  ]
}]
