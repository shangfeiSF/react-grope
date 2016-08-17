var root = document.getElementById('example')
var render = ReactDOM.render
var component = React.Component

class ExampleApplication extends component {
  render() {
    var elapsed = Math.round(this.props.elapsed / 100)
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' )
    var message = `React has been successfully running for ${seconds} seconds.`

    return <p>{message}</p>
  }
}

var start = new Date().getTime()

setInterval(() => {
  var content = <ExampleApplication elapsed={
    new Date().getTime() - start
  }/>
  render(content, root);
}, 50)