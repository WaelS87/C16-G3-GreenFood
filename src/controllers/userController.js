const session = require("express-session")
const { loadUsers, storeUsers } = require('../data/usersModule')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


module.exports = {
    login: (req, res) => {
        return res.render("users/login", {
            title: "Ingresar"
        })
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let {Id, Category} = loadUsers().find(user => user.Email === req.body.email);

            req.session.userLogin = {
                Id,
                Category
            }

            res.cookie("greenFood", req.session.userLogin,{
                maxAge : 1000 * 30
            })
            
            return res.redirect("/")

        } else {

            return res.render("users/login",{
                title : "Ingresar",
                errors : errors.mapped()
            })

        }
    },

    register: (req, res) => {
        return res.render("users/registrar", {
            title: "Registro"
        })
    },

    
    registerNuevo: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {nombre,apellido,email,password} = req.body;
            let users = loadUsers();
    
            let newUser = {
                Id : users.length > 0 ? users[users.length - 1].Id + 1 : 1,
                Nombre : nombre.trim(),
                Apellido : apellido.trim(),
                Email : email.trim(),
                Constraseña : bcrypt.hashSync(password,12),
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

    profile : (req,res) => {
        const users = loadUsers(); 
        const user = users.find(user => user.Id === +req.params.Id)
       
        if(req.session.userLogin){
            return res.render("users/profile", {
                title : "Perfil",
                user
            })
        } else {
            return res.redirect("/users/login")
        }
        
    },
        
    condiciones: (req, res) => {
        return res.render('users/condiciones', {
            title: 'condiciones'
        })
    },

    logout : (req, res) => {
        req.session.destroy();
        res.cookie("greenFood", null, {maxAge: -1})
        return res.redirect('/')
    }
}
