import { Router } from 'express';
import { check } from 'express-validator';
import { addShoppingCart } from './shoppingCart.controller.js';
import { validateJWT } from '../middlewares/validar-jwt.js';
import { esClienteRole } from '../middlewares/validar-role.js';

const router = Router();

router.post(
    "/add",
    [
        validateJWT,
        esClienteRole,
        check("id", "Id is required").not().isEmpty(),
        check("nombre", "Name is required").not().isEmpty(),
        check("quantity", "Quantity is required").not().isEmpty(),
    ], addShoppingCart);

export default router;