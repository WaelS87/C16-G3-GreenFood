import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <ul className ="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

       
    <link className ="sidebar-brand" to="/">
        <div className ="sidebar-brand-icon">
            <img className ="w-100" src="/images/img.png" alt="logo GreenFood"/>
        </div>
    </link>

   
    <hr className ="sidebar-divider my-0"/>


    <li className ="nav-item active">
        <link className ="nav-link" to="/">
            <i className ="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - Green Food</span></link>
    </li>

  
    <hr className ="sidebar-divider"/>

   
    <div className ="sidebar-heading">Actions</div>

   
    <li className ="nav-item">
        <link className ="nav-link collapsed" to="/products">
            <i className ="fas fa-fw fa-folder"></i>
            <span>Productos</span>
        </link>
    </li>

   
    <li className ="nav-item">
        <link className ="nav-link" to="/">
            <i className ="fas fa-fw fa-chart-area"></i>
            <span>Usuarios</span></link>
    </li>

    
    <li className ="nav-item">
        <link className ="nav-link" to="/categories">
            <i className ="fas fa-fw fa-table"></i>
            <span>Categorias</span></link>
    </li>

    <hr className ="sidebar-divider d-none d-md-block"/>
</ul>
  )
}

export default SideBar
