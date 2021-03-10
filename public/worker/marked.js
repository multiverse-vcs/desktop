onmessage = (event) => {
  importScripts('marked.min.js')
  const result = self.marked(event.data)
  postMessage(result)
}