import React from 'react'
import '../styles/mobile-nav.scss'

//Learned the new things here 

const TABS = [
    { id: 'home', icon: 'ri-home-4-line', label: 'Home', className: 'nav-home' },
    { id: 'following', icon: 'ri-user-follow-line', label: 'Following' },
    { id: 'followers', icon: 'ri-user-heart-line', label: 'Followers' },
    { id: 'discover', icon: 'ri-compass-3-line', label: 'Discover' },
    { id: 'requests', icon: 'ri-user-received-line', label: 'Requests', hasBadge: false },
]

const MobileNav = ({ activeTab, onTabChange }) => {
    return (
        <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
            {TABS.map(({ id, icon, label, className, hasBadge }) => (
                <button
                    key={id}
                    type="button"
                    className={`mobile-nav-btn${className ? ` ${className}` : ''}${activeTab === id ? ' active' : ''}`}
                    aria-label={label}
                    aria-pressed={activeTab === id}
                    onClick={() => onTabChange(activeTab === id ? null : id)}
                >
                    <i className={icon} aria-hidden="true" />
                    <span>{label}</span>
                </button>
            ))}
        </nav>
    )
}

export default MobileNav
