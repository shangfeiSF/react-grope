var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var BootstrapButton = createClass({
  render: function () {
    var {className, ...rest} = {...this.props}
    var className = className || '' + ' btn'

    return (
      <a
        {...rest}
        href="javascript:void(0);"
        role="button"
        className={className}
      />
    )
  }
})

var BootstrapModal = createClass({
  OPEN: function () {
    $(this.refs.self).modal('show')
  },

  CLOSE: function () {
    $(this.refs.self).modal('hide')
  },

  componentDidMount: function () {
    var self = $(this.refs.self)

    self.modal({
      backdrop: 'static',
      keyboard: false,
      show: false /* 模拟框初始显示状态 */
    })

    self.on('hidden.bs.modal', this.monitorOnHidden)
  },

  componentWillUnmount: function () {
    $(this.refs.self).off('hidden.bs.modal', this.monitorOnHidden)
  },

  monitorOnConfirm: function () {
    this.props.onConfirm && this.props.onConfirm()
  },

  monitorOnCancel: function () {
    this.props.onCancel && this.props.onCancel()
  },

  monitorOnHidden: function () {
    this.props.onHidden && this.props.onHidden()
  },

  render: function () {
    var confirmButton = this.props.confirm ?
      (
        <BootstrapButton onClick={this.monitorOnConfirm} className="btn-primary">
          {this.props.confirm}
        </BootstrapButton>
      ) : null

    var cancelButton = this.props.cancel ?
      (
        <BootstrapButton onClick={this.monitorOnCancel} className="btn-default">
          {this.props.cancel}
        </BootstrapButton>
      ) : null

    var closeButton = <button
      type="button"
      className="close"
      onClick={this.monitorOnCancel}
    > &times; </button>

    return (
      <div className="modal fade" ref="self">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {closeButton}
              <h3>{this.props.title}</h3>
            </div>

            <div className="modal-body">
              {this.props.children}
            </div>

            <div className="modal-footer">
              {cancelButton}
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

var Example = React.createClass({
  handlerOnConfirm: function () {
    this.refs.modal.CLOSE()
  },

  handlerOnCancel: function () {
    confirm('Are you sure you want to cancel?') && this.refs.modal.CLOSE()
  },

  handlerOnHidden: function () {
    console.log("The modal has been dismissed!")
  },

  handlerOnClick: function () {
    this.refs.modal.OPEN()
  },

  render: function () {
    {
      /*
       * ref 是组件 Example 的特殊属性
       * ref 不会像 confirm, cancel 等属性传递给组件 Example 的子组件 BootstrapModal 的 props
       * */
    }
    var modal = (
      <BootstrapModal
        ref="modal"

        confirm={this.props.confirm}
        cancel={this.props.cancel}

        onConfirm={this.handlerOnConfirm}
        onCancel={this.handlerOnCancel}
        onHidden={this.handlerOnHidden}

        title={this.props.title}
      >
        {this.props.content}
      </BootstrapModal>
    )

    return (
      <div className="main">
        {modal}
        <BootstrapButton onClick={this.handlerOnClick} className="btn-default">
          {this.props.text}
        </BootstrapButton>
      </div>
    )
  }
})

var content =
  <Example
    confirm="OK"
    cancel="Cancel"
    title="Hello, Bootstrap!"
    content="This is a React component powered by jQuery and Bootstrap!"
    text="Open modal"
  />
render(content, root)