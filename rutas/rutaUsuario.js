const expres = require("express");
const router = expres.Router();
const usuarioMid = require("../middlewears/usuario");
const generalMid = require("../middlewears/generales");
const usuarioControladores = require("../controladores/usuarioControler");


router.post("/login",
    generalMid.checkBody,
    usuarioMid.requiereDataLogin,
    usuarioControladores.logIn
);

router.post("/registro",
    generalMid.checkBody,
    usuarioMid.requireData,
    usuarioMid.dataValida,
    usuarioControladores.crearUsuario
);

module.exports = router;

