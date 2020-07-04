import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    private middleware(): void {
        this.express.use(cors());
        this.express.use(bodyParser.json({ limit: '10mb', type: ['*/json', '*/vnd.api+json'] }));
        this.express.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    }
}

export default new App().express;