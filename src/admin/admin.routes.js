import { Router } from "express";
import { check } from "express-validator";

import {
    adminPost,
} from "./admin.controller.js";


import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router;

router.post(
    "/:id",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty,
        check("password", "El password debe ser mayor a 8 caracteres").isLength({min: 8}),
        check("correo", "Este no es un correo válido").isEmail(),
        check("role").custom(esRoleValido),
        validarCampos,
    ], adminPost);


export default router;