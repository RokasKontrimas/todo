import React from 'react'

const TextInputLabeled = (props) => {
    const {labelName, id, name, type, stateValue, onStateChange, error} = props
    const onStateChangeHandler = (e) => {
        onStateChange(e.target.value)
    }
    return (
        <div>
            {/*<div className={styles.formControl}>*/}
            <label htmlFor={id}>{labelName}</label>
            <input
                id={id}
                name={name}
                type={type}
                value={stateValue}
                onChange={(e) => onStateChangeHandler(e)}
            />
        </div>
    )
}
export default TextInputLabeled
