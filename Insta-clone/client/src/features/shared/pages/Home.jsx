import '../styles/home.scss'
import Feed from '../../post/pages/Feed'
import Navbar from '../components/Navbar'
import Following from '../../follow/components/Following'
import Followers from '../../follow/components/Followers'
import OtherUsers from '../../user/components/OtherUsers'
import { Outlet } from 'react-router'
import FollowRequests from '../../follow/components/follow_request/FollowRequests'

const Home = () => {
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
        </main>
    )
}

export default Home
