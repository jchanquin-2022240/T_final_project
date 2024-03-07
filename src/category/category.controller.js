import Category from './category.model.js';

export const productPost = async (req, res) => {
    const { nombre, descripcion} = req.body;
    const category = new Category ({nombre, descripcion })

    await category.save();

    res.status(200).json({
        category
    });
}

