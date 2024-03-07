import { Router } from 'express';
import { check } from 'express-validator';

import {
    productPost,
    listCategory,
    updateCategory,
    deleteCategory
} from './category.controller.js';

import { validarCampos } from '../middlewares/validar-campos.js';
import { validateJWT } from '../middlewares/validar-jwt.js';
import { existsCategoryName } from '../helpers/db-validators.js';

const router = Router();

router.get("/", validateJWT, listCategory);

router.post (
    "/",
    [
        validateJWT,
        check('nombre', "The name cannot be empty").not().isEmpty(),
        check('nombre').custom(existsCategoryName),
        check('descripcion', "The description cannot be empty").not().isEmpty(),
        validarCampos
    ], productPost);

router.put (
    "/updateCategory/:nombre",
    [
        validateJWT,
        check('nombre', "The name cannot be empty").not().isEmpty(),
        validarCampos
    ], updateCategory);

router.delete( 
    "/deleteCategory/:nombre",
    [
        validateJWT,
        check('nombre', "The name cannot be empty").not().isEmpty(),
        validarCampos
    ], deleteCategory);

    export default router;

