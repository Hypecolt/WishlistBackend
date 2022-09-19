const groupServices = require('./groupServices.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProfile = async (id, firstName, lastName, phoneNumber, dob) => {

    const profile = await prisma.userdetails.create({
        data:{
            userId: id,
            firstName: firstName,
            lastName: lastName,
            phone: phoneNumber,
            dob: dob
        }
    }).catch((err) => { throw Error("Phone number already in use") })

    return profile;
}

const getProfile = async (id) => {
    
    const profile = await prisma.userdetails.findFirstOrThrow({
        where:{
            userId: id
        },
        select:{
            firstName: true,
            lastName: true,
            phone: true,
            dob: true
        }
    }).catch((err) => { throw Error("User has no details") })

    return profile;
}

const updateProfile = async (id, firstName, lastName, phone) => {

    await prisma.userdetails.updateMany({
        where:{
            userId: id
        },
        data:{
            firstName: firstName,
            lastName: lastName,
            phone: phone
        }
    }).catch((err) => { throw Error("Phone number already in use") })
}

module.exports = { createProfile, updateProfile, getProfile};