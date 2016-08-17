var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var RepoList = createClass({
  getInitialState: function () {
    return {
      loading: true,
      data: null,
      error: null
    }
  },

  componentDidMount() {
    this.props.promise.then(
      value => this.setState({
        loading: false,
        data: value
      }),
      error => this.setState({
        loading: false,
        error: error
      })
    )
  },

  render: function () {
    if (this.state.loading) {
      return <span>Loading...</span>
    }
    else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>
    }
    else {
      var repos = this.state.data.items

      var repoList = repos.map(function (repo, index) {
        return (<li key={index}>
          <a href={repo.html_url}>{repo.name}</a>
          ({repo.stargazers_count} stars)
          <br/>
          {repo.description}
        </li>)
      })

      return (<main>
        <h1>Most Popular JavaScript Projects in Github</h1>
        <ol>{repoList}</ol>
      </main>)
    }
  }
})

var content = <RepoList promise={
        $.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')
    }/>
render(content, root)