export default [
  // for `app` tests
  {
    prefix: "/crud",
    auth: {
      require: "read-only",
      action: "redirect",
      redirect_url: "/"
    },
    routes: [
      {
        name: "todos"
      }
    ]
  },
  // for `restart` tests
  {
    prefix: "/api",
    bodyField: undefined,
    routes: ["test_01"]
  },
  {
    prefix: "/rebody",
    bodyField: "rebody",
    routes: [
      {
        name: "test_01"
      }
    ]
  }
]
