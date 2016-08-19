var http = require('http')
var literalify = require('literalify')
var browserify = require('browserify')

var React = require('react')
var ReactDOMServer = require('react-dom/server')

var app = React.createFactory(require('./app.js'))

var DOM = React.DOM
var body = DOM.body
var div = DOM.div
var script = DOM.script

function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/script/g, '<\\/script')
    .replace(/<!--/g, '<\\!--')
}

http
  .createServer(function (req, res) {
    if (req.url == '/') {
      res.setHeader('Content-Type', 'text/html')

      var props = {
        items: [
          'Item 0',
          'Item 1',
          'Item </script>',
          'Item <!--inject!-->',
        ]
      }

      var html = ReactDOMServer.renderToStaticMarkup(
        body(null,
        div({
          id: 'content', dangerouslySetInnerHTML: {
            __html: ReactDOMServer.renderToString(App(props))
          }
        }),

        script({
          dangerouslySetInnerHTML: {
            __html: 'var APP_PROPS = ' + safeStringify(props) + ';'
          }
        }),

        script({src: '//cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react.min.js'}),
        script({src: '//cdnjs.cloudflare.com/ajax/libs/react/15.3.0/react-dom.min.js'}),
        script({src: '/bundle.js'})
      ))

      res.end(html)
    }

    else if (req.url == '/bundle.js') {

      res.setHeader('Content-Type', 'text/javascript')

      browserify()
        .add('./browser.js')
        .transform(literalify.configure({
          'react': 'window.React',
          'react-dom': 'window.ReactDOM',
        }))
        .bundle()
        .pipe(res)

    }

    else {
      res.statusCode = 404
      res.end()
    }

  })

  .listen(8080, function (error) {
    if (error) throw error
    console.log('Listening on 8080...')
  })