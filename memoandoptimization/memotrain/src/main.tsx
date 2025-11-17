import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import  { UseCallbackExample } from './useCallbackExample.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App></App>
  },
  {
    path:"/uscall",
    element: <UseCallbackExample></UseCallbackExample>,
  },
]
  
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
