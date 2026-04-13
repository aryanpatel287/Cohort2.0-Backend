import React, { useEffect, useState } from 'react'
import '../styles/active-user.scss'
import { useUser } from '../hooks/useUser'
import { useNavigate } from 'react-router'

const ActiveUser = () => {
    const { handleGetMe, user, loading } = useUser()
    const navigate = useNavigate()
    const [isAuthCheckDone, setIsAuthCheckDone] = useState(false)

    useEffect(() => {
        const runInitialAuthCheck = async () => {
            await handleGetMe()
            setIsAuthCheckDone(true)
        }

        runInitialAuthCheck()
    }, [])

    useEffect(() => {
        if (isAuthCheckDone && !loading && !user) {
            navigate('/login', { replace: true })
        }
    }, [isAuthCheckDone, loading, user, navigate])

    if (!isAuthCheckDone || loading || !user) {
        return (
            <div className='active-user active-user--loading' aria-label='Active user'>
                <div className='avatar'></div>
            </div>
        )
    }

    return (
        <div
            onClick={()=>navigate('user/' + user.username)}
            className='active-user active-user--loaded' aria-label='Active user'>
            <img
                src={user.profileImage || 'https://ik.imagekit.io/ji8wynr3i/userImage.avif?updatedAt=1773483702680'}
                className='avatar'
                alt='active-user'
            />
        </div>
    )
}

export default ActiveUser