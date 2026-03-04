import {
  todos_clean,
  todos_count_last_hour,
  todos_insert_fake,
  todos_make_table
} from "../db/todos.mjs"
import { users_make_table } from "../db/users.mjs"

export default [
  // for `app` tests
  {
    prefix: "/queries",
    routes: [
      {
        url: "/users/make_table",
        method: "POST",
        callback: users_make_table
      },
      {
        url: "/todos/make_table",
        method: "POST",
        callback: todos_make_table
      },
      {
        url: "/todos/last_hour",
        method: "GET",
        callback: todos_count_last_hour
      },
      {
        url: "/todos/fake",
        method: "POST",
        callback: todos_insert_fake,
        auth: {
          require: true,
          action: "redirect",
          redirect_url: "/"
        }
      },
      {
        url: "/todos/clean",
        method: "POST",
        callback: todos_clean,
        auth: {
          require: true,
          action: "redirect",
          redirect_url: "/"
        }
      }
    ]
  },
  // for `restart` tests (guest auth)
  {
    prefix: "/noauth",
    routes: [
      {
        url: "/query",
        method: "GET",
        callback: async (ctx) => {
          const conn = await ctx.miolo.db.get_connection()
          const res = await conn.selectOne("select * from test_01 where name = $1", ["Peter"], {})
          ctx.body = res
        }
      }
    ]
  },
  {
    prefix: "/auth",
    routes: [
      {
        url: "/query",
        method: "GET",
        callback: (_ctx) => {},
        auth: {
          require: true,
          action: "redirect",
          redirect_url: "/"
        }
      }
    ]
  }
]
