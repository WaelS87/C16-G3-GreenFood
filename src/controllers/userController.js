const { loadUsers, storeUsers } = require('../data/usersModule')
const {validationResult } = require('express-validator');


module.exports = {
    login: (req, res) => {
        return res.render("users/login", {
            title: "Ingresar"
        })
    },
    register: (req, res) => {
        return res.render("users/registrar", {
            title: "Registro"
        })
    },
    condiciones: (req, res) => {
        return res.render('users/condiciones', {
            title: 'condiciones'
        })
    },
    registerNuevo: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const { nombre, apellido, email, password } = req.body;
            let users = loadUsers()
            let userNew = {

                Id: users.length > 0 ? users[users.length - 1].Id + 1 : 1,
                Nombre: nombre.trim(),
                Apellido: apellido.trim(),
                Email: email.trim(),
                Password: password,
                Category: 'normal'

            }
            let userModify = [...users, userNew]
            storeUsers(userModify);
            return res.redirect('/users/login')
        }else{
            return res.render('users/registrar', {
                title: 'Registero',
                errors: errors.mapped(),
                old: req.body
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
    }
}