const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    cpf: String,
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: String,
    address: {
      name: String,
      complement: String,
      state: String,
      city: String,
      neighborhood: String,
      cep: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", Users);
