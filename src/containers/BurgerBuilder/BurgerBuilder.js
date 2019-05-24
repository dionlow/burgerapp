import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      errorState: false,
      error: null
    }

    componentDidMount () {
      axios.get('https://react-my-burger-dfe14.firebaseio.com/ingredients.json')
        .then(response => this.setState({ ingredients: response.data }))
        .catch(error => this.setState({ errorState: true, error: error }))
    }

    updatePurchaseState (ingredients) {
      const sum = Object.keys(ingredients)
        .map(ingredientKey => ingredients[ingredientKey])
        .reduce((sum, el) => sum + el, 0)

      const purchaseState = sum > 0
      console.log(purchaseState, sum)
      this.setState({ purchaseable: purchaseState })
    }

    onPurchaseHandler = () => {
      this.setState({ purchasing: true })
    }

    onCancelPurchaseHandler = () => {
      this.setState({ purchasing: false })
    }

    onContinueHandler = () => {
      

      const queryParams = [] 
      for (let i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
      }
      queryParams.push("price=" + this.state.totalPrice)
      const queryString = queryParams.join('&')
      this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
      })
    }

    addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type]
      const updatedCount = oldCount + 1
      const updatedIngredients = { ...this.state.ingredients }
      updatedIngredients[type] = updatedCount

      const priceAddition = INGREDIENT_PRICES[type]
      const newPrice = this.state.totalPrice + priceAddition
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      })
      this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type]
      const updatedCount = Math.max(oldCount - 1, 0)
      const updatedIngredients = { ...this.state.ingredients }
      updatedIngredients[type] = updatedCount

      const priceSubtraction = INGREDIENT_PRICES[type]
      const newPrice = this.state.totalPrice - priceSubtraction

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      })
      this.updatePurchaseState(updatedIngredients)
    }

    render () {
      const disabledInfo = { ...this.state.ingredients }
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
      }

      let orderSummary = <Spinner />
      let burger = this.state.errorState ? <p> There is an error: {this.state.error.message}</p> : <Spinner />
      if (this.state.ingredients) {
        burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              price={this.state.totalPrice}
              purchaseable={this.state.purchaseable}
              purchaseHandler={this.onPurchaseHandler}
            />
          </Aux>
        )
        orderSummary = <OrderSummary
          totalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios)
