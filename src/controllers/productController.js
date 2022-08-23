const {loadProducts, storeProducts} = require("../data/productsModule")

const toThousand = n => n.toString().replace((/\B(?=(\d{3})+(?!\d))/g, "."));


module.exports = {
    index: (req, res) => {
		const products= require('../data/products.json')
		return res.render('products/products',{
		   products,
           toThousand
		})

	},
    detail : (req,res) => {
        const products = loadProducts()
		const product = products.find(product => product.id === +req.params.id)
        return res.render("products/detalleProducto",{
            title : "Detalle del producto",
			product,
			toThousand
		})
    },
    carrito : (req,res) => {
        return res.render("products/carrito",{
            title : "Carrito"
        })
    },
    addProduct : (req,res) => {
        const products = loadProducts()
        return res.render("products/addProduct",{
            title : "Agregar producto",
            products
        })
    },
    store : (req,res) => {

        const {title, price, discount, description, category} = req.body

		const products = loadProducts()

		const newProduct = {
			id : (products[products.length -1].id + 1),
			title : title.trim(),
			description : description.trim(),
			price : +price,
			discount : +discount, 
			image : "defaul-image.png",
			category
		}

		const productsModify = [...products, newProduct]

		storeProducts(productsModify);

		return res.redirect("/")
    },
    selectDelete : (req,res) =>{
        const products= loadProducts()
        return res.render('products/deleteProducts',{
            products
        })

    },
    deleteProduct:(req,res) => {

        const productId = +req.body.id
        const products= loadProducts()
        const productModify = products.filter(product=>product.id !== productId) 
        storeProducts(productModify)
        return res.redirect('../../products/products')
    },
    select : (req,res) => {
        const products = loadProducts()
        return res.render("products/editProduct-selector", {
            title : "Selección de producto",
            products
        })
    },
    selected : (req,res) => {

        const productId = +req.body.id
        return res.redirect(productId)

    },

    editProduct : (req,res) => {
        const products = loadProducts()
		const product = products.find(product => product.id === +req.params.id)
        return res.render("products/editProduct", {
            title : "Editar producto",
			product
		})
    },
    update : (req,res) => {
        const products = loadProducts();

        const {title, price,discount, description, category, image} = req.body;

        const productModify = products.map(product => {
            if(product.id === +req.params.id){
                return {
                    ...product,
                    title : title.trim(),
                    description : description.trim(),
                    price : +price*130,
                    discount : +discount,
                    category : category.trim()
                }
            }
            return product
        })

        storeProducts(productModify)

        return res.redirect('/products/detalleProducto/' + req.params.id);
    }
}
