import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from "../../config";

const users = [
    {
        username: "admin",
        password: "password"
    }
]

class AuthController {
    login(req: Request, res: Response) {
        const { username, password } = req.body;
        if(!username || !password) return res.status(403).send({ success: false, error: "Missing credentials" })

        const user = users.find((x) => x.username === username && x.password === password);
        if(!user) return res.status(403).send({ success: false, error: "User not found" });

        const token = jwt.sign({ username }, config.JWTSecret, { expiresIn: 3600 });

        res.send({ token });
    }
}

export default new AuthController();