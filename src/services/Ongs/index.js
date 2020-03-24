const crypto = require('crypto');
const connection = require('../../database/connection');

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
        return await connection
            .select('*')
            .from('ongs')
            .limit(max)
            .offset(offset);
    }
}