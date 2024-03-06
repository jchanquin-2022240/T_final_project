import Category from './category.model';

export const productPost = async (req, res) => {
    const { nombre, descripcion, products} = req.body;
    const category = new Category ({nombre, descripcion, products, })

    await category.save();

    res.status(200).json({
        category
    });
}

