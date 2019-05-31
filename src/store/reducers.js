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

const addIngredientHandler = (state, type) => {
    return {
        ...state, 
        ingredients: {
            ...state.ingredients,
            [type]: state.ingredients[type] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[type],
    }    
}

const removeIngredientHandler = (state, type) => {
    return {
        ...state, 
        ingredients: {
            ...state.ingredients,
            [type]: state.ingredients[type] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[type],
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