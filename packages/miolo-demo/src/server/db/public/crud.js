module.exports= {
  path: '/crud',
  routes: [
    {
      name: 'todos',
      /*
      auth: {
        require: true,
        action: 'redirect',
        redirect_path: '/'
      },*/
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
