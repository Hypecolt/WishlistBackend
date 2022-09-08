const userServices = require('../services/userServices.js')
const bcrypt = require("bcrypt");

//verify user
const login = async (req, res, next) => {
  try {

    if (!req?.body?.login) {
      res.status(400).send("No username or email provided");
      return;
    }

    if (!req?.body?.password) {
      res.status(400).send("No password provided");
      return;
    }

    const login = req.body.login;
    const password = req.body.password;

    const response = await userServices.checkLogin(login, password);

    res.json(response);
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
};

//add user
const register = async (req, res, next) => {
  try {

    if (!req?.body?.username) {
      res.status(400).send("No username provided");
      return;
    }

    if (!req?.body?.email) {
      res.status(400).send("No email provided");
      return;
    }

    if (!req?.body?.password) {
      res.status(400).send("No password provided");
      return;
    }


    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const usernameAvailable = await userServices.checkUsername(username);
    const emailAvailable = await userServices.checkEmail(email);

    if(!usernameAvailable){
      res.status(400).send("Username already in use!");
      return;
    }

    if(!emailAvailable){
      res.status(400).send("Email already in use!");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await userServices.addUser(username, email, hash);

    console.log("created");

    res.json(newUser);
  } catch (err) {
    res.send(500);
    next(err);
  }
};

//update user
const updateUser = async (req, res, next) => {
  try {
    const id = req.auth.id
    const user = await userServices.getUser(id);

    let usernameAvailable, emailAvailable;

    console.log(user)

    if (!req?.body?.username && !req?.body?.email) {
      res.status(400).send("No changes made");
      return;
    }

    if (!user) {
        res.status(400).send("No user found");
        return;
    }

    if(req?.body?.username){
      usernameAvailable = await userServices.checkUsername(req.body.username);
    } else {
      emailAvailable = await userServices.checkEmail(req.body.email);
    }

    if(!usernameAvailable){
      res.status(400).send("Username already in use!");
      return;
    }

    if(!emailAvailable){
      res.status(400).send("Email already in use!");
      return;
    }

    await userServices.updateUser(id, req.body.username, req.body.email);
    
    res.send("User updated");
  } catch (err) {
      next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
      await userServices.deleteUser(req.auth.id);
      res.send("User deleted");
  } catch (err) {
    res.status(400).send("No changes made");
    return;
  }
};

//get all users
const getUsers = async (req, res, next) => {
  try {
    res.json(await userServices.getAll());
  } catch (err) {
    console.error(`Error while getting users`);
    next(err);
  }
};

//get specific user
const getUser = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const response = await userServices.getUser(parseInt(req.params.id));

    if (!response) {
      throw { message: "No user found" };
    }

    res.json(response);
  } catch (err) {
    console.error(`Error while getting user`);
    next(err);
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser, login, register };
