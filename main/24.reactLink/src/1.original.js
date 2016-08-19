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
    var value = this.state.message
    var handlerOnChange = this.handlerOnChange

    return (<div>
      <p>{this.state.message}</p>
      <input type="text"
        value={value}
        onChange={handlerOnChange}
      />
    </div>)
  }
})

var content = <App />
render(content, root)