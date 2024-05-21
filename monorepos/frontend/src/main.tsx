import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Run from './Routes/Run/Run.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/run", element: <Run /> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
