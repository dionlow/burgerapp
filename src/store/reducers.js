import * as actionTypes from "./actions"

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4,
    purchaseState: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }

const getPurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => ingredients[ingredientKey])
      .reduce((sum, el) => sum + el, 0)

    const purchaseState = sum > 0
    return purchaseState
}

const addIngredientHandler = (state, type) => {
    const oldCount = state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = { ...state.ingredients }
    updatedIngredients[type] = updatedCount

    const priceAddition = INGREDIENT_PRICES[type]
    const newPrice = state.totalPrice + priceAddition

    const newPurchaseState = getPurchaseState(updatedIngredients)
    return {
        ...state, 
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchaseState: newPurchaseState
    }    
}

const removeIngredientHandler = (state, type) => {
    const oldCount = state.ingredients[type]
    const updatedCount = Math.max(oldCount - 1, 0)
    const updatedIngredients = { ...state.ingredients }
    updatedIngredients[type] = updatedCount

    const priceSubtraction = INGREDIENT_PRICES[type]
    const newPrice = this.state.totalPrice - priceSubtraction

    const newPurchaseState = getPurchaseState(updatedIngredients)
    return {
        ...state, 
        ingredients: updatedIngredients,
        totalPrice: newPrice,
        purchaseState: newPurchaseState
    }  
  }

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredientHandler(state, action.ingredientType)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredientHandler(state, action.ingredientType)
        default:
            return state
    }
}

export default reducer