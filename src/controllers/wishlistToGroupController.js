const wishlistToGroupServices = require('../services/wishlistToGroupServices.js')

const getGroupWishlists = async (req, res, next) => {
    try {
      
      if(!req?.params?.groupid){
        res.status(400).send("No group selected!");
        return;
      }

      const response = await wishlistToGroupServices.getGroupWishlists(parseInt(req.params.groupid));
      
      res.send(response);
    } catch (err) {
        console.log(err);
        res.status(400).send("No group found!");
        return;
    }
};

const addWishlistToGroup = async (req, res, next) => {
    try {

        if (!req?.params?.groupid) {
            res.status(400).send("No group selected");
            return;
        }

        if (!req?.body?.wishlistid) {
            res.status(400).send("No wishlist selected");
            return;
        }

        const wishlistid = parseInt(req.body.wishlistid);

        res.json(await wishlistToGroupServices.addWishlistToGroup(parseInt(req.params.groupid), wishlistid, req.auth.id));
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
};

const removeWishlistFromGroup = async (req, res, next) => {
    try {
        if(!req?.params?.wishlistid){
            res.status(400).send("No wishlist selected!");
            return;
        }

        await wishlistToGroupServices.removeWishlistFromGroup(parseInt(req.params.groupid), parseInt(req.params.wishlistid), req.auth.id);
        res.send("Wishlist deleted");
    } catch (err) {
        console.log(err);
        res.status(400).send("No wishlist found!");
        return;
    }
};

module.exports = { getGroupWishlists, addWishlistToGroup, removeWishlistFromGroup };