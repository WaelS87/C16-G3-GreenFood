const path = require('path');
const multer = require('multer');
const storageImageUser = multer.diskStorage({
    destination : (req,file,callback)=>{
        callback(null,'./public/images/users')
    } ,
    filename:(req,file,callback)=>{
        callback(null,'user-'+ Date.now()+ path.extname(file.originalname))
    }
})
const uploadImageUser = multer({
    storage:storageImageUser
});
module.exports = {
    uploadImageUser

}