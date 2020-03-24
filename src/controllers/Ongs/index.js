const {BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED} = require('http-status-codes');
const OngsService = require('../../services/Ongs');

module.exports = {
    async create(req, res){
        const {name, email, whatsapp, city, uf} = req.body;
        if(!name || !email || !whatsapp || !city || !uf){
            return res.status(BAD_REQUEST).json({
                name: name ? undefined : "campo inválido!",
                email: email ? undefined : "campo inválido!",
                whatsapp: whatsapp ? undefined : "campo inválido!",
                city: city ? undefined : "campo inválido!",
                uf: uf ? undefined : "campo inválido!",
            })
        }
        try{
            return res.json({
                id: await OngsService.create({
                    name,
                    email,
                    whatsapp,
                    city,
                    uf
                }),
            });
        }catch(e){
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: "Ocorreu um erro ao tentar realizar o cadastro!",
            });
        }
    },
    async listAll(req, res){
        const defaultMaxValue = 10;
        let {offset = 0, max = defaultMaxValue} = req.query;
        offset = new Number(offset).valueOf() || 0;
        max = new Number(max).valueOf() || defaultMaxValue;
        try{
            return res.json(await OngsService.listAll({offset, max}));
        }catch(e){
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: "Ocorreu um erro ao tentar listar as ONGS cadastradas!",
            });
        }
    }
};