import mongoose from "mongoose";

export const CategorySchema = mongoose.Schema({
    nombre:{
        type: String,
        require: [true, 'Name is required']
    },
    descripcion:{
        type: String,
        required: [true, 'Description is required']     
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    categoryEstado:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Category', CategorySchema); 