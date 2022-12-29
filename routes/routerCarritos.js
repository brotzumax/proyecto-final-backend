import express from 'express';
import fs from 'fs';
const { Router } = express;
const routerCarritos = Router();

let carritos = [];
cargarCarritos();

//Obtener IDs
function getLastIdCarrito() {
    if (carritos.length === 0) {
        return 0;
    }

    const lastId = carritos[(carritos.length - 1)].id;
    return lastId;
}


//Lógica interna
function getCartById(id) {
    const carrito = carritos.find(carrito => carrito.id === id);
    return carrito;
}

function deleteCartById(id) {
    const carrito = getCartById(id);
    const index = carritos.indexOf(carrito);
    carritos.splice(index, 1);
}

function insertCartProducts(id, productos) {
    const cart = getCartById(id);
    const index = carritos.indexOf(cart);
    cart.productos = cart.productos.concat(productos);
    carritos[index] = cart;
}

function replaceCartProducts(id, productos) {
    const cart = getCartById(id);
    const index = carritos.indexOf(cart);
    cart.productos = productos;
    carritos[index] = cart;
}


//Persistencia de datos
function guardarCarritos() {
    fs.writeFileSync("./persistencia/carritos.json", JSON.stringify(carritos, null, 2));
}

function cargarCarritos() {
    carritos = JSON.parse(fs.readFileSync("./persistencia/carritos.json", "utf-8"));
}


//Middlewares
function cartExist(req, res, next) {
    if (!carritos.some(carrito => carrito.id === Number(req.params.id))) {
        res.json({ error: "Carrito no encontrado" })
    } else {
        next();
    }
}


//Métodos carritos
routerCarritos.post("/", (req, res) => {
    cargarCarritos();
    const lastId = getLastIdCarrito() + 1;
    const nuevoCarrito = { id: lastId, timestamp: Date.now(), productos: [] };
    carritos.push(nuevoCarrito);
    guardarCarritos();
    res.json({ id: lastId });
});

routerCarritos.delete("/:id", cartExist, (req, res) => {
    cargarCarritos();
    const id = Number(req.params.id);
    deleteCartById(id);
    guardarCarritos();
    res.json({ status: "Carrito eliminado" });
});

routerCarritos.get("/:id/productos", cartExist, (req, res) => {
    cargarCarritos();
    const id = Number(req.params.id);
    const carritoBuscado = getCartById(id);
    res.json(carritoBuscado.productos);
});

routerCarritos.post("/:id/productos", cartExist, (req, res) => {
    cargarCarritos();
    const id = Number(req.params.id);
    const productos = req.body;
    insertCartProducts(id, productos);
    guardarCarritos();
    res.json(productos);
});

routerCarritos.delete("/:id/productos/:id_prod", cartExist, (req, res) => {
    cargarCarritos();
    const idCart = Number(req.params.id);
    const idProduct = Number(req.params.id_prod);

    const productos = getCartById(idCart).productos;
    const producto = productos.find(producto => producto.id === idProduct);
    const productIndex = productos.indexOf(producto);
    productos.splice(productIndex, 1);
    replaceCartProducts(idCart, productos);
    guardarCarritos();
    res.json({ status: `Producto id:${idProduct} eliminado` });
});

export const routerArchivoCarritos = routerCarritos;