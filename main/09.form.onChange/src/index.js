var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var Input = createClass({
  getInitialState: function () {
    return {
      value: 'Hello!'
    }
  },

  handleChange: function (e) {
    this.setState({
      value: e.target.value
    })
  },

  render: function () {
    var value = this.state.value
    return (<div>
      <input type="text" value={value} onChange={this.handleChange}/>
      <p>{value}</p>
    </div>)
  }
})

var content = <Input/>
render(content, root)