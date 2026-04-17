import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/authContext'
import { SongContextProvider } from './features/song/song.context'

function App() {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
