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

export const updateCategory = async (req, res) => {
    const { nombre } = req.params;
    const { _id, name, categoryEstado, ...resto } = req.body;

    const category = await Category.findOneAndUpdate({nombre: nombre}, resto);

    res.status(200).json({
        msg: 'Category updated',
        category
    });
}

export const deleteCategory = async (req, res) => {
    const { nombre } = req.params;

    const category = await Category.findOneAndUpdate({ nombre: nombre }, { categoryEstado: false});

    res.status(200).json({
        msg: 'Category deleted',
        category
    });
}
