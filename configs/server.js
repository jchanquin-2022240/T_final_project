import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.personPath = '/api/persona';
        this.cursoPath = '/api/curso';
        this.authPath = '/api/auth';

        this.conectarDB();
        this.middlewares();
        //this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    // routes() {
    //     this.app.use(this.authPath, require('../routes/auth.routes'));
    //     this.app.use(this.personPath, require('../routes/person.routes'));
    //     this.app.use(this.cursoPath, require('../routes/course.routes'));
    // }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose y escuchando al puerto', this.port)
        });
    }
}

export default Server;