const database = require("../configuracion/database");
const usuarioMid ={};

usuarioMid.requireData = async(req, res, next) => {
    const username = req.body.Username;
    const contraseña = req.body.Password;
    const telefono = req.body.Telefono;
    const direccion = req.body.direccion;
    const email = req.body.Email;

if (typeof(username)!== "string") {
    res.status(400).json({
        message: "Problemas con el nombre de ususario"
    }) 
} else if (typeof(contraseña)!== "string") {
    res.status(400).json ({
        message: "Problemas con la contraseña"
    })
} else if (typeof(direccion)!== "string") {
    res.status(400).json ({
        message: "Problemas con la dirección"
    })
} else if (typeof(telefono)!== "string") {
    res.status(400).json({
        message: "Problemas con el número de teléfono"
    })
} else if (typeof(email)!== "string") {
    res.status(400).json({
        message: "Problemas con el email"
    })
} else {
    next();
}
}

usuarioMid.requiereDataLogin = async(req, res, next) => {
    const username = req.body.Username;
    const contraseña = req.body.contraseña;

if (typeof(username)!== "string") {
    res.status(400).json ({
        message: "Usuario o contraseña equivocados"
    })
} else if (typeof(contraseña)!== "string") {
    res.status(400).json({
        message: "Usuario o contraseña incorrectos"
    })
} else {
    next();
}
}

usuarioMid.dataValida = async(req, res, next) => {
    const nombreUsuario =req.body.Username;
    const email = req.body.Email;

    const usernameValido = await database.usuarioM.findOne({
        where: {
            Username: nombreUsuario
        }
    }) .catch(err =>{
        res.status(500).json({
            message: "Error en base de datos"
        })
    });
    
    const emailValido = await database.usuarioM.findOne ({
        where: {
            Email: email
        }
    }) .catch(err =>{
        res.status(500).json({
            message: "Error en base de datos."
        })
    })
    if (usernameValido) {
        res.status(500).json({
            message: "El nombre de usuario ya existe"
        })
        
    } else if (usernameValido) {
        res.status(500).json({
            message: "El correo electrónico ya existe"
        }) 
    } else {
        next();
    }
} 

module.exports = usuarioMid;