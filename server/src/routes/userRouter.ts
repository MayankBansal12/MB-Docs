import { Router } from "express";
import User from "../model/user-model";
import { IUser } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET || "";
const router = Router();

// /user/:userId -> Fetch user details for that userId
router.route("/:userId").get(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ msg: "Invalid Request!" });
    }
    try {
        const user = await User.findById(userId).select("-passwd");
        if (user) {
            return res.status(200).json({ msg: "User details fetched successfully!", user: user });
        } else {
            return res.status(400).json({ msg: "User not found!" })
        }
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
});

// /user/signup -> For new account/signup
router.route("/signup").post(async (req, res) => {
    const { name, email, passwd } = req.body;
    if (!email || !name || !passwd) {
        return res.status(400).json({ msg: "Details not provided!" });
    }
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).json({ msg: "User already exists!" });
        }
        const hashedPasswd = await bcrypt.hash(passwd, 10);
        const newUser: IUser = new User({
            name: name,
            email: email,
            passwd: hashedPasswd
        })
        await newUser.save();
        return res.status(200).json({ msg: "User signed up successfully!", user: newUser });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
})

// /user/login -> Login using email and passwd
router.route("/login").post(async (req, res) => {
    const { email, passwd } = req.body;
    if (!email || !passwd) {
        return res.status(400).json({ msg: "Email or password missing", token: null });
    }
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "User not found!", token: null });
        }
        const isValid = await bcrypt.compare(passwd, user.passwd)
        if (!isValid) {
            return res.status(401).json({ msg: "Incorrect password", token: null });
        }
        const token = jwt.sign({ id: user._id }, secret);
        return res.status(200).json({ msg: "Login successful", token: token });
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
})

export default router;