import * as actionTypes from "../actions/actionTypes"
import { updateObject } from '../utility'

const initialState = {
    loading: false, 
    orders: [],
    error: undefined,
    purchased: false    
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_INIT: 
            return updateObject(state, {purchased: false, error: undefined})
        case actionTypes.PURCHASE_BURGER_START: 
            return updateObject(state, {loading: true})    
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, { id: action.id })            
            const newState = {
                loading: false, 
                purchased: true,                
                orders: state.orders.concat(newOrder)
            }
            return updateObject(state, newState)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false, error: action.error})  
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true}) 
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {orders: action.orders, loading: false})    
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {error: action.error, loading: false})     
        default: return state
    }    
}

export default reducer