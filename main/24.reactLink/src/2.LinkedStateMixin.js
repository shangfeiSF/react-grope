var root = document.getElementById('LinkedStateMixin')
var render = ReactDOM.render
var createClass = React.createClass

var App = createClass({
  getInitialState: function () {
    return {
      message: 'Hello World!'
    }
  },

  mixins: [React.addons.LinkedStateMixin],

  _link_: function () {
    var valueLink = this.linkState('message')

    var handlerOnChange = function (e) {
      valueLink.requestChange(e.target.value)
    }

    return {
      value: valueLink.value,
      handlerOnChange: handlerOnChange
    }
  },

  render: function () {
    var link = this._link_()
    var value = link.value
    var handlerOnChange = link.handlerOnChange

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