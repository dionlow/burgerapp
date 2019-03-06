import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../../components/UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((ingredientKey) => (
      <li key={ingredientKey}>
        <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>:
        {props.ingredients[ingredientKey]}
      </li>))

  return (
    <Aux>
      <h3>Order Summary</h3>
      <p>A delicious burger includes: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <h3><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></h3>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary
