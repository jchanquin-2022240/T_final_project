import { Router } from 'express';
import { check } from 'express-validator';
import { addShoppingCart } from './shoppingCart.controller';

const router = Router();

router.post(
    "/add",
    [
        check("id", "Id is required").not().isEmpty(),
        check("nombre", "Name is required").not().isEmpty(),
        check("quantity", "Quantity is required").not().isEmpty(),
    ], addShoppingCart);

export default router;