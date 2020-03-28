const {
    UNAUTHORIZED, 
    INTERNAL_SERVER_ERROR
} = require('http-status-codes');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(UNAUTHORIZED).json({
            error: "Não autenticado!",
        });
    }
    const [,token] = authorization.split('Bearer ');
    if(!token){
        return res.status(UNAUTHORIZED).json({
            error: "Não autenticado!"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
        if(err){
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: "Erro ao tentar realizar a autenticação!"
            });
        }
        const {iat, exp, ...tokenParams} = decoded;
        req.tokenParams = tokenParams;
        next();
    })
}