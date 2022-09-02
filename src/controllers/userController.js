const session = require("express-session")

module.exports = {
    login : (req,res) => {
        return res.render("users/login", {
            title : "Ingresar"
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
    register : (req,res) => {
        return res.render("users/registrar", {
            title : "Registro"
        })
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
    }/* ,
    logout : (req, res) => {
        req.session.destroy();
        return res.redirect('/')
    } */
}
