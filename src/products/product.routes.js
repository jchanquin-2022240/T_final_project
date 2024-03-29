import { Router } from 'express';
import { check } from 'express-validator';

import {
    addProduct,
    listProduct,
    editProduct,
    deleteProduct,
    listProductByName,
    soldOut,
    mostSoldProduct
} from "./product.controller.js";

import { validarCampos } from "../middlewares/validar-campos.js";
export { esAdminRole, esClienteRole } from "../middlewares/validar-role.js";

import  { validateJWT } from "../middlewares/validar-jwt.js";
import { existingName, existsCategoryName } from "../helpers/db-validators.js";
import { esAdminRole } from '../middlewares/validar-role.js';

const router = Router();

router.get("/", validateJWT, listProduct);

router.get("/:nombre", validateJWT, listProductByName);

router.get("/filterByCategory/:categoria", validateJWT, listProduct);

router.get("/soldOut", soldOut);

router.get("/mostSoldProduct", mostSoldProduct);

router.post(
    "/",
    [
        validateJWT,
        esAdminRole,
        check("nombre", "The name cannot be empty").not().isEmpty(),
        check("nombre").custom(existingName),
        check("descripcion", "The description cannot be empty").not().isEmpty(),
        check("categoria").custom(existsCategoryName),
        check("precio", " The price cannot be empty").not().isEmpty().isNumeric(),
        check("stock", "El estock no puede estar vacío").not().isEmpty(),
        validarCampos,
    ], addProduct);

router.put(
    "/updateProduct/:nombre",
    [
        validateJWT,
        esAdminRole,
        check('nombre', "Invalid").notEmpty(),
        validarCampos
    ], editProduct);

router.delete(
    "/deleteProduct/:nombre",
    [
        validateJWT,
        esAdminRole,
        check('nombre', "Invalid").notEmpty(),
        validarCampos
    ], deleteProduct);

export default router;