import Role from '../roles/role.model.js';
import Admin from '../admin/admin.model.js';
import User from '../user/user.model.js';
import Category from '../category/category.model.js';

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

//Category
export const existsCategoryName = async (nombre = '') => {
    const existsCategory = await Category.findOne({nombre});
    if (existsCategory) {
        throw new Error(`La categoria ${nombre} ya existe en la base de datos`);
    }
}