import '../styles/home.scss'
import Feed from '../../post/pages/Feed'
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <main className='main'>
            <Navbar />
            <Feed />
        </main>
    )
}

export default Home
