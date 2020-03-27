const connection = require("../database/connection");
const crypto = require("crypto");
module.exports = {
  async create(request, response) {
    const { name, email, telemovel, city, codigopostal } = await request.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("ongs").insert({
      id,
      name,
      email,
      city,
      telemovel,
      codigopostal
    });

    return response.json({ id });
  },
  async index(request, response) {
    const ongs = await connection("ongs").select("*");
    return response.json(ongs);
  }
};
