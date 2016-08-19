var root = document.getElementById('app1')
var render = ReactDOM.render
var createClass = React.createClass

var Search = createClass({
  render: function () {
    return (
      <form>
        <input type="text" placeholder="Search..."/>
        <p>
          <input type="checkbox"/>
          Only show products in stock
        </p>
      </form>
    )
  }
})

var List = createClass({
  show: function (item) {
    var show = true
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
  render: function () {
    return (
      <div>
        <Search />
        <List data={this.props.data}/>
      </div>
    )
  }
})

var data = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'Mezus 5'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 6'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Volleyball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]
var content = <App data={data}/>
render(content, root)