import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render () {
    return (
      <Aux>
        <SideDrawer
          isOpen={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler} />
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
        <main className={classes.Content}>
          { this.props.children }
        </main>
      </Aux>
    )
  }
}

export default Layout
