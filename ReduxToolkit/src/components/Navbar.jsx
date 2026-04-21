import React from 'react'
import { changeThemeToDark, changeThemeToLight } from '../redux/slices/themeSlice'
import { useDispatch } from 'react-redux'

const Navbar = ({ theme }) => {
    const dispatch = useDispatch()

    return (
        <div className='navbar-wrapper'>
            <div className="buttons-wrapper">
                <button
                    onClick={
                        () => {
                            theme == 'light' ?
                                dispatch(changeThemeToDark())
                                : dispatch(changeThemeToLight())
                        }
                    }
                >Change theme to {theme == 'light' ? 'dark' : 'light'}</button>
            </div>
        </div>
    )
}

export default Navbar