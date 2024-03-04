import { Server } from 'azle';
import express, { Request } from 'express';
import cors from 'cors';
import { categoryStorage, tokenStorage, usersStorage } from './db/data';
import UserCreateRequestDTO from './dto/request/user.create.dto';
import UserLoginRequestDTO from './dto/request/user.login.dto';
import { createUser, loginUser } from './service/user.service';
import { authenticateToken } from './service/user_token.service';
import { createCategory, seedCategory } from './service/category.service';
import Category from './model/category';


export default Server(() => {
    const app = express();

    app.use(cors())
    app.use(express.json());

    seedCategory();



    // auth
    app.post('/register', async (req: Request<UserCreateRequestDTO, any, any>, res) => {
        createUser(req, res);
    });

    app.post('/login', async (req: Request<UserLoginRequestDTO, any, any>, res) => {
        loginUser(req, res);
    });


    app.get("/authenticate", (req: Request<any, any, any>, res) => {
        authenticateToken(req, res);
    });


    app.get("/category", (_, res) => {
        res.json(categoryStorage.values());
    });

    app.post("/category", (req, res) => {
        createCategory(req, res);
    });






    // testing purpose
    app.get("/user", (_, res) => {
        res.json(usersStorage.values());
    });

    app.get("/token", (_, res) => {
        res.json(tokenStorage.values());
    });


    app.get('/ping', (req, res) => {
        res.json({ message: 'pong' })
    });



    app.use(express.static('/dist'));

    return app.listen();
});
