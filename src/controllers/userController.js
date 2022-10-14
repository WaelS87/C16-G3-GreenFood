const session = require("express-session")
const { loadUsers, storeUsers } = require('../data/usersModule')
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const db = require('../database/models');


module.exports = {
    
    register: (req, res) => {
        return res.render("users/registrar", {
            title: "Registro"
        })
    },

    registerNuevo: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const { nombre, apellido, email, password } = req.body;
            let users = loadUsers();

            let newUser = {
                name : nombre.trim(),
                surname : apellido.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password,12),
                rolId : 2
            }
            
            let usersModify = [...users, newUser];
            
            storeUsers(usersModify);
            
            return res.redirect('/users/login');
        } else {
            return res.render("users/registrar", {
                title: 'Registrar',
                errors : errors.mapped(),
                old : req.body
            })
        }
    },

    login: (req, res) => {
        return res.render("users/login", {
            title: "Ingresar"
        })
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            
            /* let {id, category} = loadUsers().find(user => user.email === req.body.email); */

            db.User.findOne({
                where : {
                    email: req.body.email.trim()
                }
            })
                .then(({id, rolId, name, surname, username, password, email}) => {

                    req.session.userLogin = {
                        id,
                        rolId,
                        name,
                        surname,
                        username,
                        password,
                        email
                    }
        
                    res.cookie("greenFood", req.session.userLogin,{
                        maxAge : 1000 * 600
                    })
                    
                    return res.redirect("/")

                })
                .catch(error => console.log(error))

        } else {
            return res.render("users/login",{
                title : "Ingresar",
                errors : errors.mapped()
            })
        }

    },

    profile : (req,res) => {
       /*  const users = loadUsers(); 
        const user = users.find(user => user.id === +req.params.id)
       
        if(req.session.userLogin){
            return res.render("users/profile", {
                title : "Perfil",
                user
            })
        } else {
            return res.redirect("/users/login")
        }
        
    }, */
    const user = req.session.userLogin;

    if(req.session.userLogin){

    return res.render('users/profile', {
            title: "Perfil",
            user,
        })

    } else {
    return res.redirect("users/login")
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
                        contraseña : bcryptjs.hashSync(password,12)
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
   
