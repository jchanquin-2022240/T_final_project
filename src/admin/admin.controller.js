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
    const{nombre ,correo ,password, role} = req.body;
    const admin = new Admin( {nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);
    
    await admin.save();

    res.status(200).json({
        admin
    });
}

export const newAdmin = async(res) => {
    const admin = await Admin.findOne({ correo: 'administrador@gmail.com' })

    if(admin) {
        res.status(400).json({ msg: 'The administrador already exist' });
    } else {
        const newAdmin = new Admin({
            "nombre": 'Administrador',
            "correo": 'Administrador@gmail.com',
            "password": '123456789',
            "role": 'ADMIN'
        })
        const salt = bcryptjs.genSaltSync();
        newAdmin.password = bcryptjs.hashSync(newAdmin.password, salt);
        await newAdmin.save();
    }
}
