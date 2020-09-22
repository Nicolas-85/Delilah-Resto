const databasse = require("../configuracion/database");

const productoMid = {};

productoMid.requireData = (req, res, next) => {
    const nombreP = req.body.nombre;
    const categoriaP = req.body.categoria;
    const precioP = req.body.precio;

    if (typeof(nombreP)!== "string") {
        res.status(500).json({
            message: "Error en el tipo de dato"
        })
    } else if (typeof(categoriaP)!== "string") {
        res.status(500).json({
            message: "Error en el tipo de dato"
        })   
    } else if (typeof(precioP)!== "number") {
        res.status(500).json({
            message: "Error con el tipo de dato"
        })
        
    } else {
        next();
    }
}

productoMid.validateProductId = async (req, res, next) => {
    const producto = await databasse.productoM.findByPk(req.params.id);
    
    if(producto) {
        res.locals.product = producto;
        next();
    } else {
        res.status(404).json({
            message: 'EL producto no existe'
        });
    }
};


module.exports = productoMid;

