import { Router } from "express";
import { createBill } from "./bill.controller.js";
import { validateJWT } from "../middlewares/validar-jwt.js";
import { esClienteRole } from "../middlewares/validar-role.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        //esClienteRole,
    ], createBill);

export default router;