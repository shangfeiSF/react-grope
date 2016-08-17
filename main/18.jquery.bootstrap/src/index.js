var root = document.getElementById('example')
var render = ReactDOM.render
var createClass = React.createClass

var BootstrapButton = createClass({
  render: function () {
    return (
      <a
        {...this.props}
        href="javascript:;"
        role="button"
        className={(this.props.className || '') + ' btn'}
      />
    )
  }
})

var BootstrapModal = createClass({
  componentDidMount: function () {
    $(this.refs.root).modal({
        backdrop: 'static',
        keyboard: false,
        show: false
      }
    )

    $(this.refs.root).on('hidden.bs.modal', this.handleHidden)
  },

  componentWillUnmount: function () {
    $(this.refs.root).off('hidden.bs.modal', this.handleHidden)
  },

  close: function () {
    $(this.refs.root).modal('hide')
  },

  open: function () {
    $(this.refs.root).modal('show')
  },

  handleCancel: function () {
    this.props.onCancel && this.props.onCancel()
  },

  handleConfirm: function () {
    this.props.onConfirm && this.props.onConfirm()
  },

  handleHidden: function () {
    this.props.onHidden && this.props.onHidden()
  },

  render: function () {
    var confirmButton = null
    var cancelButton = null

    if (this.props.confirm) {
      confirmButton = (
        <BootstrapButton onClick={this.handleConfirm} className="btn-primary">
          {this.props.confirm}
        </BootstrapButton>
      )
    }

    if (this.props.cancel) {
      cancelButton = (
        <BootstrapButton onClick={this.handleCancel} className="btn-default">
          {this.props.cancel}
        </BootstrapButton>
      )
    }

    return (
      <div className="modal fade" ref="root">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this.handleCancel}
              >
                &times;
              </button>
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
  handleCancel: function () {
    if (confirm('Are you sure you want to cancel?')) {
      this.refs.modal.close()
    }
  },

  openModal: function () {
    this.refs.modal.open()
  },

  closeModal: function () {
    this.refs.modal.close()
  },

  handleModalDidClose: function () {
    alert("The modal has been dismissed!")
  },

  render: function () {
    var modal = (
      <BootstrapModal
        ref="modal"
        confirm="OK"
        cancel="Cancel"
        onCancel={this.handleCancel}
        onConfirm={this.closeModal}
        onHidden={this.handleModalDidClose}
        title="Hello, Bootstrap!"
      >
        This is a React component powered by jQuery and Bootstrap!
      </BootstrapModal>
    )

    return (
      <div className="example">
        {modal}
        <BootstrapButton onClick={this.openModal} className="btn-default">
          Open modal
        </BootstrapButton>
      </div>
    )
  }
})

var content = <Example />
render(content, root)
