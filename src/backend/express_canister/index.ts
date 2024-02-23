import { Server } from 'azle';
import express, { Request } from 'express';

// const cors = require('cors');
// const cookieSession = require("cookie-session");


export default Server(() => {
    const app = express();

    app.use(express.json());

    app.get('/ping', (req, res) => {
        res.json({ message: 'pong' })
    });

    app.post('/v1/auth/signup', (req, res) => {

        // `"email": string,`
        // `"full_name": string,`
        // `"password": string,`
        // "confirm_password": string

        //response 201
        //response 401

    });

    app.post('/v1/auth/sign-in', (req, res) => {


        //response 201 token {}
        //response 401

    
    });



    app.use(express.static('/dist'));

    return app.listen();
});
