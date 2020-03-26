const {
    UNAUTHORIZED, 
    INTERNAL_SERVER_ERROR
} = require('http-status-codes');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next)=>{
    // not Authorization: Bearer {token}, the token won't be permanent
    const token = req.headers['x-access-token'];
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