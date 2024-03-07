import { Router } from 'express';
import { check } from 'express-validator';

import {
    productPost,
    listCategory
} from './category.controller.js';

import { validarCampos } from '../middlewares/validar-campos.js';
import { validateJWT } from '../middlewares/validar-jwt.js';
import { existsCategory } from '../helpers/db-validators.js';

const router = Router();

router.get("/", validateJWT, listCategory);

router.post (
    "/",
    [
        validateJWT,
        check('nombre', "The name cannot be empty").not().isEmpty(),
        check('nombre').custom(existsCategory),
        check('descripcion', "The description cannot be empty").not().isEmpty(),
        validarCampos
    ], productPost);

export default router;