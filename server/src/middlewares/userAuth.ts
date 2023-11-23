import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/user-model";
import { IUser } from "../types";

const secret: string = process.env.SECRET + "";

// For setting req.user as user, otherwise ts shows error as it can of any type
interface RequestWithUser extends Request {
    user?: IUser;
}

// For authenticating user with request
const authUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ msg: "Token Missing", token: false, valid: false });
    }
    try {
        const decoded = jwt.verify(token, secret) as IUser;
        const user = await User.findById(decoded?.id)

        if (!user) {
            return res.status(404).json({ msg: "User not found! Invalid Request!", token: false, valid: false });
        }
        req.user = user
        next();
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", token: false, valid: false });
    }
}

export { authUser };