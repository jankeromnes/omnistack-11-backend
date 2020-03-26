const crypto = require('crypto');
const connection = require('../../database/connection');
const Ongs = require(`../../database/models/Ongs`);

module.exports = {
    async create({name, email, whatsapp, city, uf}){
        const id = crypto.randomBytes(16).toString('HEX');
        await connection('ongs').insert(
            {
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            }
        );
        return id;
    },
    async listAll({offset, max}){
        const count = await connection('ongs').count();
        const results = count ? 
            await connection
                .select([...Ongs.publicFields])
                .from('ongs')
                .limit(max)
                .offset(offset)
            :
            [];
        return {
            count,
            results,
        }
    },
    async get({id}){
        return await connection
            .select([...Ongs.publicFields, ...Ongs.privateFields])
            .from('ongs')
            .where({id})
            .first()
    }
}