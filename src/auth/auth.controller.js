import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
//import Admin from '../admin/admin.model.js';


export const login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const user = await User.findOne({ correo });

        if (!user) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, Correo no existe en la base de datos"
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos"
            });
        }

        const validarPassword = bcryptjs.compareSync(password, user.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        res.status(200).json({
            msg: 'Bienvenido!!!',
            user
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    }
}
