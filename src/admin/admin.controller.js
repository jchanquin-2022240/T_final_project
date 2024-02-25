import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Admin from './admin.model.js';


export const adminGet = async (req, res) => {
    const {limite, desde} = req.query;
    const query = {estado: true};
    
    const [total, admin] = await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        admin
    });
}

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
