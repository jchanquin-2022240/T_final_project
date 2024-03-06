import { Router } from 'express';
import { check } from 'express-validator';

import {
    addProduct,
    listProduct,
    editProduct,
    deleteProduct
} from "./product.controller.js";

import { validarCampos  } from "../middlewares/validar-campos.js";

import  { validateJWT } from "../middlewares/validar-jwt.js";
import { existingName} from "../helpers/db-validators.js";

const router = Router();

router.get("/", validateJWT, listProduct);

router.post(
    "/",
    [
        validateJWT,
        check("nombre", "The name canoot be empty").not().isEmpty(),
        check("nombre").custom(existingName),
        check("descripcion", "The description cannot be empty").not().isEmpty(),
        check("categoria", "The category cannot be empty").not().isEmpty(),
        check("precio", " The price cannot be empty").not().isEmpty().isNumeric(),
        validarCampos,
    ], addProduct);

router.put(
    "/updateProduct/:nombre",
    [
        validateJWT,
        check('nombre', "Invalid").notEmpty(),
        validarCampos
    ], editProduct);

router.delete(
    "/deleteProduct/:nombre",
    [
        validateJWT,
        check('nombre', "Invalid").notEmpty(),
        validarCampos
    ], deleteProduct);

export default router;