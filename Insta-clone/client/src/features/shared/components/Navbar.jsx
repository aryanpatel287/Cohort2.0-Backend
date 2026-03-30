import React from 'react'
import '../styles/navbar.scss'
import { useNavigate } from 'react-router'

const Navbar = () => {

const navigate = useNavigate();

    return (
        <div className='navbar-wrapper'>
            <div className="logo">
                Not Instagram
            </div>
            <button 
            onClick={()=>{navigate("/create-post")}}
            className='create-post button primary-button '>
                Create Post
            </button>
        </div>
    )
}

export default Navbar
