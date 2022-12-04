const db = require('../../database/models');
module.exports = {
    total : async(req,res)=>{
        try {
            const totalProducts = await db.Product.count()
            return res.status(200).json({
                ok:true,
                data:{
                    totalProducts
                }
            })
            
        } catch (error) {
            return res.status(error.status||500).json({
                ok:false,
                msg: error.msg || 'comunicat con el admin del la pagina'
            })
            
        }
    }
       
      
}