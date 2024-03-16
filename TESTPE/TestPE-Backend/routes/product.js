//import express module
import express from 'express';

//import TẤT CẢ các model
import Product from "../models/product.js";
import Category from '../models/category.js';

//định nghĩa router
const productRouter = express.Router();

//GET ALL PRODUCTS
productRouter.get('/', async (req, res, next) => {
    try {
        const products = await Product.find({}).populate('category').exec();
        if (!products) {
            return res.status(404).send({ message: 'Products not found!' });
        }
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// GET PRODUCT BY ID (nếu dùng cái này thì không dùng cái dưới)
productRouter.get('/:id', async (req, res, next) => {
    try {
        const product = await Product.find(req.params.id).populate('category').exec();
        if (!product) {
            return res.status(404).send({ message: 'Product not found!' });
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

//CREATE PRODUCT (nếu dùng cái này thì không dùng cái trên)
productRouter.get('/:name', async (req, res, next) => {
    try {
        const product = await Product.findOne({ name: req.params.name }).populate('category').exec();
        if (!product) {
            return res.status(404).send({ message: 'Product not found!' });
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

//CREATE PRODUCT
productRouter.post('/', async (req, res, next) => {
    try {
        const { name, price, description, images, comments, category } = req.body;
        const existedProduct = await Product.findOne({ name: name });
        if (existedProduct) {
            return res.status(400).send({ message: 'Product is existed!' });
        }
        const newProduct = new Product({
            name,
            price,
            description,
            images,
            comments,
            category
        });
        const result = await newProduct.save();
        res.status(201).json({ message: 'Product created!', data: result });
    } catch (err) {
        next(err);
        // res.status(500).send({ message: err.message });
    }
});

//UPDATE PRODUCT
productRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, description, images, comments, category } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found!' });
        }
        product.name = name ? name : product.name;
        product.price = price ? price : product.price;
        product.description = description ? description : product.description;
        product.images = images ? images : product.images;
        product.comments = comments ? comments : product.comments;
        product.category = category ? category : product.category;
        const result = await product.save();
        res.status(200).json({ message: 'Product updated!', data: result });
    } catch (err) {
        next(err);
        // res.status(500).send({ message: err.message });
    }
});

// DELETE PRODUCT
productRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found!' });
        }
        res.status(200).json({ message: `Product ${product.name} deleted!` });
    } catch (err) {
        next(err);
    }
});

export default productRouter;