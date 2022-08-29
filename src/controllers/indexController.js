const {loadProducts, storeProducts} = require("../data/productsModule")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    
    home :  (req,res) => {
        const products = loadProducts()
        res.render('home', { 
            products,
            title : "home"
         })

    }
}