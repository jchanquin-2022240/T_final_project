import { Router } from 'express';
import { check } from 'express-validator';

import {
    userPost,
} from "./user.controller.js";

import {
    esRoleValido,
    existsEmailClient
} from "../helpers/db-validators.js";
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 8 caracteres").isLength({ min: 8 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existsEmailClient),
        check("role").custom(esRoleValido),
        validarCampos
    ], userPost);

export default router;