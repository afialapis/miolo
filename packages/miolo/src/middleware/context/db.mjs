import { getConnection, dropConnections } from 'calustra/conn-postgres'
import {  miolo_cacher_options_for_calustra } from './cache/options.mjs'

export function init_context_db (config, logger) {

  const get_connection_wrap = async (options) => {

    const dbOptions= {
      ...config.db.options,
      ...options || {},
      
      log: logger,
      cache: miolo_cacher_options_for_calustra(config, logger)
    }
    

    let conn = await getConnection(config.db.config, dbOptions)
    conn.get_model = conn.getModel

    // Maybe we need to force some conn is retrieved?
    //
    // if (! conn) {
    //   conn = getConnection(config.db.config, {
    //     ...dbOptions,
    //     reset: true
    //   })
    // }
    return conn
  }

  const get_model_wrap = async (name, options) => {

    const dbOptions= {
      ...config.db.options,
      ...options || {},
      log: logger
    }

    const conn = await getConnection(config.db.config, dbOptions)
    return conn.get_model(name)
  }  

  const db= {
    init_connection: async () => {
      const conn = await get_connection_wrap({reset: true})
      return conn
    },
    fly_connection: async () => {
      const conn = await get_connection_wrap({cache: false})
      return conn
    },
    get_connection: get_connection_wrap,
    get_model: get_model_wrap,
    drop_connections: dropConnections
  }

  return db
}