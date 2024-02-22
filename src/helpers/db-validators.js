import Role from '../roles/role.model.js';

export const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({role});
    if (!existeRole) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

