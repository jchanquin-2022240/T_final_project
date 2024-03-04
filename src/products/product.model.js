import mongoose from "mongoose";

export const ProductSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: [true, 'Product is required']
    },
    descripcion:{
        type: String,
        require: [true, 'Description is required']
    },
    categoria:{
        type: String,
        require: [true, 'Category is required']
    },
    precio: {
        type: Number,
        require: [true, 'Price is required']
    },
    productEstado:{
        type: Boolean,
        default: true
    }

});

export default mongoose.model('Product', ProductSchema);