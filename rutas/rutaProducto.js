const expres = require("express");
const router = expres.Router();
const generalMid = require("../middlewears/generales");
const usuarioMid = require("../middlewears/usuario");
const productoMid = require("../middlewears/producto");
const productoControlador = require("../controladores/productoControler");


router.get("/",
    productoControlador.traerProductos
);

router.post("/",
generalMid.validateToken,
generalMid.isAdmin,
generalMid.checkBody,
productoMid.requireData,
productoControlador.crearProducto
);

router.delete("/:id",
    generalMid.validateToken,
    generalMid.isAdmin,
    productoControlador.borrarProducto
);
router.put("/:id",
    generalMid.validateToken,
    generalMid.isAdmin,
    productoMid.validateProductId,
    generalMid.checkBody,
    productoMid.requireData,
    productoControlador.actualizarProducto
);

module.exports = router;