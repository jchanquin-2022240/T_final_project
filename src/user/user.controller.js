import { response } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';

export const userPost = async (req, res = response) => {
    const { nombre, correo, password, role} = req.body;
    const user = new User({nombre, correo, password, role});
    
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    await user.save();

    res.status(200).json({
        user
    });
}   