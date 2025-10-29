import express from 'express';
import User from '../models/User.js';
import { encryptOneWay, compareOneWay, encryptTwoWay } from '../utils/crypt_utils.js';

const router = express.Router();

router.post("/sign-in", async (req,res) => {
    const {
        username, password
    } = req.body;
    const user = await User.findOne({username});
    const isSame = await compareOneWay(password, user.encrypted_password);
    if(isSame) {
        const token = await encryptTwoWay({
            username: user.username,
            id: user._id.toString()
        });
        res.send({token});
    } else {
        res.status(401).send({message: "username ou password incorretos"})
    }
});

router.post("/sign-up", async (req, res) => {
    const {
        username, password
    } = req.body;
    const encrypted_password = await encryptOneWay(password);
    const user = await User.create({
        username,
        encrypted_password
    });
    res.send(user);
})

export default router;