const wishlistServices = require('./wishlistServices.js');
const groupServices = require('./groupServices.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const checkUserInGroup = async (userid, groupid) => {

    if(!await groupServices.getGroup(groupid)){
        throw Error("No group found");
    }

    const found = await prisma.useringroup.findFirst({
        where:{
            AND:[
                {userid: userid},
                {groupid: groupid}
            ]
        }
    }).catch((err) => { throw Error("User is not in group") })

    return true;

};

const checkWishlistInGroup = async (groupid, wishlistid) => {
    const found = await prisma.groupwishlists.findFirst({
        where:{
            AND:[
                {groupId: groupid},
                {wishlistId:wishlistid},
                {deletetime: null}
            ]
        }
    }).catch((err) => { return false; })

    return true;
};

const getGroupWishlists = async (id) => {
    const wishlists = await prisma.group.findFirst({
        where:{
            AND:[
                {id: id},
                {deletetime: null}
            ]
        },
        select:{
            id: true,
            owner: true,
            name: true,
            groupwishlists:{
                where:{
                    deletetime: null
                },
                select:{
                    wishlist:{
                        select:{
                            users:{
                                select:{
                                    username:true
                                }
                            },
                            ownerId:true,
                            name:true,
                            // itemsinwishlist:{
                            //     where:{
                            //         bought: false
                            //     },
                            //     select:{
                            //         items:{
                            //             select:{
                            //                 name:true,
                            //                 details:true,
                            //                 size:true
                            //             }
                            //         }
                            //     }
                            // }
                        }
                    }
                }
            }
        }
    })
    return wishlists;
};

const addWishlistToGroup = async (groupid, wishlistid, userid) =>{

    if(!await wishlistServices.getWishlist(wishlistid, userid)){
        throw Error("No wishlist found");
    }

    await checkUserInGroup(userid, groupid);

    if(await checkWishlistInGroup(groupid, wishlistid)){
        throw Error("Wishlist already in group");
    }

    const wishlist = await prisma.groupwishlists.create({
        data: {
            groupId: groupid,
            wishlistId: wishlistid
        }
    }).catch((err) => {console.log(err);})

    return wishlist;
};

const removeWishlistFromGroup = async (groupid, wishlistid, userid) => {

    if(!await wishlistServices.getWishlist(wishlistid, userid)){
        throw Error("No wishlist founsdfd");
    }

    await checkUserInGroup(userid, groupid);

    if(!await checkWishlistInGroup(groupid, wishlistid)){
        throw Error("Wishlist not in group");
    }

    const wishlist = await prisma.groupwishlists.updateMany({
        where:{
            AND:[
                {groupId: groupid},
                {wishlistId: wishlistid}
            ]
        },
        data:{
            deletetime: new Date(Date.now()).toISOString()
        }
    }).catch((err) => {console.log(err);})

    return wishlist;
};

module.exports = { getGroupWishlists, addWishlistToGroup, removeWishlistFromGroup, checkUserInGroup };