import React from 'react'
import '../styles/navbar.scss'
import { useNavigate } from 'react-router'
import ActiveUser from '../../user/components/ActiveUser'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar-outer">
            <div className='navbar-wrapper'>
                <div
                    onClick={() => { navigate("/") }}
                    className="logo"
                    role="link"
                    tabIndex={0}
                    aria-label="Go to home"
                    onKeyDown={(e) => e.key === 'Enter' && navigate("/")}
                >
                    Not Instagram
                </div>
                <div className='navbar-actions'>
                    <button
                        onClick={() => { navigate("/create-post") }}
                        className='create-post button primary-button'
                        aria-label="Create a new post"
                    >
                        <i className="ri-add-line" aria-hidden="true" />
                        Create Post
                    </button>
                    <ActiveUser />
                </div>
            </div>
        </div>
    )
}

export default Navbar
