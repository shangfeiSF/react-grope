var fs = require('fs')
var path = require('path')

var express = require('express')
var literalify = require('literalify')
var browserify = require('browserify')

var Promise = require('bluebird')
Promise.promisifyAll(fs)

var React = require('react')
var ReactDOMServer = require('react-dom/server')

var app = React.createFactory(require('./app.build.js'))

var server = express()

server.use(express.static('../../assets'))

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

var props = {
  items: ['Item 0', 'Item 1', 'Item </script>', 'Item <!--inject!-->']
}

var indexHTML = ReactDOMServer.renderToStaticMarkup(
  <body>
  <div id="content" dangerouslySetInnerHTML={{ __html: ReactDOMServer.renderToString(app(props)) }}></div>
  <script dangerouslySetInnerHTML={{ __html:  'var app_props = ' + safeStringify(props) + ';' }}></script>
  <script src="/react.min.js"></script>
  <script src="/react-dom.min.js"></script>
  <script src="/browser.build.js"></script>
  </body>
)

server.get('/index.html', function (req, res) {
  res.type('html')
  res.send(indexHTML)
})

server.get('/browser.build.js', function (req, res) {
  res.type('text/javascript')
  browserify()
    .add('./browser.js')
    .transform(literalify.configure({
      'react': 'window.React',
      'react-dom': 'window.ReactDOM',
    }))
    .bundle()
    .pipe(res)
})

server.listen(8080, function (error) {
  if (error) throw error
  console.log('Listening on 8080...')
})