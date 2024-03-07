import Product from './product.model.js';
import Category from '../category/category.model.js';

export const addProduct = async (req, res) => {
    const data = req.body;
    const category = await Category.findOne({ nombre: data.categoria });

    if (!category) {
        return res.status(400).json({ msg: 'Category not found'});
    }

    const newProduct = new Product({
        ...data,
        categoria: category._id
    });

    await newProduct.save();

    category.products.push(newProduct._id);
    await category.save();

    res.status(201).json({ msg: 'Product successfully added', newProduct});
}

export const listProduct = async (req, res) => {
    const query = {productEstado: true}

    const[total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
    ]);

    res.status(200).json({ msg: 'Product', total, product});
}

export const editProduct = async (req, res) => {
    const { nombre } = req.params;
    const {_id, ...resto} = req.body;

    const product = await Product.findOneAndUpdate({ nombre: nombre }, resto, { new: true });

    res.status(200).json({msg: 'Product successfully updated', product});
}

export const deleteProduct = async (req, res) => {
    const { nombre } = req.params;

    await Product.findOneAndUpdate({ nombre: nombre }, { productEstado: false });

    res.status(200).json({ msg: 'Product successfully removed'});
}