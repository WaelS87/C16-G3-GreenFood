import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SideBar from './SideBar'
import TopBar from './TopBar'


export const Root = () => {
  return (
    <div id="wrapper">

    <SideBar/>
    
    <div id="content-wrapper" className ="d-flex flex-column">

       
        <div id="content">

            <TopBar/>
           
            <Outlet/>
           
            
        </div>
       
        <Footer/>
     
    </div>
   

</div>
  )
}
