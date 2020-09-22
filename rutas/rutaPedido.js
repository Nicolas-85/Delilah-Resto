const expres = require("express");
const router = expres.Router();
const ordenMid = require("../middlewears/pedido");
const usuarioMid = require("../middlewears/usuario");
const generalMid = require("../middlewears/generales");
const ordenControladores = require("../controladores/ordenControladores");

router.post("/",
    generalMid.validateToken,
    generalMid.checkBody,
    ordenMid.requireDataOrden,
    ordenMid.isProductAvailable,
    ordenControladores.crearOrdenNueva
);
router.delete("/:id",
    generalMid.validateToken,
    generalMid.isAdmin,
    ordenControladores.borrarOrden
);

router.get("/",
    generalMid.validateToken,
    ordenControladores.listaDeOrdenes,
);

module.exports = router;