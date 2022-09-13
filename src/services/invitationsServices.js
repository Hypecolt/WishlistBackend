const uuid = require('uuid')
const wishlistToGroupServices = require('./wishlistToGroupServices.js')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkInviteExists = async (groupid) => {
    const found = await prisma.invites.findFirst({
        where:{
            AND:[
                {groupid: groupid},
                {deletetime: null}
            ]
        }
    })

    if(found){
        return true;
    }
}

const createInvite = async (userid, groupid) => {
    if(!await wishlistToGroupServices.checkUserInGroup(userid, groupid)){
        throw Error("User is not in group");
    }

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
    if(!await wishlistToGroupServices.checkUserInGroup(userid, groupid)){
        throw Error("User is not in group");
    }

    const invite = await prisma.invites.findFirst({
        where:{
            AND:[
                {groupid: groupid},
                {deletetime: null}
            ]
        },
        select:{
            code: true
        }
    })

    return invite;
}

const acceptInvite = async (userid, invitecode) => {

    const groupToJoin = await prisma.invites.findFirst({
        where:{
            AND:[
                {code: invitecode},
                {deletetime: null}
            ]
        },
        select:{
            groupid: true
        }
    })

    if(!groupToJoin){
        throw Error("Invite code is invalid");
    }

    if(await wishlistToGroupServices.checkUserInGroup(userid, groupToJoin.groupid)){
        throw Error("User is already in group");
    }

    const group = await prisma.useringroup.create({
        data:{
            userid: userid,
            groupid: groupToJoin.groupid
        }
    })

    return group;
}

const deleteInvite = async (userid, groupid) => {
    if(!await wishlistToGroupServices.checkUserInGroup(userid, groupid)){
        throw Error("User is not in group");
    }

    const ownsGroup = await prisma.group.findFirst({
        where:{
            AND:[
                {id:groupid},
                {owner: userid},
                {deletetime: null}
            ]
        }
    })

    console.log(ownsGroup);

    if(!ownsGroup){
        throw Error("User is not the owner of the group!")
    }

    const deleted = await prisma.invites.updateMany({
        where:{
            groupid: groupid
        },
        data:{
            deletetime: new Date(Date.now()).toISOString()
        }
    })

    return deleted;

}

module.exports = { createInvite, getInviteCode, acceptInvite, deleteInvite };