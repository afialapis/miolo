export default {
  crud: [
    {
      prefix: '/api',
      bodyField: undefined,
      routes: ['test_01'],
    },

    {
      prefix: '/rebody',
      bodyField: 'rebody',
      routes: [{
        name: "test_01",
      }]
    }
  ],

  queries: [
    {
      prefix: '/noauth',
      routes: [{
        url: '/query',
        method: 'GET',
        callback: async (ctx) => {
          const conn= ctx.miolo.db.getConnection()
          const res= await conn.selectOne('select * from test_01 where name = $1', ['Peter'], {})            
          ctx.body= res
        }
      }]
    },
    {
      prefix: '/auth',
      routes: [
        {
          url: '/query',
          method: 'GET',
          callback: (_ctx) => {},
          authUser: {
            require: true,
            action: 'redirect',
            redirect_url: '/'
          }    
        }]
    }
  ]
}

