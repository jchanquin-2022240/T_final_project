export const esClienteRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Can\'t validate user without validating token first'
        });
    }

    const { role, nombre } = req.user;

    // Assuming 'CLIENTE' is the role for users
    if (role !== 'CLIENTE') {
        return res.status(401).json({ msg: `The user ${nombre} does not have the CLIENTE role` });
    }
    next();
}

export const esAdminRole = (req, res, next) => {
    if (!req.admin) {
        return res.status(500).json({
            msg: 'Can\'t validate user without validating token first'
        });
    }

    const { role, nombre } = req.admin;

    // Assuming 'ADMIN' is the role for admins
    if (role !== 'ADMIN') {
        return res.status(401).json({ msg: `The user ${nombre} does not have the ADMIN role` });
    }
    next();
}
