import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Publish from './pages/Publish'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gallery/:locationId', element: <Gallery /> },
      { path: 'publish', element: <Publish /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
