import React from 'react'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import {Root} from '../components/Root'
import {Home} from '../pages/Home'
import { Products } from '../pages/Products'


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>
         <Route path='/' element={<Home/>}/>
         <Route path='/Products' element={<Products/>}/>
         <Route path='/Users' element={<Users/>}/>
      </Route>

    )
)

export const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}
