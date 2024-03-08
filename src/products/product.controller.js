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

export const listProductByName = async (req, res) => {
    const { nombre } = req.params;

    const product = await Product.findOne({ nombre: nombre });

    res.status(200).json({ msg: 'Product', product});
}

export const listProduct = async (req, res) => {
    const { limite, desde } = req.query;

    try {
        const [total, product] = await Promise.all([
            Product.countDocuments({ productEstado: true }),
            Product.find({ productEstado: true })
                .populate('categoria', 'nombre')  // Agrega esta línea para hacer el populate del campo 'categoria' y obtener solo el campo 'nombre'
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'There was an error when obtaining the products.' });
    }
};


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

export const listProductByCategory = async (req, res) => {
    const { categoria } = req.params;

    try {
        const products = await Product.find({ categoria: categoria });

        if (products.length === 0) {
            return res.status(404).json({ msg: `No products found for category: ${categoria}` });
        }

        res.status(200).json({ msg: 'Products', products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
