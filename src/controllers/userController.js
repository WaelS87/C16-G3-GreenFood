const {loadUsers} = require("../data/productsModule");

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
    profile : (req,res) => {
        const users = loadUsers(); 
        const user = users.find(user => user.Category === req.params.Category)
       
        return res.render("users/profile", {
            title : "Perfil",
            user       
        })

    },
        
}