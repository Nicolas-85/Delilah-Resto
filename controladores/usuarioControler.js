const jwt = require("jsonwebtoken");
const JWTSign = "myPass";
const database = require("../configuracion/database");
const usuario = {};

usuario.logIn = async(req, res) => {
    //comprobar si el Username y el Password son parametros tomados de la base de datos.
    const userName = req.body.Username;
    const password = req.body.contraseña;

    const usuarioLog = await database.usuarioM.findOne({
        where: {
            Username: userName,
            Password: password
        }
    }).catch(err => {
        res.status(500).json({
            message: "Problemas con labase de datos",
            error: err
        })
    })

    if (!usuarioLog) {
        res.status(400).json({
            message: "Usuario o contraseña incorrecto"
        })
    } else {
        res.locals.Payload = usuarioLog;
        const token = jwt.sign({
            id: usuarioLog.Id,
            username: usuarioLog.Username,
            isAdmin: usuarioLog.isAdmin
        }, JWTSign );

        res.status(200).json({
            message: "Usuario logueado",
            token
        })
    }
}

usuario.crearUsuario = async (req, res) => { 
    const body = req.body;

    const usuarioNuevo = await database.usuarioM.create(body)
    .catch(err => {
        res.status(500).json({
            message: "Erron con la base de datos acá",
            error: err
        })
    })

    res.status(201).json({
        message: "El usuario se creo con exito",
        usuarioNuevo
    })
}

module.exports = usuario;