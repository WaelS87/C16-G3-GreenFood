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

    // traigo y desestructuro los datos que entran en registrar por body //
    adminProfile : (req,res) => {
        const users = loadUser(); 
       
        return res.render("users/adminProfile", {
            title : "Perfil Administrativo",
            users        
        })

    }
}