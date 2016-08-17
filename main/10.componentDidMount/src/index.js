var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var Hello = createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    }
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity
      opacity -= .05

      if (opacity < 0.1) {
        opacity = 1.0
      }

      this.setState({
        opacity: opacity
      })
    }.bind(this), 100)
  },

  render: function () {
    return (<div>
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    </div>)
  }
})

var content = <Hello name="world"/>
render(content, root)