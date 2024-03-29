'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import adminRoutes from '../src/admin/admin.routes.js';
import userRoutes from '../src/user/user.routes.js';
import productRoutes from '../src/products/product.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categoryRoutes from '../src/category/category.routes.js';
import shoppingCartRoutes from '../src/shoppingCart/shoppingCart.routes.js';
import billRoutes from '../src/bill/bill.routes.js';
import { newAdmin } from '../src/admin/admin.controller.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/management/v1/admin';
        this.userPath = '/management/v1/user';
        this.authPath = '/management/v1/auth';
        this.categoryPath = '/management/v1/category';
        this.productPath = '/management/v1/product';
        this.shoppingCartPath = '/management/v1/shoppingCart';
        this.billPath = '/management/v1/bill';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
        await newAdmin();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.shoppingCartPath, shoppingCartRoutes);
        this.app.use(this.billPath, billRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose y escuchando al puerto', this.port)
        });
    }
}

export default Server;