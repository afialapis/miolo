import {test_restarts_server_start, 
  test_restarts_server_restart, 
  test_restarts_server_stop} from './units/server.mjs'
import {test_restarts_client,
  test_restarts_client_fail} from './units/client.mjs'

export function test_restarts() {
  test_restarts_server_start()

  test_restarts_client()

  test_restarts_server_restart()

  test_restarts_client()

  test_restarts_server_restart()

  test_restarts_server_restart()

  test_restarts_client()

  test_restarts_server_stop()
  test_restarts_server_stop()

  test_restarts_server_start()

  test_restarts_client()

  test_restarts_server_stop()

  test_restarts_client_fail()

}

