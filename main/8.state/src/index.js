var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var LikeButton = createClass({
  getInitialState: function () {
    return {
      liked: false
    }
  },

  handleClick: function (e) {
    this.setState({
      liked: !this.state.liked
    })
  },

  render: function () {
    var text = this.state.liked ? 'like' : 'haven\'t liked'
    return (<div>
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    </div>)
  }
})

var content = <LikeButton />
render(content, root)