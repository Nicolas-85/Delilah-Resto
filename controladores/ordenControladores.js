const database = require("../configuracion/database");
const orden = {}

orden.crearOrdenNueva = async(req, res) => {
    const loggerUser = res.locals.Payload;
    const dbProducto = res.locals.products;

    console.log("este es loggerUser" + loggerUser.id);
    const nuevaOrden = {
        metodoPago: req.body.metodoPago,
        total: calculaTotal(dbProducto, req.body.productsArray),
        userID: loggerUser.id
    }
    const nuevaOrdenDb = await database.pedidoM.create(nuevaOrden).catch(err => {
        res.status(500).json({
            message: "Error con la base de datos",
            error: err
        })
    })
    
    //Crea un array para mandar a la taba productopedido mediante el método bulkCreate()
    const ordenId = nuevaOrdenDb.Id;
    console.log("este es id de la orden" + ordenId);
    const arrayProductosPedidos = creaArrayProductosEnOrden(ordenId, dbProducto, req.body.productsArray);
    console.log("este es el array producto pedido"+ arrayProductosPedidos[0].subtotal);
    const arrayProductosEnOrden = await database.productopedidoM.bulkCreate(arrayProductosPedidos)
    .catch(async err => {
        await database.pedidoM.destroy({
            where: {
                Id: ordenId,
            }
        }).catch(err => {
            res.status(500).json({
                message: "El producto no se insertó, orden eliminada de la base de datos"
            })
        })
        })
        res.status(200).json({
            message: "La orden fue creada con exito",
            arrayProductosEnOrden,
            nuevaOrden
        })
}

orden.listaDeOrdenes = async(req, res) => {
    if (res.locals.Payload.isAdmin) {
        const ordenes = await database.pedidoM.findAll().catch(err => {
            res.status(500).json({
                message: "Error con la base de datos"
            })
        })
        res.status(200).json({
            message: "Lista de ordenes",
            ordenes
        })
    }else {
        const ordenesSegundoUsuario = await database.pedidoM.findAll({
            where: {userID: res.locals.Payload.id}
        }).catch(err => {
            res.status(500).json({
                message: "Error con la base de datos"
            })
        })
        res.status(200).json({
            message: "Lista de ordenes segun usuario",
            ordenesSegundoUsuario
        })
    }
}

orden.borrarOrden = async(req, res) => {
    const ordenEliminada = await database.pedidoM.destroy({
        where: {
            Id: req.body.id
        }
    }).catch(err => {
        res.status(500).json({
            message: "Error con la base de datos"
        })
    })
    res.status(200).json({
        message: "La orden fue eliminada con éxito",
        ordenEliminada
    })
}

//Funciones auxiliares.
function calculaTotal(arrayPBD, arrayPUsuario) {
    let total = 0;

    arrayPUsuario.forEach(productoUsuario => {
        console.log(arrayPBD);
        productoFiltrado = arrayPBD.find(productoBD => productoUsuario.Id === productoBD);
        console.log("este es el producto filtrado" + productoFiltrado);
        total = total + productoUsuario.precio * productoUsuario.cantidad; 
    })
    return total;
}

function creaArrayProductosEnOrden(ordenId, arrayPBD, arrayPUsuario) {
    const arrayProductosEnOrden = [];

    for (let i = 0; i < arrayPUsuario.length; i++) {
        const productoUsuario = arrayPUsuario[i];

        productoFiltrado = arrayPBD.find(productoBD => productoUsuario.Id === productoBD);

        const producto = {
            cantidad: productoUsuario.cantidad,
            subtotal: productoUsuario.precio * productoUsuario.cantidad,
            idOrden: ordenId,
            idProduct: productoUsuario.Id
        }
        console.log("este es el producto" + producto);
        arrayProductosEnOrden[i] = producto;    
    }
    return arrayProductosEnOrden;
}
 
module.exports = orden;
