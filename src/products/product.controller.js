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

export const editProduct = async (req, res) => {
    const { nombre } = req.params;
    const {_id, ...resto} = req.body;

    const product = await Product.findOneAndUpdate({ nombre: nombre }, resto, { new: true });

    //await Product.findByIdAndUpdate(id, resto);

    //const product = await Product.findOne({_id: id});

    res.status(200).json({msg: 'Product successfully updated', product});
}