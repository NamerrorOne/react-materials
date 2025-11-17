import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, Link, NavLink, Outlet, RouterProvider } from 'react-router'
import NoContext from './pages/NoContext.tsx'
import ContextExample from './pages/ContextExample.tsx'

const Layout = () => (
    <>
      <header>
        <nav>
          <NavLink  className={({ isActive }) => (isActive ? 'active' : undefined)} to="/">NoContext</NavLink> |{" "}
           <NavLink  className={({ isActive }) => (isActive ? 'active' : undefined)} to="/context">Context</NavLink> |{" "}
            <NavLink  className={({ isActive }) => (isActive ? 'active' : undefined)} to="/best">BestPractices</NavLink> |{" "}
        </nav>
        <main>
           <Outlet></Outlet>
        </main>
      </header>
    </>
)




const router = createBrowserRouter([{path: "/" , element: <Layout></Layout>, children: [{index: true,element: <NoContext></NoContext>}, {path: "/context", element: <ContextExample/>}]}, {path: "*", element: <div>
  <Link to={"/"}>go back !</Link>
</div>}]);

createRoot(document.getElementById('root')!).render(


  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
