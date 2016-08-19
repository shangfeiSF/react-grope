var root = document.getElementById('app3')
var render = ReactDOM.render
var createClass = React.createClass

var Search = createClass({
  handlerInputOnChange: function () {
    this.props.onUserInput(
      this.refs.search.value,
      this.refs.only.checked
    )
  },

  render: function () {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.search}
          ref="search"
          onChange={this.handlerInputOnChange}
        />
        <p>
          <input type="checkbox" checked={this.props.only}
            ref="only"
            onChange={this.handlerInputOnChange}
          />
          Only show products in stock
        </p>
      </form>
    )
  }
})

var List = createClass({
  show: function (item) {
    var show = true

    var search = this.props.search
    var only = this.props.only

    if (item.name.indexOf(search) < 0) {
      show = false
    }

    if (only && !item.stocked) {
      show = false
    }

    return show
  },

  makeRows: function () {
    var self = this
    var data = this.props.data

    var rows = []
    var _MAP_ = []

    data.forEach(function (item) {
      var category = item.category

      var index = -1
      _MAP_.forEach(function (item, i) {
        item.category === category && (index = i)
      })

      if (index > -1) {
        _MAP_[index].lists.push(item)
      }
      else {
        _MAP_.push({
          category: category,
          lists: [item]
        })
      }
    })

    _MAP_.forEach(function (item) {
      rows.push(<Category category={item.category} key={item.category}/>)

      item.lists.forEach(function (item) {
        self.show(item) && rows.push(<Item item={item} key={item.name}/>)
      })
    })

    return rows
  },

  render: function () {
    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{this.makeRows()}</tbody>
      </table>
    )
  }
})

var Category = createClass({
  render: function () {
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    )
  }
})

var Item = createClass({
  makeName: function () {
    var stocked = this.props.item.stocked
    var name = this.props.item.name

    return stocked ? name : <span style={{color: 'red'}}>{name}</span>
  },

  render: function () {
    return (
      <tr>
        <td>{this.makeName()}</td>
        <td>{this.props.item.price}</td>
      </tr>
    )
  }
})

var App = createClass({
  getInitialState: function () {
    return {
      search: this.props.config.search,
      only: this.props.config.only
    }
  },

  handlerOnUserInput: function (search, only) {
    this.setState({
      search: search,
      only: only
    })
  },

  render: function () {
    return (
      <div>
        <Search search={this.state.search} only={this.state.only} onUserInput={this.handlerOnUserInput}/>
        <List data={this.props.data} search={this.state.search} only={this.state.only}/>
      </div>
    )
  }
})

var config = {
  search: 'ball',
  only: true
}
var data = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'Mezus 5'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 6'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Volleyball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]
var content = <App data={data} config={config}/>
render(content, root)