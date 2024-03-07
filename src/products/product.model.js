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
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    precio: {
        type: Number,
        require: [true, 'Price is required']
    },
    stock:{
        type: Number,
        require: [true, 'Stock is required']
    },
    productEstado:{
        type: Boolean,
        default: true
    }

});

export default mongoose.model('Product', ProductSchema);