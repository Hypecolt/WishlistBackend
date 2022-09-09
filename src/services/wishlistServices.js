const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkWishlistname = async (wishlistname) => {
    const found = await prisma.wishlist.findUnique({
      where:{
        name: wishlistname
      },
    })
    if(found){
      return false;
    } else {
      return wishlistname;
    }
};

const createWishlist = async (userid, wishlistname) => {
  
    const found = await prisma.wishlist.findUnique({
        where:{
            name: wishlistname
        }
    })

    if(found){
        throw Error("Name is already taken");
    }

    const wishlist = await prisma.wishlist.create({
        data: {
            ownerId: userid,
            name: wishlistname
        }
    })

    return wishlist;
};

const getAll = async (id) => {
    const found = await prisma.wishlist.findMany({
        where:{
            AND:[
                {ownerId: id},
                {deletetime: null}
            ]
        }
    })

    return found;
}

const getWishlist = async (id, ownerId) => {
    const found = await prisma.wishlist.findFirst({
        where:{
            AND:[
                {id:id},
                {ownerId: ownerId},
                {deletetime: null}
            ]
        }
    }).catch((err) => { return false; })

    return found;
}

const updateWishlist = async (id, name) => {
    const wishlist = await prisma.wishlist.update({
        where: {
            id: id
        },
        data: {
            name
        }
    }).catch(()=>{throw Error("No wishlist found!")})
    return wishlist;
};

const deleteWishlist = async (id) => {
    const wishlist = await prisma.wishlist.update({
        where: {
            id: id
        },
        data:{
          deletetime: new Date(Date.now()).toISOString()
        }
    });
    return wishlist;
};

module.exports = { getAll, createWishlist, updateWishlist, checkWishlistname, deleteWishlist, getWishlist }