
import { createBrowserRouter } from 'react-router'
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Protected from './features/auth/components/Protected'
import HomePage from './features/home/pages/HomePage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Protected><HomePage /></Protected>
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    }
])

