const fs = require('fs');
const path = require('path');

const loadProducts = () => {
    const productsFilePath = path.join(__dirname, '../data/products.json');
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    return products
}

const storeProducts = (products) => {
    fs.writeFileSync(path.join(__dirname, "products.json"), JSON.stringify(products, null, 3), "utf-8")
}

const loadUsers = () => { 
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'),'utf-8'));
}

module.exports = {
    loadProducts,
    storeProducts,
    loadUsers
}