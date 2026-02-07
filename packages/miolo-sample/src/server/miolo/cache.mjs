export default {
  default: {
    type: 'redis',
    redis: {
      host: process.env.IS_DOCKER === "true" ? 'redis' : '127.0.0.1',
      port: 6379
    },
    version: 2,
    clean: false,
  }
}
