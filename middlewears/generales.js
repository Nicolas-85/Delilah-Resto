const jwt = require("jsonwebtoken");
const JWTSign = "myPass";
const generalMid = {};

generalMid.checkBody = (req, res, next) => {
    const body = req.body;
    if (isObjEmpty(body)) {
        res.status(400).json({
            message:"error conexión con base de datos acá" 
        })
    } else {
        next();
    }
}

generalMid.validateToken = (req, res, next)=>{
    const token = req.headers.authorization;
    const tojenVerificacion = jwt.verify(token, JWTSign, (error, decoded)=> {
        if (error) {
            res.status(403).json({
                message: "problemas de verificación",
                error
            })            
        } else {
            res.locals.Payload = decoded;
            next();
        }
    })
}

generalMid.isAdmin = (req, res, next) => {
    if (res.locals.Payload.isAdmin === false) {
        res.status(403).json({
            message: "No es administrador"
        })
    } else {
        next();
    }
}

function isObjEmpty(objeto) {
    return Object.entries(objeto).length===0;
}

module.exports = generalMid;