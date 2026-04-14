import React from 'react'
import '../styles/mobile-panel.scss'
import Following from '../../follow/components/Following'
import Followers from '../../follow/components/Followers'
import OtherUsers from '../../user/components/OtherUsers'
import FollowRequests from '../../follow/components/follow_request/FollowRequests'

//Learned the new things here 

const PANEL_MAP = {
    following: <Following />,
    followers: <Followers />,
    discover: <OtherUsers />,
    requests: <FollowRequests />,
}

const MobilePanel = ({ activeTab, onClose }) => {
    if (!activeTab || activeTab === 'home' || !PANEL_MAP[activeTab]) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="mobile-panel-overlay"
                onClick={onClose}
                aria-hidden="true"
            />
            {/* Sliding sheet */}
            <div
                className="mobile-panel"
                role="dialog"
                aria-modal="true"
                aria-label={activeTab}
            >
                <div className="panel-drag-handle" aria-hidden="true" />
                {PANEL_MAP[activeTab]}
            </div>
        </>
    )
}

export default MobilePanel
