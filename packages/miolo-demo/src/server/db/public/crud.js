module.exports= {
  path: '/crud',
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
