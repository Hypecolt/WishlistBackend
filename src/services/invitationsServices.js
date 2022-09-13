const uuid = require('uuid')
const wishlistToGroupServices = require('./wishlistToGroupServices.js')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkInviteExists = async (groupid) => {
    const found = await prisma.invites.findFirst({
        where:{
            groupid: groupid
        }
    })

    if(found){
        return true;
    }
}

const createInvite = async (userid, groupid) => {
    await wishlistToGroupServices.checkUserInGroup(userid, groupid);

    if(await checkInviteExists(groupid)){
        throw Error("Group already has an invite link");
    } else {
        const invite = await prisma.invites.create({
            data:{
                code: uuid.v4(),
                groupid: groupid
            }
        })

        return invite;
    }

}

const getInviteCode = async (userid, groupid) => {
    await wishlistToGroupServices.checkUserInGroup(userid, groupid);

    const invite = await prisma.invites.findFirst({
        where:{
            groupid: groupid
        },
        select:{
            code: true
        }
    })

    return invite;
}

module.exports = { createInvite, getInviteCode };