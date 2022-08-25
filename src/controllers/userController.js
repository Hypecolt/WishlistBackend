const userServices = require('../services/userServices.js')
const fromString = require('uuidv4')
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {

    if (!req?.body?.login) {
      throw { message: "No username or email provided" };
    }

    if (!req?.body?.password) {
      throw { message: "No password provided" };
    }

    const login = req.body.login;
    const password = req.body.password;

    const response = await userServices.checkLogin(login, password);

    res.json(response);
  } catch (err) {
    res.status(500).send("Wrong username");
    //console.error(`Error while getting users`);
    next(err);
  }
};

const register = async (req, res, next) => {
  try {

    if (!req?.body?.username) {
      throw { message: "No username provided" };
    }

    if (!req?.body?.email) {
      throw { message: "No email provided" };
    }

    if (!req?.body?.password) {
      throw { message: "No password provided" };
    }


    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const usernameAvailable = await userServices.checkUsername(username);
    const emailAvailable = await userServices.checkEmail(email);

    if(!usernameAvailable){
      throw{ message: "Username already in use!" };
    }

    if(!emailAvailable){
      throw{ message: "Email already in use!" };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await userServices.addUser(username, email, hash);

    const response =  usernameAvailable && emailAvailable;

    console.log("created");

    res.json(response);
  } catch (err) {
    console.error(`Error while getting users`);
    next(err);
  }
};









//Add User
const addUser = async(req, res, next) => {
  try {
    if (!req?.body?.name) {
      throw { message: "No name provided" };
    }

    const secretId = fromString.fromString(req.body.name);

    const response = await userServices.addUser({
      name: req.body.name,
      secretId: secretId
    });

    res.json(response);
  } catch (err) {
    console.error(`Error while adding user`);
    next(err);
  }
};

//patch User
const updateUser = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const id = parseInt(req.params.id);
    const user = await userServices.getUser(id);

    if (!user) {
      throw { message: "User not found" };
    }

    const response = await userServices.updateUser(id, {
      name: req?.body?.name || user.name,
      secretId: user.secretId
    });

    res.json(response);
  } catch (err) {
    console.error(`Error while updating user`);
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    res.json(await userServices.getAll());
  } catch (err) {
    console.error(`Error while getting users`);
    next(err);
  }
};

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

module.exports = { getUsers, getUser, addUser, updateUser, login, register };
