const db = require('../../database/models');
module.exports = {
    all : async(req,res)=>{
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
    },
    detail: async (req, res) => {
        /* OPTIONS DEFAULT */
        let options = {
          include: [
            {
              association: "images",
              attributes: {
              
                exclude: ["createdAt", "updatedAt", "deletedAt", "productId"],
              
              },
            },
            {
              association: "category",
              attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["updatedAt", "deletedAt", "createdAt"],
          },
        };
    
        try {
          const idProduct = req.params.id;
    
          if (isNaN(idProduct)) {
            return sendJsonError("El parámetro es invalido", res);
          }
    
          const product = await db.Product.findByPk(idProduct, options);
    
          if (!product) {
            return sendJsonError("El producto solicitado no existe", res, 404);
          }
    
          return res.status(200).json({
            ok: true,
            status: 200,
            data: product,
          });
        } catch (error) {
          sendJsonError(error, res);
        }
      }
       
      
}