import React from 'react'
import AppRoutes from './AppRoutes'
import './features/shared/global.scss'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { router } from './app.routes.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'

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
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
