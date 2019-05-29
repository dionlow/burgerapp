import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null
    const classList = [classes.InputElement]

    if (props.inValid && props.shouldValidate && props.touched) classList.push(classes.Invalid)

    switch (props.elementType) {
        case ( 'input'): 
            inputElement = <input 
                className={classList.join(' ')} 
                {...props.elementConfig}
                onChange={props.onChange} 
                value={props.value}/>
            break
        case ( 'textarea'):
            inputElement = <textarea 
                className={classList.join(' ')} 
                {...props.elementConfig} 
                onChange={props.onChange} 
                value={props.value}/>
            break
        case ( 'select'):
            inputElement = <select 
                className={classList.join(' ')} 
                value={props.value}
                onChange={props.onChange} 
                >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}> 
                        {option.displayValue}
                    </option>))}
                    
                </select>

            break
        default: 
            inputElement = <input 
                className={classList.join(' ')} 
                {...props.elementConfig} 
                value={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input