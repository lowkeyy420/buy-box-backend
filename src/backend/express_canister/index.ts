import { Server } from 'azle';
import express, { Request } from 'express';
import db from './models';
const cors = require('cors');
const cookieSession = require("cookie-session");


export default Server(() => {
    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use(
        cookieSession({
          name: "bezkoder-session",
          keys: ["test"], // should use as secret environment variable
          httpOnly: true,
        })
      );

    db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop and Resync Db');
        db.user.create({})
    });

    app.get('ping', (req, res) => {
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
