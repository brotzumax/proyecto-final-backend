import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
    timestamp: { type: String, require: true },
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    codigo: { type: String, require: true },
    foto: { type: String, require: true },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true }
});

export const productos = mongoose.model('productos', ProductoSchema);