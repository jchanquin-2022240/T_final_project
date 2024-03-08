import jwt from 'jsonwebtoken';
import Admin from '../admin/admin.model.js';
import User from '../user/user.model.js';

export const validateJWT = async (req, res, next) => {
    const token = req.header('new-token');

    if (!token) return res.status(401).json({ msg: 'There is no token in the request' });

    let admin; // Declare admin variable outside the try block

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        admin = await Admin.findById(uid);

        if (!admin) {
            admin = await User.findById(uid);
            if (!admin) {
                return res.status(401).json({ msg: 'Admin does not exist in the database' })
            }
        }

        if (!admin.estado) {
            return res.status(401).json({ msg: 'Invalid Token, user in false' })
        }

        req.admin = admin;
        next();

    } catch (e) {
        console.log(e);
        res.status(401).json({ msg: 'Invalid Token' });
    }
}