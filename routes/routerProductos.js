import express from 'express';
import fs from 'fs';
const { Router } = express;
const routerProductos = Router();

let administrador = true;
let productos = [];


//Obtener IDs
function getLastId() {
    if (productos.length === 0) {
        return 0;
    }

    const lastId = productos[(productos.length - 1)].id;
    return lastId;
}


//Lógica interna
function getProductById(id) {
    const producto = productos.find(producto => producto.id === id);
    return producto;
}

function deleteProductById(id) {
    const producto = getProductById(id);
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
}

function replaceProduct(id, nuevoProducto) {
    let producto = getProductById(id);
    const index = productos.indexOf(producto);
    producto = nuevoProducto;
    producto.id = id;
    productos[index] = producto;
}


//Persistencia de datos
function guardarProductos() {
    fs.writeFileSync("./persistencia/productos.json", JSON.stringify(productos, null, 2));
}

function cargarProductos() {
    productos = JSON.parse(fs.readFileSync("./persistencia/productos.json", "utf-8"));
}


//Middlewares
function productExist(req, res, next) {
    cargarProductos();
    if (!productos.some(product => product.id === Number(req.params.id))) {
        res.json({ error: "Producto no encontrado" })
    } else {
        next();
    }
}

function onlyAdministrator(req, res, next) {
    if (administrador) {
        next()
    } else {
        res.json({ error: -1, descripcion: "Ruta no autorizada" });
    }
}


//Métodos productos
routerProductos.get("/", (req, res) => {
    cargarProductos();
    res.json(productos);
});

routerProductos.get("/:id", productExist, (req, res) => {
    cargarProductos();
    const id = Number(req.params.id);
    const productoBuscado = getProductById(Number(id));
    res.json(productoBuscado);
});

routerProductos.post("/", onlyAdministrator, (req, res) => {
    cargarProductos();
    const producto = req.body;
    const idAsignado = getLastId() + 1;
    producto.id = idAsignado;
    productos.push(producto);
    guardarProductos();
    res.json(producto);
});

routerProductos.put("/:id", onlyAdministrator, productExist, (req, res) => {
    cargarProductos();
    const id = Number(req.params.id);
    const nuevoProducto = req.body;
    replaceProduct(id, nuevoProducto);
    guardarProductos();
    res.json({ status: "Producto reemplazado" });
});

routerProductos.delete("/:id", onlyAdministrator, productExist, (req, res) => {
    cargarProductos();
    const id = Number(req.params.id);
    deleteProductById(id);
    guardarProductos();
    res.json({ status: "Producto eliminado" });
});

export const routerMemoriaProductos = routerProductos;
