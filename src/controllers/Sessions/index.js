const {
    BAD_REQUEST, 
    INTERNAL_SERVER_ERROR, 
    UNAUTHORIZED,
    NOT_FOUND,
} = require('http-status-codes');
const jwt = require('jsonwebtoken');

const OngsService = require('../../services/Ongs');

module.exports = {
    async login(req, res){
        const {id, password} = req.body;
        if(!id){
            return res.status(BAD_REQUEST).json({
                error: 'id não informado!',
            });
        }
        if(!password){
            return res.status(BAD_REQUEST).json({
                error: 'Senha não informada!'
            });
        }
        try{
            const ong = await OngsService.checkPassword({id, password});
            if(!ong){
                return res.status(NOT_FOUND).json({
                    error: "Não foi encontrada uma ong com a combinação de id e senha informada!",
                });
            }
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn: 7776000, //3 months
            });
            res.header('X-Access-Token', token);
            return res.json(ong);
        }catch(e){
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: "Ocorreu um erro ao tentar realizar o login!",
            })
        }
    }
}