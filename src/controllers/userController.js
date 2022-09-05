const session = require("express-session")
const { loadUsers, storeUsers } = require('../data/usersModule')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


module.exports = {
    login: (req, res) => {
        return res.render("users/login", {
            title: "Ingresar",
            session: req.session.userLogin
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
                maxAge : 1000 * 60
            })
            
            return res.redirect("/")

        } else {

            return res.render("users/login",{
                title : "Ingresar",
                errors : errors.mapped(),
                session : req.session
            })

        }
    },

    register: (req, res) => {
        return res.render("users/registrar", {
            title: "Registro",
            session : req.session.userLogin
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
                old : req.body,
                session: req.session.userLogin
            })
        }
    },

    profile : (req,res) => {
        const users = loadUsers(); 
        const user = users.find(user => user.Id === +req.params.Id)
       
        if(req.session.userLogin){
            return res.render("users/profile", {
                title : "Perfil",
                user,
                session: req.session.userLogin
            })
        } else {
            return res.redirect("/users/login")
        }
        
    },
        
    condiciones: (req, res) => {
        return res.render('users/condiciones', {
            title: 'condiciones',
            session: req.session.userLogin
        })
    },

    logout : (req, res) => {
        req.session.destroy();
        res.cookie("greenFood", null, {maxAge: -1})
        return res.redirect('/')
    },

    update : (req,res) => {

        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            const users = loadUsers();

            const {nombre, apellido, email, constraseña, image} = req.body;

            const userModify = users.map(user => {
                if(user.id === +req.params.id){
                    return {
                        ...user,
                        nombre : nombre.trim(),
                        apellido : apellido.trim(),
                        email : email.trim(),
                        constraseña : constraseña.trim(),
                    }
                }
                return user
            })

            storeUsers(userModify)

            return res.redirect('/users/profile/' + req.params.id);
        
        } else {
            return res.redirect("/") 
            }
        }    
    }
