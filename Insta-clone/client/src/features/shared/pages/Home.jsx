import '../styles/home.scss'
import Feed from '../../post/pages/Feed'
import Navbar from '../components/Navbar'
import Following from '../../follow/components/Following'
import Followers from '../../follow/components/Followers'
import OtherUsers from '../../user/components/OtherUsers'
import { Outlet } from 'react-router'
import FollowRequests from '../../follow/components/follow_request/FollowRequests'
import MobileNav from '../components/MobileNav'
import MobilePanel from '../components/MobilePanel'
import { useState } from 'react'

const Home = () => {
    const [activeMobileTab, setActiveMobileTab] = useState(null)

    const handleTabChange = (tab) => {
        setActiveMobileTab(tab === 'home' ? null : tab)
    }

    return (
        <main className='main'>
            <div className="left-side">
                <div className="following-list-wrapper">
                    <Following />
                </div>
                <div className="followers-list-wrapper">
                    <Followers />
                </div>
            </div>

            <div className="middle">
                <Navbar />
                <Outlet />
            </div>

            <div className="right-side">
                <div className="follow-request-list-wrapper">
                    <FollowRequests />
                </div>
                <div className="otherUsers-list-wrapper">
                    <OtherUsers />
                </div>
            </div>

            {/* Mobile-only: bottom nav + sliding panel */}
            <MobileNav
                activeTab={activeMobileTab}
                onTabChange={handleTabChange}
            />
            <MobilePanel
                activeTab={activeMobileTab}
                onClose={() => setActiveMobileTab(null)}
            />
        </main>
    )
}

export default Home
