'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import adminRoutes from '../src/admin/admin.routes.js';
import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/management/v1/admin';
        this.userPath = '/management/v1/user';
        this.authPath = '/management/v1/auth';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
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
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose y escuchando al puerto', this.port)
        });
    }
}

export default Server;