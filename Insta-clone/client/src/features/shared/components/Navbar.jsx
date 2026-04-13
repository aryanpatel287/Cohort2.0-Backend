import React from 'react'
import '../styles/navbar.scss'
import { useNavigate } from 'react-router'
import ActiveUser from '../../user/components/ActiveUser'

const Navbar = () => {

const navigate = useNavigate();

    return (
        <div className='navbar-wrapper'>
            <div 
            onClick={() => { navigate("/") }}
            className="logo"
            >
                Not Instagram
            </div>
            <div className='navbar-actions'>
                <button
                    onClick={() => { navigate("/create-post") }}
                    className='create-post button primary-button '>
                    Create Post
                </button>
                <ActiveUser />
            </div>
        </div>
    )
}

export default Navbar
