import { Server } from 'azle';
import express, { Request } from 'express';
import cors from 'cors';
import { cartStorage, categoryStorage, productStorage, tokenStorage, usersStorage } from './db/data';
import UserCreateRequestDTO from './dto/request/user.create.dto';
import UserLoginRequestDTO from './dto/request/user.login.dto';
import { createUser, loginUser } from './service/user.service';
import { authenticateToken } from './service/user_token.service';
import { createCategory, seedCategory } from './service/category.service';
import { createProduct, getAllProduct, getProductById, getProductByName, getProductByStore, removeProduct, updateProduct } from './service/product.service';
import { checkIsStore, checkLoggedIn } from './routes/middleware';
import { createStore } from './service/store.service';
import { addCart, getCart } from './service/cart.service';


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


    app.get("/authenticate", checkLoggedIn, (req: Request<any, any, any>, res) => {
        authenticateToken(req, res);
    });


    // user

    app.post('/become-seller', checkLoggedIn, async (req: Request<UserLoginRequestDTO, any, any>, res) => {
        createStore(req, res);
    });

    // category
    app.get("/category", (_, res) => {
        res.json(categoryStorage.values());
    });

    app.post("/category", checkLoggedIn, checkIsStore, (req: Request<any, any, any>, res) => {
        createCategory(req, res);
    });



    // product

    app.get("/product", (req, res) => {
        const name = req.query.name;
        if (name) {
            getProductByName(req, res);
            return;
        }

        getAllProduct(req, res);
    })

    app.delete("/product/:id", checkLoggedIn, checkIsStore, (req: Request<any, any, any>, res) => {
        removeProduct(req, res);
    })

    app.put("/product/:id", checkLoggedIn, checkIsStore, (req: Request<any, any, any>, res) => {
        updateProduct(req, res);
    })

    app.post("/product", checkLoggedIn, checkIsStore, (req: Request<any, any, any>, res) => {
        createProduct(req, res);
    })

    app.get("/user/:id/product", (req: Request<any, any, any>, res) => {
        getProductByStore(req, res);
    })

    app.get("/product/:id", (req: Request<any, any, any>, res) => {
        getProductById(req, res);
    })

    app.get("/product/:name", (req: Request<any, any, any>, res) => {
        getProductByName(req, res);
    })

    app.get("/cart", checkLoggedIn, (req: Request<any, any, any>, res) => {
        getCart(req, res);
    })

    app.get("/cart/all", checkLoggedIn, (req: Request<any, any, any>, res) => {
        res.json(cartStorage.values());
    })

    app.post("/cart", checkLoggedIn, (req: Request<any, any, any>, res) => {
        addCart(req, res);
    })


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
