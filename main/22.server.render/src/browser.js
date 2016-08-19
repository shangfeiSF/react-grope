var React = require('react')
var ReactDOM = require('react-dom')

var app = React.createFactory(require('./app.js'))

var root = document.getElementById('content')
var content = app(window.app_props)

ReactDOM.render(content, root)