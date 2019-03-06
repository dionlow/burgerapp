import React from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => (
  <Aux>
    <Backdrop show={props.showModal} clicked={props.closeModal} />
    <div
      style={{
        transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.showModal ? 1 : 0
      }}
      className={classes.Modal}
    >{props.children}</div>

  </Aux>

)

export default modal
