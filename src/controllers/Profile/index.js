const {INTERNAL_SERVER_ERROR} = require('http-status-codes');
const {IncidentsService} = require('../../services');

module.exports = {
    async listIncidents(req, res){
        const defaultMaxValue = 10;
        let {offset = 0, max = defaultMaxValue} = req.query;
        const {id: ong_id} = req.tokenParams;
        offset = new Number(offset).valueOf() || 0;
        max = new Number(max).valueOf() || defaultMaxValue;
        try{
            const {count, results} = await IncidentsService.list({
                max,
                offset,
                ong_id
            });
            res.header('X-Total-Count',count);
            return res.json(results);
        }catch(e){
            console.log(e);
            return res.status(INTERNAL_SERVER_ERROR).json({
                error: "Ocorreu um erro ao tentar listar os casos da Ong!"
            });
        }
    }
}