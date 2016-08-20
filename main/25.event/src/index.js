var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var App = createClass({
  getInitialState: function () {
    return {
      nativeEvent: null
    }
  },

  handlerOnChange: function (event) {
    this.setState({
      nativeEvent: event.nativeEvent
    })
  },

  render: function () {
    var nativeEvent = JSON.stringify(this.state.nativeEvent, null, 2)
    var handlerOnChange = this.handlerOnChange

    return (
      <div>
        <h2>nativeEvent</h2>
        <p>{nativeEvent}</p>
        <div>
          <button onClick={handlerOnChange}>click me</button>
        </div>
      </div>
    )
  }
})

var content = <App />
render(content, root)