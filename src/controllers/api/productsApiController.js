



const db = require("../../database/models");

const { sendJsonError } = require("../../helpers/sendJsonError");
module.exports = {
  list: async (req, res) => {
    try {
      const {rows:products,count} = await db.Product.findAndCountAll({
        order: ["name"],
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
     
      if (products.length) {
        return res.status(200).json({
          ok: true,
          meta: {
            total:count
          },
          data: products
        });
      }
      throw new Error({
        ok: false,
        msg: "hubo un error",
      });
    } catch (error) {
      
      return res.status(500).json({
        ok: false,
        msg: error.message
          ? error.message
          : "comunica con elcontralador del sitio",
      });
    }
  },
 /* total: async (req, res) => {
    try {
      const total = await db.Product.count();

      return res.status(200).json({
        ok: true,
        data: {
          total
        },
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },*/
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
  },
};
