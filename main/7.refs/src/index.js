var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var MyComponent = createClass({
  handleClick: function () {
    this.refs.myTextInput.focus()
  },

  render: function () {
    return (<div>
      <input type="text" ref="myTextInput"/>
      <input type="button" value="Focus the text input" onClick={this.handleClick}/>
    </div>)
  }
})

var content = <MyComponent />
render(content, root)