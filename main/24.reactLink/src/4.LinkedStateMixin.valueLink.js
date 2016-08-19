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
    var link = this.linkState('message')

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