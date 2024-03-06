import Router from 'express';
import check from 'express-validator';

import {
    productPost
} from './category.controller';

import { validarCampos } from '../middlewares/validar-campos';

router.post 