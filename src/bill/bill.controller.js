import Bill from "./bill.model.js";
import ShoppingCart from "../shoppingCart/shoppingCart.model.js";
import User from "../user/user.model.js";

export const createBill = async (req, res) => {
    const user = req.client;

    const shoppingCart = await ShoppingCart.findOne({ user: user._id });

    if (!shoppingCart) {
        return res.status(404).json({ message: "Shopping Cart not found" });
    } else {
        const bill = new Bill({
            user: user._id,
            products: shoppingCart.products,
            total: shoppingCart.total
        });

        try {
            const savedBill = await bill.save();
            res.status(201).json(savedBill);
            const id = await Bill.findOne({ user: user._id });
            await User.findByIdAndUpdate(user._id, { $push: { bill: id } });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

}
