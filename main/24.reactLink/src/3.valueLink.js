var root = document.getElementById('valueLink')
var render = ReactDOM.render
var createClass = React.createClass

var App = createClass({
  getInitialState: function () {
    return {
      message: 'Hello World!'
    }
  },

  handlerRequestChange: function (newValue) {
    this.setState({
      message: newValue
    })
  },

  render: function () {
    var message = this.state.message

    var valueLink = {
      value: this.state.message,
      requestChange: this.handlerRequestChange
    }

    return (<div>
      <p>{message}</p>
      <input type="text" valueLink={valueLink}/>
    </div>)
  }
})

var content = <App />
render(content, root)