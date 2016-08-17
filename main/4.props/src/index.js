var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var HelloMessage = createClass({
  render: function () {
    return <h1>Hello {this.props.name} </h1>
  }
})

var content = <HelloMessage name="John"/>
render(content, root)