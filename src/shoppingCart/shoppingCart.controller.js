import ShoppingCart from "./shoppingCart.model.js";
import Product from "../products/product.model.js";

export const addShoppingCart = async (req, res) => {
    try {
        const cliente = req.client._id;
        let cart = await ShoppingCart.findOne({ user: cliente });

        const { nombre, quantity } = req.body;
        const product = await Product.findOne({ nombre });

        if(!product) return res.status(404).send("Product not found");

        if(product.stock < quantity) return res.status(400).send("Insufficient stock");

        if(!cart){
            const subTotal = product.precio * quantity;
            const total = subTotal;
            const shoppingCart = new ShoppingCart({
                user: cliente, 
                products: [{ 
                productId: product._id, quantity: quantity, subTotal: subTotal 
                }], total: total });
                
                if (product.stock === 0) {
                    product.productEstado = false;
                }

                await product.save();
                await shoppingCart.save();
                return res.status(201).send("Product added to shopping cart");
        }

        const subTotal = product.precio * quantity;
        cart.products.push({ productId: product._id, quantity: quantity, subTotal: subTotal });
        const total = cart.products.reduce((acc, product) => acc + product.subTotal, 0);

        cart.total = total;
        product.stock -= quantity;
        product.tiempoCompra += quantity;

        if (product.stock === 0) {
            product.productEstado = false;
        }

        await product.save();
        await cart.save();

        res.status(201).send("Product added to shopping cart");

    }catch(err){
        console.error(err);
        res.status(500).send("Error adding product to shopping cart");
    }
}