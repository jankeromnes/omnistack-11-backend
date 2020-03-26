const {
    BAD_REQUEST, 
    INTERNAL_SERVER_ERROR,
    NO_CONTENT,
    NOT_FOUND,
} = require('http-status-codes');
const IncidentsService = require('../../services/Incidents');

module.exports = {
    async create(req, res){
        const {id: ong_id} = req.tokenParams;
        const {title, description, value} = req.body;
        const validValue = (typeof value === 'number') && value >= 0;
        if(!title || !description || !validValue){
            return res.status(BAD_REQUEST).json({
                title: title ? undefined : "Campo inválido",
                description: description ? undefined : "Campo inválido",
                value: validValue ? undefined : "Campo inválido"
            });
        }
        try{
            return res.json({
                id: await IncidentsService.create({
                    title,
                    description,
                    value,
                    ong_id,
                }),
            });
        }catch(e){
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: "Ocorreu um erro ao tentar salvar o caso!",
            });
        }
    },
    async listAll(req, res){
        const defaultMaxValue = 10;
        let {offset = 0, max = defaultMaxValue} = req.query;
        offset = new Number(offset).valueOf() || 0;
        max = new Number(max).valueOf() || defaultMaxValue;
        try{
            const {count, results} = await IncidentsService.listAll({offset, max});
            res.header('X-Total-Count', count['count(*)']);
            res.json(results);
        }catch(e){
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: "Ocorreu um erro ao tentar listar os casos cadastradas!",
            });
        }
    },
    async delete(req, res){
        const {id: ong_id} = req.tokenParams;
        const {id} = req.params;
        try{
            const deletedRows = await IncidentsService.delete({
                ong_id,
                id,
            });
            switch(deletedRows){
                case 1:
                    return res.status(NO_CONTENT).send();
                case 0:
                    return res.status(NOT_FOUND).json({
                        error: "Caso não encontrado!"
                    });
                default:
                    return res.status(INTERNAL_SERVER_ERROR).json({
                        error: `Mais de um caso foi deletado! Casos deletados: ${deletedRows}`,
                    });
            }
        }catch(e){
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: "Ocorreu um erro ao tentar deletar o caso!",
            });
        }
    }
}