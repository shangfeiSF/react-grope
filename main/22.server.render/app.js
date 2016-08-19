var React = require('react')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      items: this.props.items,
      disabled: true
    }
  },

  componentDidMount: function () {
    this.setState({
      disabled: false
    })
  },

  handleClick: function () {
    this.setState({
      items: this.state.items.concat('Item ' + this.state.items.length)
    })
  },

  render: function () {
    var list = React.children.map(this.state.items, function (item) {
      return <li>{item}</li>
    })

    return (
      <div>
        <button onClick={this.handleClick} disabled={this.state.disabled}>Add Item</button>
        {list}
      </div>
    )
  }
})