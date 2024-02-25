import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
    nombre: {
        type: String,
        requrired: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    role: {
        type: String,
        default: "ADMIN"
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Admin', AdminSchema);