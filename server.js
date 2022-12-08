const express = require('express');
const { Router } = express;
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routerProductos = Router();
const routerCarritos = Router();

let administrador = false;
let productos = [];
let carritos = [];

cargarProductos();
cargarCarritos();

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
    fs.writeFileSync("./productos.json", JSON.stringify(productos, null, 2));
}

function cargarProductos() {
    productos = JSON.parse(fs.readFileSync("./productos.json", "utf-8"));
}

function guardarCarritos() {
    fs.writeFileSync("./carritos.json", JSON.stringify(carritos, null, 2));
}

function cargarCarritos() {
    carritos = JSON.parse(fs.readFileSync("./carritos.json", "utf-8"));
}


//Métodos de búsqueda
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

//Middlewares
function productExist(req, res, next) {
    if (!productos.some(product => product.id === Number(req.params.id))) {
        res.json({ error: "Producto no encontrado" })
    } else {
        next();
    }
}

function cartExist(req, res, next) {
    if (!carritos.some(carrito => carrito.id === Number(req.params.id))) {
        res.json({ error: "Carrito no encontrado" })
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


//Obtener IDs
function getLastId() {
    if (productos.length === 0) {
        return 0;
    }

    const lastId = productos[(productos.length - 1)].id;
    return lastId;
}

function getLastIdCarrito() {
    if (carritos.length === 0) {
        return 0;
    }

    const lastId = carritos[(carritos.length - 1)].id;
    return lastId;
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


//Configuración Routers
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor: ${error}`));