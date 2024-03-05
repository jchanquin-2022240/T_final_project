import { Router } from 'express';
import { check } from 'express-validator';

import {
    addProduct
} from "./product.controller.js";

import { validarCampos  } from "../middlewares/validar-campos.js";

import  { validateJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("nombre", "The name canoot be empty").not().isEmpty(),
        check("descripcion", "The description cannot be empty").not().isEmpty(),
        check("categoria", "The category cannot be empty").not().isEmpty(),
        check("precio", " The price cannot be empty").not().isEmpty().isNumeric(),
        validarCampos,
    ], addProduct);


export default router;