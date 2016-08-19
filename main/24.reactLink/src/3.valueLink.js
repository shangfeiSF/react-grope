var root = document.getElementById('valueLink')
var render = ReactDOM.render
var createClass = React.createClass

var App = createClass({
  getInitialState: function () {
    return {
      message: 'Hello World!'
    }
  },

  _link_: function () {
    var self = this

    var requestChange = function (newValue) {
      self.setState({
        message: newValue
      })
    }

    return {
      value: this.state.message,
      requestChange: requestChange
    }
  },

  render: function () {
    var link = this._link_()

    return (<div>
      <p>{this.state.message}</p>
      <input type="text"
        valueLink={link}
      />
    </div>)
  }
})

var content = <App />
render(content, root)