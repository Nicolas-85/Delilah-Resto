const database = require("../configuracion/database");
const producto = {};

producto.traerProductos = async(req, res ) => {
    const productos = await database.productoM.findAll().catch(err => {
        res.status(500).json({
            message: "Problema con la base de datos"
        })
    })
    res.status(200).json({
        message: "Productos encontrados",
        quantity: productos.length,
        productos
    })
}

producto.crearProducto = async(req, res) => {
    const productoNuevo = await database.productoM.create(req.body).catch(err => {
        res.status(500).json({
            message: "Error con la base de datos",
            error: err
        })
    })
    res.status(200).json({
        message: "Producto creado",
        productoNuevo
    })
}

producto.actualizarProducto = async(req, res) => {
    const productoModificado = await res.locals.product.update(req.dody).catch(err => {
        res.status(500).json({
            message: "Error con la base de datos",
            error: err
        })
    })
    res.status(200).json({
        message: "Producto modificado",
        productoModificado
    })


}

producto.borrarProducto = async(req, res) => {
    const idProducto = req.body.id;

    const productoElimindado = await database.productoM.destroy({
        where: {
            id: idProducto
        }
    }).catch(err => {
        res.status(500).json({
            message: "Erroro con la base de datos",
            error: err
        })
    })
    res.status(200).json({
        message: "Producto eliminado",
        productoElimindado
    })
}

module.exports = producto;