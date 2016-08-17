var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass
var PropTypes = React.PropTypes

var title = 'react'
var MyTitle = createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
  },

  render: function () {
    return <h1>{this.props.title}</h1>
  }
})

var content = <MyTitle title={title}/>
render(content, root)