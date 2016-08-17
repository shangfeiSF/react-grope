'use strict'

var React = require('react')
var ReactDOM = require('react-dom')

var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var ExampleApplication = createClass({
  render: function () {
    var elapsed = Math.round(this.props.elapsed / 100)
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' )
    var message = 'React has been successfully running for ' + seconds + ' seconds.';

    return <p>{message}</p>
  }
})

var start = new Date().getTime()

setInterval(function () {
  var content = <ExampleApplication
    elapsed={new Date().getTime() - start}
  />
  render(content, root)
}, 50)
