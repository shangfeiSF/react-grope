var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass
var createFactory = React.createFactory
var dom = React.DOM

var ExampleApplication = createClass({
  render: function () {
    var elapsed = Math.round(this.props.elapsed / 100)
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' )
    var message = 'React has been successfully running for ' + seconds + ' seconds.'

    return dom.p(null, message)
  }
})

var ExampleApplicationFactory = createFactory(ExampleApplication)

var start = new Date().getTime()

setInterval(function () {
  var content = ExampleApplicationFactory({
    elapsed: new Date().getTime() - start
  })
  render(content, root)
}, 50)