const express = require("express");
const server = express();
const database = require("./configuracion/database");
const bodyParser = require("body-parser");
server.use(bodyParser.json());

//Conexión a las rutas
const usuario = require("./rutas/rutaUsuario");
const producto = require("./rutas/rutaProducto");
const pedido = require("./rutas/rutaPedido");

//Endpoint para cada entidad
server.use("/pedido", pedido);
server.use("/producto", producto);
server.use("/usuario", usuario);

database.sequelize.authenticate()
.then(() => {
    server.listen(3000, () => {
        console.log('Conectó con el servidor y base de dato');
    });
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });