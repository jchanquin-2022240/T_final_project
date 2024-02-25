import Role from '../roles/role.model.js';
import Admin from '../admin/admin.model.js'

export const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({role});
    if (!existeRole) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

export const existsEmail = async (correo = '') => {
    const existsEmails = await Admin.findOne({correo});
    if (existsEmails) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }
}

