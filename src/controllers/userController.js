module.exports = {
    login : (req,res) => {
        return res.render("users/login")
    },
    register : (req,res) => {
        return res.render("users/registrar")
    },
    profile : (req,res) => {
        return res.render("users/profile")
    },

    // traigo y desestructuro los datos que entran en registrar por body //
    adminProfile : (req,res) => {
        //const {nombre,email,password} = req.body
        //const users = require("")
        
        return res.render("users/adminProfile")
    }
}