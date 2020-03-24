const crypto = require('crypto');
const connection = require('../../database/connection');

module.exports = {
    async create({title, description, value, ong_id}){
        return await connection('incidents').insert(
            {
                title,
                description,
                value,
                ong_id
            }
        )[0];
    },
    async list({offset, max, ong_id}){
        return await connection
            .select('*')
            .from('incidents')
            .where({ong_id})
            .limit(max)
            .offset(offset);
    }
}