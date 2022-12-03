import React from 'react'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import {Root} from '../components/Root'


const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>

      </Route>

    )
)

export const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}
