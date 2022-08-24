const fs = require('fs')
const path = require('path')
const datastore = require('../datastore.json')
const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const checkLogin = async (username, password) =>{

  const found = await prisma.users.findFirst({
    where:{
      OR: [
        {
          username: username
        },
        {
          email: username
        }
      ]
    },
    select:{
      id: true,
      password: true
    },
  }).then((response) => {
    if(!bcrypt.compareSync(password, response.password)){
      return "Wrong Password";
    }

    const token = jwt.sign(
      {
        id: response.id
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    return token;
  }).catch((err) => {console.log(err); return "Wrong user!"});

  return found;
};

const checkUsername = async (username) => {
  const found = await prisma.users.findUnique({
    where:{
      username: username
    },
  })
  if(found){
    return false;
  } else {
    return true;
  }
};

const checkEmail = async (email) => {
  const found = await prisma.users.findUnique({
    where:{
      email: email
    },
  })
  if(found){
    return false;
  } else {
    return true;
  }
};

const addUser = async (username, email, hash) => {
  const user = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hash,
        createtime: Date.now()
      }
  });
  return user;
};




//
const filterById = (id) => {
  return datastore.filter((user) => user.id === id);
};

const indexOfUser = (id) => {
  return datastore.indexOf(filterById(id)[0]);
};

const getAll = async () => {
  const users = await prisma.users.findMany()
  return users;
  // let timestmp = new Date(Date.now()).toLocaleDateString("en-US").toString() + " " + new Date(Date.now()).toLocaleTimeString("ro-RO").toString();
  // console.log(timestmp)
  // console.log(Date.now());
  // return JSON.parse(fs.readFileSync('./src/datastore.json'));
  //return datastore;
};

const getUser = async (id) => {
  return filterById(id)[0];
};

// const addUser = async (userInfo) => {
//   const newId = datastore[datastore.length - 1].id + 1;

//   datastore.push({
//     id: newId,
//     ...userInfo,
//   });

//   try {
//     fs.writeFileSync('./src/datastore.json', JSON.stringify(datastore))
//     return true;
//   } catch (error) {
//     return false;
//   }
  
// };

const updateUser = async (id, userInfo) => {
  const index = indexOfUser(id);

  if (index !== -1) {
    datastore[index] = { id: datastore[index].id, ...userInfo };
    fs.writeFileSync('./src/datastore.json', JSON.stringify(datastore))
    return datastore;
  } else {
    return "User not found";
  }
};

module.exports = { getAll, getUser, addUser, updateUser, checkLogin, checkUsername, checkEmail };
