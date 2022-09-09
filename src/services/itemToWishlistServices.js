const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//check wishlist exists
const checkWishlistExists = async (wishlistid) => {
    const found = await prisma.wishlist.findUnique({
      where:{
        id: wishlistid
      },
    }).catch((err) => {return false; })
    if(found){
      return true;
    }
};

//add item to wishlist
const addItemToWishlist = async (wishlistId, itemId) => {
    const item = await prisma.itemsinwishlist.create({
        data: {
          wishlistId: wishlistId,
          itemId: itemId,
          bought: false
        }
    });
    return item;
};

//get item in wishlist

//get items in wishlist
const getItemsInWishlist = async (wishlistId) => {
    const item = await prisma.itemsinwishlist.findMany({
        where: {
            AND:[
                {wishlistId: wishlistId},
                {deletetime: null}
            ]
        },
        select:{
            bought: true,
            items: true
        }
    }).catch((err) => { throw Error("Item does not exist!") })
    return item;
};

//remove item from wishlist
const deleteItemFromWishlist = async (wishlistId, itemId) => {
    const item = await prisma.itemsinwishlist.updateMany({
        where: {
            AND:[
                {wishlistId: wishlistId},
                {itemId: itemId},
                {deletetime: null}
            ]
        },
        data:{
          deletetime: new Date(Date.now()).toISOString()
        }
    }).catch((err) => { throw Error("Item does not exist!")});
    return item;
};

//update item in wishlist
const updateItemFromWishlist = async (wishlistId, itemId) => {
    const item = await prisma.itemsinwishlist.updateMany({
        where: {
            AND:[
                {wishlistId: wishlistId},
                {itemId: itemId},
                {bought: false},
                {deletetime: null}
            ]
        },
        data:{
          bought: true
        }
    }).catch((err) => { throw Error("Item does not exist!")});
    return item;
};

module.exports = { addItemToWishlist, getItemsInWishlist, deleteItemFromWishlist, updateItemFromWishlist, checkWishlistExists };