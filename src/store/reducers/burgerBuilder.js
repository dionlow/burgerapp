import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility"

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }

const addIngredient = (state, type) => {
    const updatedIngredient = {[type]: state.ingredients[type] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient )
    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[type]
    }
    return updateObject(updateState)
}

const removeIngredient = (state, type) => {
    const updatedIngredient = {[type]: state.ingredients[type] - 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient )
    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[type]
    }
    return updateObject(state, updateState)
  }

const setIngredient = (state, action) => {
    const updatedState = {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
    }
    return updateObject(state, updatedState)
}

const fetchIngredientFailed = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action.ingredientType)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action.ingredientType)
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action)            
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientFailed
        default: return state
    }
}

export default reducer