const session = require("express-session")
const { loadUsers, storeUsers } = require('../data/usersModule')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


module.exports = {
    login: (req, res) => {
        return res.render("users/login", {
            title: "Ingresar"
        })

        //SESSION
        /* let {Id, Nombre, Category, image} = loadUsers().find(user => user.email === req.body.email);

        req.session.userLogin ={
            Id,
            username,
            Nombre,
            Category,
            image
        } */

        //COOKIES
      /*   if(req.body.recordame){
            res.cookie("greenFood", req.ingresar,{
            maxAge : 1000 * 60
        }) */
    },
    register: (req, res) => {
        return res.render("users/registrar", {
            title: "Registro"
        })
    },
    profile : (req,res) => {
        const users = loadUsers(); 
        const user = users.find(user => user.Id === +req.params.Id)
       
        return res.render("users/profile", {
            title : "Perfil",
            user     
        })
    },
        
        
    condiciones: (req, res) => {
        return res.render('users/condiciones', {
            title: 'condiciones'
        })
    },

    
    registerNuevo: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {nombre,apellido,email,password} = req.body;
            let users = loadUsers();
    
            let newUser = {
                Id : users.length > 0 ? users[users.length - 1].Id + 1 : 1,
                Name : nombre.trim(),
                Apellido : apellido.trim(),
                Email : email.trim(),
                password : bcrypt.hashSync(password,12),
                Category : 'normal'
                
            }
    
            let usersModify = [...users, newUser];
    
            storeUsers(usersModify);
    
            return res.redirect('/users/login');
        }else{
            return res.render("users/registrar",{
                title: 'Registrar',
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    profile: (req, res) => {
        return res.render("users/profile", {
            title: "Perfil"
        })
    },
    adminProfile: (req, res) => {
        return res.render("users/adminProfile", {
            title: "Perfil Administrativo"
        })
    }/* ,
    logout : (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    } */
}
