import React from 'react'
import BurgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
  <div className={classes.Logo}>
    <img alt='burger logo' src={BurgerLogo} />
  </div>
)
export default logo
