module.exports = (app) => {
  const UserControllers = require("../Controllers/UsersController");
  const User = require("../Models/UsersModel.js");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const multer = require("multer");
  const multerConfig = require("../Config/multer");
  const authConfig = require("../Config/auth.json");

  
  app.post("/auth", UserControllers.Auth);

  app.get("/users", UserControllers.showAll);

  // app.delete('/product/:id', UserControllers.destroy)

  app.post("/user", UserControllers.store);

  // app.post('/product/:id/files', multer(multerConfig).single('file'), FileController.store)

  app.get("/", (req, res) => {
    return res.json({ message: "Api Running" });
  });
};
