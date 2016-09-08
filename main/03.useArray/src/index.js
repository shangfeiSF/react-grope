var root = document.getElementById('example')
var render = ReactDOM.render

var doms = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>
]

var content = <div> {doms}</div>
render(content, root)