const connection = require('../../database/connection');
const Ongs = require(`../../database/models/Ongs`);
const Crypto = require('crypto');

module.exports = {
    async create({name, email, whatsapp, city, uf, hex, iv}){
        const decipher = Crypto.createDecipheriv("aes-256-cbc", Buffer.from(email.repeat(Math.ceil(32 / email.length)).substring(0,32)), Buffer.from(iv, 'hex'));
        const decoded = decipher.update(hex, "hex", 'utf8') + decipher.final('utf8');
        const id = Crypto.randomBytes(16).toString('HEX');
        const cipher = Crypto.createCipheriv("aes-256-cbc", Buffer.from(id, 'utf8'), Buffer.from(id, 'hex'));
        const password = cipher.update(decoded, 'utf8', 'hex') + cipher.final('hex'); 
        await connection('ongs').insert(
            {
                id,
                name,
                email,
                whatsapp,
                city,
                uf,
                password,
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
    },
    async checkPassword({id, password}){
        return await connection
            .select([...Ongs.publicFields, ...Ongs.privateFields])
            .from('ongs')
            .where({id, password})
            .first()
    },
}