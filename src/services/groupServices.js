const uuid = require('uuid')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const removeUsersFromGroup = async (groupid) => {
  const removed = await prisma.useringroup.updateMany({
    where:{
      groupid:groupid
    },
    data:{
      deletetime: new Date(Date.now()).toISOString()
    }
  })
}

const checkNameAvailability = async (name) =>{
  const found = await prisma.group.findUnique({
    where:{
        name: name
    }
  }).catch((err) => {console.log(err); return false;})

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

    if(await checkNameAvailability(groupname)){
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
  const group = await prisma.group.findFirst({
      where: {
        AND:[
          {id: id},
          {deletetime: null}
        ]
      },
      select:{
        owner:true,
        name:true,
        useringroup:{
          select:{
            users:{
              select:{
                username: true,
                createtime: true
              }
            }
          }
        }
      }
  }).catch((err) => { return false; })
  return group;
};

const getUserGroups = async (id) => {
  const found = await prisma.group.findMany({
      where:{
        AND:[
          {owner: id},
          {deletetime: null}
        ]
      },
      select:{
        id:true,
        name:true,
        owner:true,
        useringroup:{
          select:{
            users:{
              select:{
                username:true
              }
            }
          }
        }
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
  if(!group.count){
    throw Error("No group found");
  }
  removeUsersFromGroup(id);
  return group;
}

const updateGroup = async (id, userid, name) => {

  if(await checkNameAvailability(name)){
    throw Error("Name is already taken");
  }

  const group = await prisma.group.updateMany({
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
  return group;
};

module.exports = {createGroup, getUserGroups, deleteUserGroup, updateGroup, getGroup};