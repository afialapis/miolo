module.exports= {
  prefix: '/crud',
  authUser: {
    require: 'read-only',
    action: 'redirect',
    redirect_url: '/'
  },  
  routes: [
    {
      name: 'todos',
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
