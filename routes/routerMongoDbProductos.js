import express from 'express';
import mongoose from "mongoose";
import { mongoConfig } from '../config.js';
import * as models from "../models/producto.js";

const { Router } = express;
const routerProductos = Router();


//Métodos productos
routerProductos.get("/", (req, res) => {
    mongoose.connect("mongodb://localhost:27017/ecommerce", mongoConfig)
        .then(() => models.productos.find({}))
        .then(data => res.json(data))
        .catch(err => res.json({ status: err }));
});

routerProductos.get("/:id", (req, res) => {
    const id = req.params.id;
    mongoose.connect("mongodb://localhost:27017/ecommerce", mongoConfig)
        .then(() => models.productos.find({ _id: id }))
        .then(data => res.json(data))
        .catch(err => res.json({ status: err }));
});

routerProductos.post("/", (req, res) => {
    const producto = req.body;
    mongoose.connect("mongodb://localhost:27017/ecommerce", mongoConfig)
        .then(() => models.productos.create(producto))
        .then(() => res.json(producto))
        .catch(err => res.json({ status: err }));
});

routerProductos.put("/:id", (req, res) => {
    const id = req.params.id;
    const nuevoProducto = req.body;

    mongoose.connect("mongodb://localhost:27017/ecommerce", mongoConfig)
        .then(() => models.productos.updateOne({ _id: id }, nuevoProducto))
        .then(() => res.json({ status: "Producto reemplazado" }))
        .catch(err => res.json({ status: err }));
});

routerProductos.delete("/:id", (req, res) => {
    const id = req.params.id;
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://localhost:27017/ecommerce", mongoConfig)
        .then(() => models.productos.deleteOne({ _id: id }))
        .then(() => res.json({ status: "Producto eliminado" }))
        .catch(err => res.json({ status: err }));
});

export const routerMongoDbProductos = routerProductos;
