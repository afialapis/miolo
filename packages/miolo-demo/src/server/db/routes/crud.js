module.exports= {
  prefix: '/crud',
  routes: [
    {
      name: 'todos',
      authUser: {
        require: 'read-only',
        action: 'redirect',
        redirect_url: '/'
      },
      options: {
        useDates: false,
        //checkBeforeDelete: ["edition.agent_id"],
        //customHooks: {
        //  beforeInsert: beforeInsertTest,
        //  beforeUpdate: beforeUpdateTest
        //}
      } 
    } 
  ]
}
