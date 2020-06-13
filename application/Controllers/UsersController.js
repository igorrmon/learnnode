const User = require("../Models/UsersModel.js");
const jwt = require("jsonwebtoken");
const authConfig = require("../Config/auth.json");

function generateToken(userId) {
  return jwt.sign({ id: userId }, authConfig.secret, {
    expiresIn: 86400,
  });
}

class UsersControllers {
  async store(req, res) {
    const response = req.body;
    const data = await User.create(response);
    data.password = undefined;
    return res.send({data,token: generateToken(data.id)});
  }
  async Auth(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json({ error: "Invalid email" });
    }
    // if(!await bcrypt.compare(password, user.password )){
    //      return res.status(400).send({error: 'error password'})
    // }
    if (password != user.password) {
      return res.json({ error: "Invalid Password" });
    }
    user.password = undefined; //removendo password
    res.status(200).send({ user, token: generateToken(user.id) });
  }
  async showAll(req, res) {
    const users = await User.findOne().sort("-createdAt");

    return res.json(users);
  }
  // async destroy(req, res) {
  //     const { id } = req.params;
  //     await User.findByIdAndDelete(id);
  //     return res.send("Deletado");
  // }
}

module.exports = new UsersControllers();
