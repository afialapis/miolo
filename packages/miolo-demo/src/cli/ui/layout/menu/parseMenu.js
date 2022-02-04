import slugify from '../../util/text/slugify'
import stripHtml from '../../util/text/stripHtml'

const parseMenu = (contentNode) => {
  const headings= contentNode.querySelectorAll('h1, h2, h3')

  const parseHead = (h) => {
    const level= parseInt(h.tagName.replace('H', ''))
    const title= stripHtml(h.innerHTML.trim())
    const slug= slugify(title)

    return {
      title, 
      id: slug, 
      level,
      node: h
    }
  }

  const menu= Array.prototype.map.call(headings, h => parseHead(h))
              .filter(m => m!=undefined)

  return menu

}

export default parseMenu