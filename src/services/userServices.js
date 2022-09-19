const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')

const prisma = new PrismaClient();

const checkLogin = async (username, password) =>{

  const found = await prisma.users.findFirst({
    where:{
      AND: [
        {OR: [
          {
            username: username
          },
          {
            email: username
          }
        ]},
        {deletetime: null}
      ]
    },
    select:{
      id: true,
      password: true
    },
  }).then((response) => {
    if(!response){
      throw Error("User does not exist");
    }
    
    if(!bcrypt.compareSync(password, response.password)){
      throw Error("Wrong Password");
    }

    const token = jwt.sign(
      {
        id: response.id
      },
      process.env.TOKEN_KEY,
      // {
      //   expiresIn: "2h",
      // }
    );

    return token;
  }).catch((err) => {throw Error(err.message)});

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
    return username;
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
    return email;
  }
};

const addUser = async (username, email, hash) => {
  const user = await prisma.users.create({
      data: {
        username: username,
        email: email,
        password: hash
      }
  });
  return user;
};

const getUser = async (id) => {
  const user = await prisma.users.findUnique({
      where: {
          id: id
      },
      select:{
        username: true
      }
  })
  return user;
};

const updateUser = async (id, username, email) => {
  const user = await prisma.users.update({
      where: {
          id: id
      },
      data: {
          username,
          email
      }
  })
  return user;
};

const deleteUser = async (id) => {
  const randelete = uuid.v4();
  const user = await prisma.users.update({
      where: {
          id: id
      },
      data:{
        username: randelete,
        email: randelete,
        password: randelete,
        deletetime: new Date(Date.now()).toISOString()
      }
  });
  return user;
};






//

const getAll = async () => {
  console.log(new Date(Date.now()).toISOString())
  const users = await prisma.users.findMany()
  return users;
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser, checkLogin, checkUsername, checkEmail };
