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
    adminProfile : (req,res) => {
        return res.render("users/adminProfile")
    }
}