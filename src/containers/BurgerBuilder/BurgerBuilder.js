import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux' 
import * as burgerBuilderActions from '../../store/actions/index'

import axios from '../../axios-orders'


class BurgerBuilder extends Component {
    state = {
      purchasing: false
    }

    componentDidMount () {
      this.props.initIngredients()
    }

    onPurchaseHandler = () => {
      this.setState({ purchasing: true })
    }

    onCancelPurchaseHandler = () => {
      this.setState({ purchasing: false })
    }

    onContinueHandler = () => {
      this.props.history.push('/checkout')
    }

    updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
        .map(ingredientKey => ingredients[ingredientKey])
        .reduce((sum, el) => sum + el, 0)
      return sum > 0
  }

    render () {
      const disabledInfo = { ...this.props.ingredients }
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
      }

      let orderSummary = <Spinner />
      let burger = this.props.error ? <p> There is an error</p> : <Spinner />
      if (this.props.ingredients) {
        burger = (
          <Aux>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.addIngredient}
              ingredientRemoved={this.props.removeIngredient}
              disabled={disabledInfo}
              price={this.props.totalPrice}
              purchaseable={this.updatePurchaseState(this.props.ingredients)}
              purchaseHandler={this.onPurchaseHandler}
            />
          </Aux>
        )
        orderSummary = <OrderSummary
          totalPrice={this.props.totalPrice}
          ingredients={this.props.ingredients}
          purchaseCanceled={this.onCancelPurchaseHandler}
          purchaseContinued={this.onContinueHandler} />
      } 

      return (
        <Aux>
          <Modal showModal={this.state.purchasing} closeModal={this.onCancelPurchaseHandler}>
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
      )
    }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (ingredientType) => dispatch(burgerBuilderActions.addIngredient(ingredientType)),
    removeIngredient: (ingredientType) => dispatch(burgerBuilderActions.removeIngredient(ingredientType)),
    initIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
