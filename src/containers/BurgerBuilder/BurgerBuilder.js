import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux' 
import * as actionTypes from '../../store/actions'

import axios from '../../axios-orders'


class BurgerBuilder extends Component {
    state = {
      purchasing: false,
      loading: false,
      errorState: false,
      error: null
    }

    componentDidMount () {
      // axios.get('https://react-my-burger-dfe14.firebaseio.com/ingredients.json')
      //   .then(response => this.setState({ ingredients: response.data }))
      //   .catch(error => this.setState({ errorState: true, error: error }))
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
      let burger = this.state.errorState ? <p> There is an error: {this.state.error.message}</p> : <Spinner />
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

      if (this.state.loading) {
        orderSummary = <Spinner />
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
    purchaseable: state.purchaseState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (ingredientType) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientType: ingredientType }),
    removeIngredient: (ingredientType) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingredientType })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
