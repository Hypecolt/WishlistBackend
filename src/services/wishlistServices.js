const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
  
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
            name: wishlistname,
            createtime: Date.now()
          }
      })

      return wishlist;
    };

const getAll = async (id) => {
    const found = await prisma.wishlist.findMany({
        where:{
            ownerId: id
        }
    })

    return found;
}

module.exports = { getAll, createWishlist }