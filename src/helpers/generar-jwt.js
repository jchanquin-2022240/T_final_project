import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid};
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '2h'
            },
            (e, token) => {
                e ? (console.log(e), reject('Token not generated')): resolve(token);
            }
        )
    });
}