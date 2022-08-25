const groupServices = require('./groupServices.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUsername = async (id) => {
    const found = await prisma.users.findUnique({
        where:{
            id: id
        },
        select:{
            username: true
        }
    })

    return found;
}

const checkUserdetails = async (id) => {
    const found = await prisma.userdetails.findUnique({
        where:{
            id: id
        },
        select:{
            firstName: true,
            lastName: true,
            dob: true,
            friends: true,
            addressId: true
        }
    })
    //json cu grupuri, wishlist, friends, dob, country, city
    return found ? true : false;
}

const getUseraddress = async (id) => {
    const found = await prisma.useraddress.findUnique({
        where:{
            id: id
        },
        select:{
            country: true,
            city: true
        }
    })

    return found;
}

const getProfile = async (id) => {
    //get data for payload
    const groups = await Promise.resolve(groupServices.getUserGroups(id))
    const username = await Promise.resolve(getUsername(id))
    
    //create payload to send
    const payload = {
        username: username.username,
        dob: 2,
        country: "t",
        city:"t",
        groups:[],
        wishlists:[],
        friends:[]

    }

    //add user groups to payload
    for( let i = 0 ; i < Object.keys(groups).length ; i++ ){
        payload['groups'].push({
            owner: groups[i].group.owner,
            name: groups[i].group.name
        })
    }

    console.log(payload)
    return groupServices.getUserGroups(id);
}

module.exports = {getUsername, checkUserdetails, getUseraddress, getProfile};