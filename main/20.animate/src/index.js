var root = document.getElementById('container')
var render = ReactDOM.render
var createClass = React.createClass
var CSSTransitionGroup = React.addons.CSSTransitionGroup

var AnimateDemo = createClass({
  getInitialState: function () {
    return {
      items: ['hello', 'world', 'click', 'me']
    }
  },

  handleAdd: function () {
    var newItems = this.state.items.concat([prompt('Enter some text')])

    this.setState({
      items: newItems
    })
  },

  handleRemove: function (i) {
    var newItems = this.state.items

    newItems.splice(i, 1)

    this.setState({
      items: newItems
    })
  },

  render: function () {
    var items = this.state.items.map(function (item, i) {
      return (
        <div key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </div>
      )
    }.bind(this))

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {items}
        </CSSTransitionGroup>
      </div>
    )
  }
})

var content = <AnimateDemo />
render(content, root)