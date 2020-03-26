const crypto = require('crypto');
const connection = require('../../database/connection');
const {
    Incidents, 
    Ongs
} = require('../../database/models');

module.exports = {
    async create({title, description, value, ong_id}){
        const a = await connection('incidents').insert(
            {
                title,
                description,
                value,
                ong_id
            }
        );
        return a[0];
    },
    async list({offset, max, ong_id}){
        const count = await connection('incidents').count();
        const results = count ? await connection
            .select([...Incidents.publicFields].map(field=>`i.${field}`).concat([...Ongs.publicFields].map(field=>`o.${field}`)))
            .innerJoin('ongs as o', 'o.id', 'i.ong_id')
            .from('incidents as i')
            .where({ong_id})
            .limit(max)
            .offset(offset)
        :
        [];
        return {
            count,
            results,
        }
    },
    async listAll({offset, max}){
        const count = await connection('incidents').count();
        const results = count ? await connection
            .select([...Incidents.publicFields].map(field=>`i.${field}`).concat([...Ongs.publicFields].map(field=>`o.${field} as ong.${field}`)))
            .innerJoin('ongs as o', 'o.id', 'i.ong_id')
            .from('incidents as i')
            .limit(max)
            .offset(offset)
        :
        [];
        return {
            count,
            results,
        }
    },
    async delete({id, ong_id}){
        return await connection('incidents')
            .where({ong_id, id})
            .delete();
    }
}