const express = require('express');
const { Router } = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { routerProductos } = require('./routes/routerProductos.js')
const { routerCarritos } = require('./routes/routerCarritos.js')

//Configuración Routers
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor: ${error}`));