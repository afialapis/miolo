import path from 'path'
const root = (dir) => path.resolve(process.cwd(), dir)

export default {
  static: {
    favicon: root('src/static/img/favicon.ico'),
    folders: {
      '/build': root('build'),
      '/static': root('src/static'),
      '/': root('src/static/public')
    }
  }
}
