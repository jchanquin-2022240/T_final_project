import { Router } from "express";
import { check } from "express-validator";

import {
    adminPost,
    adminGet,
} from "./admin.controller.js";

import { 
    esRoleValido,
    existsEmailAdmin } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validateJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", validateJWT, adminGet);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 8 caracteres").isLength({min: 8}),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existsEmailAdmin),
        check("role").custom(esRoleValido),
        validarCampos,
    ], adminPost);


export default router;