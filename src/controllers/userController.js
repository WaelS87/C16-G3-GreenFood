const session = require("express-session")
const { loadUsers, storeUsers } = require('../data/usersModule')
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');


module.exports = {
    login: (req, res) => {
        return res.render("users/login", {
            title: "Ingresar"
        })
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let {id, Category} = loadUsers().find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
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
                id : users.length > 0 ? users[users.length - 1].Id + 1 : 1,
                nombre : nombre.trim(),
                apellido : apellido.trim(),
                email : email.trim(),
                constraseña : bcryptjs.hashSync(password,12),
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
        const user = users.find(user => user.id === +req.params.id)
       
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
    },

    update : (req,res) => {

        const errors = validationResult(req)
        

        if(errors.isEmpty()){
            const users = loadUsers();

            const {nombre, apellido, email, password, nombreUsuario, image} = req.body;

            const userModify = users.map(user => {
                if(user.id === +req.params.id){
                    return {
                        ...user,
                        nombre : nombre.trim(),
                        apellido : apellido.trim(),
                        nombreUsuario: nombreUsuario.trim(),
                        email : email.trim(),
                        /* contraseña : bcryptjs.hashSync(password,12) */
                    }
                }
                return user
            })

            storeUsers(userModify)

            return res.redirect('/users/profile/' + req.params.id);
        
        } else {
            const users = loadUsers(); 
            const user = users.find(user => user.id === +req.params.id)

            return res.render("users/profile", {
                title : "Perfil",
                errors : errors.mapped(),
                user
            })
        }
    }    
}
