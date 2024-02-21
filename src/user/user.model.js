import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true,"El nombre es obligatorio"]
    },
    correo:{
        type: String,
        required: [true,"El correo es obligatorio"]
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    role: {
        type: String,
        default: "CLIENT"
    },
    estado: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('User', UserSchema);