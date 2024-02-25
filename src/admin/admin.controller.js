import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Admin from './admin.model.js';


export const adminPost = async (req = request, res = response ) => {
    const{nombre ,correo ,password} = req.body;
    const admin = new Admin( {nombre, correo, password});

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);
    
    await admin.save();

    res.status(200).json({
        admin
    });
}