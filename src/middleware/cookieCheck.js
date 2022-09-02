module.exports = (req, res, next) => {
    if(req.cookies.greenFood){
        req.session.userLogin = req.cookies.greenFood
    }
    next()
}
