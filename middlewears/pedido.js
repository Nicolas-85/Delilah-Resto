const database = require("../configuracion/database");
const ordenMid = {}

ordenMid.requireDataOrden = async(req, res, next) => {
    const metodoDePago = req.body.metodoPago
    const arrayProduct = req.body.productsArray

    if (typeof(metodoDePago)!== "string") {
        res.status(400).json({
            message: "Error en el metodo de pago"
        })
    } else if (!Array.isArray(arrayProduct) || arrayProduct ===0) {
        res.status(400).json({
            message: "La orden está vacía"
        })
    } else {
        next();        
    }       
}

ordenMid.isProductAvailable = async (req, res, next) => {
    const productsArray = req.body.productsArray;
    const product = productsArray.map(product => product.id);

    res.locals.products = product;
    next();
}


module.exports = ordenMid;
