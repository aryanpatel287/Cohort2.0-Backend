import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/slices/counterSlice'

const Counter = () => {

    const dispatch = useDispatch()
    const num = useSelector((state) => state.counter.value)

    return (
        <div className="counter-wrapper">
            <h1 className='counter-value'>{num}</h1>
            <div className='buttons-wrapper'>

                <button
                    onClick={() => { dispatch(increment()) }}
                >Increment
                </button>


                <button
                    onClick={() => { dispatch(decrement()) }}
                >Decrement</button>

            </div>
        </div>
    )
}

export default Counter