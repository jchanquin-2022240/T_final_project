import mongoose from 'mongoose';

export const ShoppingCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
        },
        subTotal: {
            type: Number,
        }
    }],
    total: {
        type: Number,
        default: 0,
    }
});

export default mongoose.model('ShoppingCart', ShoppingCartSchema);