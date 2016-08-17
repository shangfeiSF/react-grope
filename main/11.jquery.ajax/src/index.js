var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var UserGist = createClass({
  getInitialState: function () {
    return {
      username: '',
      lastGistUrl: ''
    }
  },

  componentDidMount: function () {
    $.get(this.props.source, function (result) {
      if (this.isMounted()) {
        this.setState({
          username: result[0].owner.login,
          lastGistUrl: result[0].html_url
        })
      }
    }.bind(this))
  },

  render: function () {
    return (<div>
      {this.state.username}'s last gist is
      <a href={this.state.lastGistUrl}>here</a>
    </div>)
  }
})

var content = <UserGist source="https://api.github.com/users/octocat/gists"/>
render(content, root)