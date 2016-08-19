var root = document.getElementById('original')
var render = ReactDOM.render
var createClass = React.createClass

var App = createClass({
  getInitialState: function () {
    return {
      message: 'Hello World!'
    }
  },

  handlerOnChange: function (event) {
    this.setState({
      message: event.target.value
    })
  },

  render: function () {
    var message = this.state.message
    return (<div>
      <p>{message}</p>
      <input type="text" value={message} onChange={this.handlerOnChange}/>
    </div> )
  }
})

var content = <App />
render(content, root)