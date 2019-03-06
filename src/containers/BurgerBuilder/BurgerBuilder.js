import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchaseable: false,
      purchasing: false
    }

    updatePurchaseState (ingredients) {
      const sum = Object.keys(ingredients)
        .map(ingredientKey => ingredients[ingredientKey])
        .reduce((sum, el) => sum + el, 0)

      const purchaseState = sum > 0
      this.setState({ purchaseable: purchaseState })
    }

    onPurchaseHandler = () => {
      this.setState({ purchasing: true })
    }

    onCancelPurchaseHandler = () => {
      this.setState({ purchasing: false })
    }

    onContinueHandler = () => {
      alert('continue!')
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

      return (
        <Aux>
          <Modal showModal={this.state.purchasing} closeModal={this.onCancelPurchaseHandler}>
            <OrderSummary
              totalPrice={this.state.totalPrice}
              ingredients={this.state.ingredients}
              purchaseCanceled={this.onCancelPurchaseHandler}
              purchaseContinued={this.onContinueHandler} />
          </Modal>
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
    }
}

export default BurgerBuilder
