import express from 'express';
import admin from "firebase-admin";
import { firebaseConfig } from '../config.js';

const { Router } = express;
const routerCarritos = Router();
admin.initializeApp(firebaseConfig);


//Métodos carritos
routerCarritos.post("/", (req, res) => {
    const doc = admin.firestore().collection('carritos').doc();
    doc.create({ timestamp: Date.now(), productos: [] })
        .then(() => res.json({ status: "Carrito creado" }))
        .catch(() => res.json({ status: "Error al crear el carrito" }));
});

routerCarritos.delete("/:id", (req, res) => {
    const id = req.params.id;
    const doc = admin.firestore().collection('carritos').doc(id);
    doc.delete()
        .then(() => res.json({ status: "Carrito eliminado" }))
        .catch(() => res.json({ status: "Error al borrar el carrito" }));
});

routerCarritos.get("/:id/productos", (req, res) => {
    const id = req.params.id;
    const doc = admin.firestore().collection('carritos').doc(id);
    doc.get()
        .then(response => response.data())
        .then(carrito => res.json({ productos: carrito.productos }))
        .catch(() => res.json({ status: "Error al buscar los productos" }));
});

routerCarritos.post("/:id/productos", (req, res) => {
    const id = req.params.id;
    const nuevosProductos = req.body;
    const doc = admin.firestore().collection('carritos').doc(id);
    doc.get()
        .then(response => response.data())
        .then(carrito => carrito.productos)
        .then(productosCarrito => doc.update({ productos: productosCarrito.concat(nuevosProductos) }))
        .then(() => res.json(nuevosProductos))
        .catch(() => res.json({ status: "Error al ingresar los productos" }));
});

routerCarritos.delete("/:id/productos/:id_prod", (req, res) => {
    const idCart = req.params.id;
    const idProduct = req.params.id_prod;

    const doc = admin.firestore().collection('carritos').doc(idCart);
    doc.get()
        .then(response => response.data())
        .then(carrito => carrito.productos)
        .then(productosCarrito => {
            const productos = productosCarrito;
            const producto = productos.find(producto => producto.id === idProduct);
            const productIndex = productos.indexOf(producto);
            productos.splice(productIndex, 1);
            doc.update({ productos: productos })
        })
        .then(() => res.json({ status: `Producto id:${idProduct} eliminado` }))
        .catch(() => res.json({ status: "Error al eliminar el producto" }));
});

export const routerFirebaseCarritos = routerCarritos;