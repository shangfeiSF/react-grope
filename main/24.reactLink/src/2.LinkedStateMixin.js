var root = document.getElementById('LinkedStateMixin')
var render = ReactDOM.render
var createClass = React.createClass

var App = createClass({
  getInitialState: function () {
    return {
      message: 'Hello world!'
    }
  },

  mixins: [React.addons.LinkedStateMixin],

  render: function () {
    var message = this.state.message

    var valueLink = this.linkState('message')

    var handlerRequestChange = function (e) {
      valueLink.requestChange(e.target.value)
    }

    return (<div>
      <p>{message}</p>
      <input type="text" value={valueLink.value} onChange={handlerRequestChange}/>
    </div>)
  }
})

var content = <App />
render(content, root)