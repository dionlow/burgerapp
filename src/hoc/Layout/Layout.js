import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

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
