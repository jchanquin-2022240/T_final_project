import Category from './category.model.js';

export const productPost = async (req, res) => {
    const { nombre, descripcion} = req.body;
    const category = new Category ({nombre, descripcion })

    await category.save();

    res.status(200).json({
        category
    });
}


export const listCategory = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { categoryEstado: true };
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        msg: 'List of categories: ',
        total,
        categories
    });
}

