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