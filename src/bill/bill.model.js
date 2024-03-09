import mongoose from "mongoose";

const BillSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        },
        subTotal: {
            type: Number
        }
    }],
    total: {
        type: Number
    }
});

export default mongoose.model('Bill', BillSchema);