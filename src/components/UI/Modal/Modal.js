import React, { Component } from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return this.props.showModal !== nextProps.showModal
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.showModal} clicked={this.props.closeModal} />
        <div
          style={{
            transform: this.props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.showModal ? 1 : 0
          }}
          className={classes.Modal}
        >{this.props.children}</div>
      </Aux>
    )
  }
}

export default Modal
