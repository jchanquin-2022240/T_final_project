import Role from '../roles/role.model.js';
import Admin from '../admin/admin.model.js';
import User from '../user/user.model.js';
import Product from '../products/product.model.js';

export const esRoleValido = async (role = '') => {
    if (role) {
        const existeRole = await Role.findOne({role});
        if (!existeRole) {
            throw new Error(`El role ${role} no existe en la base de datos`);
        }
    }
}

//Admin
export const existsEmailAdmin = async (correo = '') => {
    const existsEmails = await Admin.findOne({correo});
    if (existsEmails) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }
}

//User
export const existsEmailClient = async (correo = '') => {
    const existsEmails = await User.findOne({correo});
    if (existsEmails) {
        throw new Error(`El correo ${correo} ya esta registrado en la base de datos`);
    }
}

//products
export const existingName = async (nombre = '') => {
    const existsName = await Product.findOne({nombre});
    if (existsName) {
        throw new Error(`The name ${nombre} already exists in the database`);
    }
}

export const existingProductById = async (id = '') => {
    const existById = await Product.findById(id);
    if (!existById) {
        throw new Error(`The ID ${id} does not exist in the database`);
    }
}