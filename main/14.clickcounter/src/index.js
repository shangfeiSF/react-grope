var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var Counter = createClass({
  getInitialState: function () {
    return {
      count: 0
    }
  },

  handleClick: function () {
    this.setState({
      count: this.state.count + 1,
    })
  },

  render: function () {
    return (<button onClick={this.handleClick}>
      Click me! Number of clicks: {this.state.count}
    </button>)
  }
})

var content = <Counter />
render(content, root)