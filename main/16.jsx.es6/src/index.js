var root = document.getElementById('example')
var render = ReactDOM.render
var component = React.Component

class ExampleApplication extends component {
  render() {
    var {elapsed, message} = this.props
    var elapsed = Math.round(elapsed / 100)
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' )
    var message = `${message} + ${seconds}`

    return <p>{message}</p>
  }
}

var start = new Date().getTime()

setInterval(() => {
  var content = <ExampleApplication
    elapsed={new Date().getTime() - start }
    message="React has been successfully running for"
  />
  render(content, root);
}, 50)