var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass
var children = React.Children

var NotesList = createClass({
  render: function () {
    return (<ol>{
      children.map(this.props.children, function (child) {
        return <li>{child}</li>
      })
    }</ol>)
  }
})

var content = <NotesList>
  <span>hello</span>
  <span>world</span>
</NotesList>
render(content, root)