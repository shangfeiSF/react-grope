var root = document.getElementById('example')
var render = ReactDOM.render

var names = ['Alice', 'Emily', 'Kate']

var content = <div> {
    names.map(function (name, index) {
        var key = [name, '_', index].join('')
        return <div key={key}>Hello, {name}!</div>
    })
} </div>
render(content, root)