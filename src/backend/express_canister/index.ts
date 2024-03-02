import { Server } from 'azle';
import express, { Request } from 'express';
import cors from 'cors';
import { tokenStorage, usersStorage } from './db/data';
import User from './model/user';
import UserCreateRequestDTO from './dto/request/user.create.dto';
import { generateId } from './utils/util';
import { compareSync, hashSync } from 'bcryptjs';
import { SECRET } from './env';
import { generateToken } from './utils/jwt';
import UserToken from './model/user_token';


export default Server(() => {
    const app = express();

    app.use(cors())
    app.use(express.json());
    app.get('/ping', (req, res) => {
        res.json({ message: 'pong' })
    });

    app.post('/register', async (req: Request<any, any, any>, res) => {

        const userID = generateId();
        const userOpt = usersStorage.get(userID);

        if ("None" in userOpt) {
            const password = hashSync(req.body.password, 8);

            const user: User =
            {
                id: userID,
                ...req.body,
                password: password,
                is_seller: false
            };

            usersStorage.insert(user.id, user);

            const generatedToken = generateToken({
                user_id: user.id,
                full_name: user.full_name,
                is_seller: user.is_seller
            }, 60);

            const token: UserToken = {
                token: generatedToken.token,
                user_id: user.id,
                expiration: generatedToken.expiration
            }

            tokenStorage.insert(token.token, token)

            return res.json({
                token: token.token,
                data: user
            });
        }

        return res.status(400).send();
    });

    app.post('/login', async (req: Request<any, any, any>, res) => {

        const email = req.body.email;
        const password = req.body.password;

        for (const iterator of usersStorage.values()) {
            if (email === iterator.email && compareSync(password, iterator.password)) {

                const generatedToken = generateToken({
                    user_id: iterator.id,
                    full_name: iterator.full_name,
                    is_seller: iterator.is_seller
                }, 60);

                const token: UserToken = {
                    token: generatedToken.token,
                    user_id: iterator.id,
                    expiration: generatedToken.expiration
                }

                tokenStorage.insert(token.token, token)

                return res.json({
                    token: token.token,
                    data: iterator
                });
            }
        }

        return res.status(400).send();
    });

    app.get("/user", (req, res) => {
        res.json(usersStorage.values());
    });

    app.get("/token", (req, res) => {
        res.json(tokenStorage.values());
    });


    app.use(express.static('/dist'));

    return app.listen();
});
