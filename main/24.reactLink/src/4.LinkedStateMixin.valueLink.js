var root = document.getElementById('LinkedStateMixin.valueLink')
var render = ReactDOM.render
var createClass = React.createClass

var App = createClass({
  getInitialState: function () {
    return {
      message: 'Hello World!'
    }
  },

  mixins: [React.addons.LinkedStateMixin],

  render: function () {
    var message = this.state.message
    return (<div>
      <p>{message}</p>
      <input type="text" valueLink={this.linkState('message')}/>
    </div>)
  }
})

var content = <App />
render(content, root)