const crypto = require('crypto');
const connection = require('../../database/connection');
const Incidents = require('../../database/models/Incidents');

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
            .select([[...Incidents.publicFields,]])
            .from('incidents')
            .where({ong_id})
            .limit(max)
            .offset(offset);
    },
    async delete({id, ong_id}){
        return await connection('incidents')
            .where({ong_id, id})
            .delete();
    }
}