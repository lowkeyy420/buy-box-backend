import { Canister, Server, ic, init, text } from 'azle';
import express, { Request } from 'express';

import { createUser, findByEmail } from './service/user.service';



const ServerCanister = Canister({
    createUser,
    findByEmail,
});

export default Server(() => {
    const app = express();
    app.use(express.json());
    app.get('/ping', (req, res) => {
        res.json({ message: 'pong' })
    });

    app.post('/register', async (req: Request<any, any, any>, res) => {
        await ic.call(ServerCanister.createUser, req.body);
        return await res.json({ message: 'FOUND' });
    });

    app.post('/login', async (req: Request<any, any, any>, res) => {
        console.log(req.body);
        console.log(req.body.email);
        await ic.call(ServerCanister.findByEmail, {args :["testing@gmail.com"]});
        return await res.json({ message: 'FOUND' });
    });

    app.use(express.static('/dist'));

    return app.listen();
});
