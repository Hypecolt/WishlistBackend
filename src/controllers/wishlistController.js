const wishlistServices = require('../services/wishlistServices.js')

const createWishlist = async (req, res, next) => {
    try {

        if (!req?.body?.wishlistname) {
            res.status(400).send("No name provided");
            return;
        }

        const name = req.body.wishlistname;

        await wishlistServices.createWishlist(req.auth.id, name)
        res.json("Wishlist created successfully");
    } catch (err) {
        res.status(400).send(err);
        return;
    }
};

const getWishlists = async (req, res, next) => {
    try {
      res.json(await wishlistServices.getAll(req.auth.id));
    } catch (err) {
        res.status(400).send("No wishlists found");
        return;
    }
};

const updateWishlist = async (req, res, next) => {
    try {
      const id = req.auth.id
      const wishlist = await wishlistServices.getAll(id);

      let wishlistnameAvailable;
  
      if (!req?.body?.name) {
        res.status(400).send("No changes made");
        return;
      }
  
      if (!wishlist) {
          res.status(400).send("No wishlists found");
          return;
      }
  
      if(req?.body?.name){
        wishlistnameAvailable = await wishlistServices.checkWishlistname(req.body.name);
      }
  
      if(!wishlistnameAvailable){
        res.status(400).send("Wishlistname already in use!");
        return;
      }
  
      if(!req?.params?.wishlistid){
        res.status(400).send("No wishlist selected!");
        return;
      }

      const response = await wishlistServices.updateWishlist(parseInt(req.params.wishlistid), req.body.name);
      
      res.send(response);
    } catch (err) {
        res.status(400).send("No wishlist found!");
        return;
    }
};

const deleteWishlist = async (req, res, next) => {
    try {
        if(!req?.params?.wishlistid){
            res.status(400).send("No wishlist selected!");
            return;
        }

        await wishlistServices.deleteWishlist(parseInt(req.params.wishlistid));
        res.send("Wishlist deleted");
    } catch (err) {
        res.status(400).send("No wishlist found!");
        return;
    }
};

module.exports = { getWishlists, createWishlist, updateWishlist, deleteWishlist };