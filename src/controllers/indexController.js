const {loadProducts, storeProducts} = require("../data/productsModule")
const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    
    home : (req,res) => {
        db.Product.findAll({
            include:['images','category']
        })
        .then(products => {
            return res.render('home', { 
                products,
                title : "Home"
            })
        })
        .catch((error)=>console.log(error))
    }
}