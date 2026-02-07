export default [{
  prefix: '/api',
  auth: {
    require: true,
    action: 'redirect',
    redirect_url: '/login'
  },
  routes: [
    {
      name: 'todo',
      mode: 'r'
    },
  ]
}]
