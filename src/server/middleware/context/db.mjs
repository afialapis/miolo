import { getConnection, dropConnections } from 'calustra'
import {  miolo_cacher_options_for_calustra } from './cache/options.mjs'

export function init_context_db (config, logger) {

  const getConnectionWrap = async (options) => {

    const dbOptions= {
      ...config.db.options,
      ...options || {},
      
      log: logger,
      cache: miolo_cacher_options_for_calustra(config, logger)
    }
    

    let conn = await getConnection(config.db.config, dbOptions)

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

  const getModelWrap = async (name, options) => {

    const dbOptions= {
      ...config.db.options,
      ...options || {},
      log: logger
    }

    const conn = await getConnection(config.db.config, dbOptions)
    return conn.getModel(name)
  }  

  const db= {
    initConnection: async () => {
      const conn = await getConnectionWrap({reset: true})
      return conn
    },
    flyConnection: async () => {
      const conn = await getConnectionWrap({cache: false})
      return conn
    },
    getConnection: getConnectionWrap,
    getModel: getModelWrap,
    dropConnections
  }

  return db
}