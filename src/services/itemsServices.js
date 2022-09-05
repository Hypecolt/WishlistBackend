const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addItem = async (name, details, size, userId) => {
    const item = await prisma.items.create({
        data: {
          name: name,
          details: details,
          size: size,
          userId: userId
        }
    });
    return item;
};

const getItem = async (id) => {
    const item = await prisma.items.findFirst({
        where: {
            AND:[
                {id: id},
                {deletetime: null}
            ]
        }
    }).catch((err) => { throw Error("Item does not exist!") })
    return item;
};

const updateItem = async (id, name, details, size) => {
    const item = await prisma.items.update({
        where: {
            AND:[
                {id: id},
                {deletetime: null}
            ]
        },
        data: {
            name,
            details,
            size
        }
    }).catch((err) => { throw Error("Item does not exist!")})
    return item;
};

const getAll = async (id) => {
    const users = await prisma.items.findMany({
        where:{
            AND:[
                {userId: id},
                {deletetime: null}
            ]
        }
    })
    return users;
};

const deleteItem = async (id) => {
    const item = await prisma.items.update({
        where: {
            AND:[
                {id: id},
                {deletetime: null}
            ]
        },
        data:{
          deletetime: new Date(Date.now()).toISOString()
        }
    }).catch((err) => { throw Error("Item does not exist!")});
    return item;
};

module.exports = { addItem, getItem, updateItem, getAll, deleteItem };