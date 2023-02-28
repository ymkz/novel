export const narouLinkReplacer: HTMLRewriterElementContentHandlers = {
  element: (element) => {
    const attribute = element.getAttribute('href')
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const [, ncode, page] = attribute.split('/')
        element.setAttribute(
          'href',
          attribute.replace(/^\/n.+/, `/narou/${ncode}/${page}`)
        )
      }
    }
  },
}
