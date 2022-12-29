import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
    title: { type: String, require: true },
    thumbnail: { type: String, require: true },
    price: { type: Number, require: true }
});

export const productos = mongoose.model('productos', ProductoSchema);