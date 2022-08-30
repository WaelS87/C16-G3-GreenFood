const {loadUsers,storeUsers} = require('../data/usersModule')
//const {validationResult} =require('express-validator');


module.exports = {
    login : (req,res) => {
        return res.render("users/login", {
            title : "Ingresar"
        })
    },
    register : (req,res) => {
        return res.render("users/registrar", {
            title : "Registro"
        })
    },
    condiciones : (req,res)=>{
        return res.render('users/condiciones',{
            title : 'condiciones'
        })
    },
    registerNuevo : (req,res)=>{
       
        const {fullname,email,password} = req.body;
        let users = loadUsers()
        let userNew = {
            id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
            fullname : fullname.trim(),
            email : email.trim(),
            password : password

        }
        let userModify = [...users,userNew]
        storeUsers(userModify);
        return res.redirect('/users/login')
    },
    profile : (req,res) => {
        return res.render("users/profile", {
            title : "Perfil"
        })
    },
    adminProfile : (req,res) => {
        return res.render("users/adminProfile", {
            title : "Perfil Administrativo"
        })
    }
}