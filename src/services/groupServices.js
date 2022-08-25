const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUserInGroup = async (userid, groupid) => {
  const found = await prisma.useringroup.create({
    data:{
      userid: userid,
      groupid: groupid,
      createtime: Date.now()
    }
  })
  return found;
}

const createGroup = async (userid, groupname) => {

    const found = await prisma.group.findUnique({
        where:{
            name: groupname
        }
    })

    if(found){
      throw Error("Name is already taken");
    }

    const group = await prisma.group.create({
        data: {
          owner: userid,
          name: groupname,
          createtime: Date.now()
        }
    }).then((response) => {
      createUserInGroup(response.owner, response.id)
    });
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

module.exports = {createGroup, getUserGroups};