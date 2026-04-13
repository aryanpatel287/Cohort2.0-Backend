import React from 'react'
import AppRoutes from './AppRoutes'
import './features/shared/styles/global.scss'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { router } from './app.routes.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'
import { UserProvider } from './features/user/user.context.jsx'
import { FollowProvider } from './features/follow/follow.context.jsx'

const App = () => {
  return (
    /**
     * 1st way to implement routes by AppRoutes.jsx
     *     <AuthProvider>
     *       <AppRoutes />
     *     </AuthProvider>
     */


    /**
     * Another way to implement routes by app.routes.jsx
     */
    <AuthProvider>
      <UserProvider>
        <FollowProvider>
          <PostContextProvider>
            <RouterProvider router={router} />
          </PostContextProvider>
        </FollowProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
