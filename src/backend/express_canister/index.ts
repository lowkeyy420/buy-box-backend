import { Canister, Server, StableBTreeMap, ic, init, text } from 'azle';
import express, { Request } from 'express';
import cors from 'cors';

import { createUser, findByEmail } from './service/user.service';
import { usersStorage } from './db/data';
import User from './model/user';
import UserCreateRequestDTO from './dto/request/user.create.dto';
import generateId from './utils/util';


export default Server(() => {
    const app = express();

    app.use(cors())
    app.use(express.json());
    app.get('/ping', (req, res) => {
        res.json({ message: 'pong' })
    });

    app.post('/register', async (req: Request<User, UserCreateRequestDTO, any>, res) => {

        const userID = generateId();
        const userOpt = usersStorage.get(userID);

        if ("None" in userOpt) {
            const user: User =
            {
                id: userID,
                ...req.body,
                is_seller: false
            };
            usersStorage.insert(user.id, user);
            return res.json(req.body);
        }

        return res.status(400).send();
    });

    app.post('/login', async (req: Request<any, any, any>, res) => {

        const email = req.body.email;
        const password = req.body.password;

        for (const iterator of usersStorage.values()) {
            if (email === iterator.email && password === iterator.password) {
                return res.json(iterator);
            }
        }

        return res.status(400).send();
    });

    app.get("/user", (req, res) => {
        res.json(usersStorage.values());
    });

    app.use(express.static('/dist'));

    return app.listen();
});
