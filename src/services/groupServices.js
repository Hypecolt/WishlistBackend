const uuid = require('uuid')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkNameAvailability = async (name) =>{
  const found = await prisma.group.findUnique({
    where:{
        name: name
    }
  }).catch((err) => {return false;})

  if(found){
    return true;
  }

}

const createUserInGroup = async (userid, groupid) => {
  const found = await prisma.useringroup.create({
    data:{
      userid: userid,
      groupid: groupid
    }
  })
  return found;
}

const createGroup = async (userid, groupname) => {

    if(checkNameAvailability(groupname)){
      throw Error("Name is already taken");
    }

    const group = await prisma.group.create({
        data: {
          owner: userid,
          name: groupname
        }
    }).then((response) => {
      createUserInGroup(response.owner, response.id)
    });
    return group;
  };

  const getGroup = async (id) => {
    const group = await prisma.group.findUnique({
        where: {
            id: id
        }
    })
    return group;
};

const getUserGroups = async (id) => {
  const found = await prisma.useringroup.findMany({
      where:{
          userid: id
      },
      include:{
          group:true
      }
  })

  return found;
}

const deleteUserGroup = async (id, userid) =>{
  const randelete = uuid.v4();
  const group = await prisma.group.updateMany({
      where: {
          AND:[
            {id: id},
            {owner: userid},
            {deletetime: null}
          ]
      },
      data:{
        name: randelete,
        deletetime: new Date(Date.now()).toISOString()
      }
  });
  return group;
}

const updateGroup = async (id, userid, name) => {

  if(await checkNameAvailability(name)){
    throw Error("Name is already taken");
  }

  const user = await prisma.group.updateMany({
      where: {
        AND:[
          {id: id},
          {owner: userid},
          {deletetime: null}
        ]
      },
      data: {
          name: name
      }
  })
  return user;
};

module.exports = {createGroup, getUserGroups, deleteUserGroup, updateGroup, getGroup};