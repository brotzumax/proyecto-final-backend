import express from 'express';
import routerMemoriaProductos from "./routes/routerProductos.js"
import routerArchivoCarritos from "./routes/routerCarritos.js"
import { routerMongoDbProductos } from './routes/routerMongoDbProductos.js';
import { routerFirebaseCarritos } from './routes/routerFirebaseCarritos.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Configuración Routers
app.use('/api/productos', routerMongoDbProductos);
app.use('/api/carrito', routerFirebaseCarritos);

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor: ${error}`));