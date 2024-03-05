import Product from './product.model.js';

export const addProduct = async (req, res) => {
    const{ nombre, descripcion, categoria, precio} = req.body;
    const product = new Product( {nombre, descripcion, categoria, precio});

    await product.save();

    res.status(200).json({ msg: 'Product was added successfully!!!', product });
}

export const listProduct = async (req, res) => {
    const query = {productEstado: true}

    const[total, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
    ]);

    res.status(200).json({ msg: 'Product', total, product});
}