import React, { Component } from 'react' 
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
            name: 'Dion Low',
            address: {
                street: 'mystreet',
                zipCode: '12344',
                country: 'country1'
            },
            email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
            console.log('error: ' + error)
            this.setState({ loading: false })
            })
    }

    render() {
        let form = (
            <form> 
                    <input type="text" name="name" placeholder="Your Name"></input>
                    <input type="email" name="email" placeholder="Your Email"></input> 
                    <input type="text" name="street" placeholder="Your Street"></input>
                    <input type="text" name="postal" placeholder="Your Postal"></input>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        } 

        return (
            <div className={classes.ContactData}>
                <h4>Contact Data Form</h4>
                {form}
            </div>
        )
    }
}

export default ContactData