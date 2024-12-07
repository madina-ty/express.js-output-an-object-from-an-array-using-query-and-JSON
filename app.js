const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 },
    { id: 2, name: 'Phone', category: 'Electronics', price: 500 },
    { id: 3, name: 'Shirt', category: 'Clothing', price: 20 },
    { id: 4, name: 'Jacket', category: 'Clothing', price: 50 },
    { id: 5, name: 'Watch', category: 'Accessories', price: 150 },
  ];

app.get('/product',(req, res) => {
    const { id, name } = req.query;
    let logMessage = '';

    if(id) {
        const product = products.find(p => p.id == id);
        if(product) {
            logMessage = `Product found: ID = ${id}, Name = ${product.name}`; 
            fs.appendFileSync('product_log.txt', logMessage + '\n');
            return res.json(product);
        }
        logMessage = `Product not found with ID = ${id}`;
        fs.appendFileSync('product_log.txt', logMessage + '\n');
        return res.status(404).json({message:'Product not found'});
    } 

    if(name) {
        const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
        if(product) {
            logMessage = `Product found: Name = ${name}, ID = ${product.id}`;
            fs.appendFileSync('product_log.txt', logMessage + '\n');
            return res.json(product);
        }
        logMessage = `Product not found with Name = ${name}`;
        fs.appendFileSync('product_log.txt', logMessage + '\n');
        return res.status(404).json({message:'Product not found'});
    }
    logMessage = 'All products were listed';
    fs.appendFileSync('product_log.txt', logMessage + '\n');
    res.json(products);
});
app.listen(port,()=> {
    console.log('Server is running on http://localhost:3000');
})