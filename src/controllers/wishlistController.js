const wishlistServices = require('../services/wishlistServices.js')

const createWishlist = async (req, res, next) => {
    try {

        if (!req?.body?.wishlistname) {
            throw { message: "No name provided" };
        }

        const name = req.body.wishlistname;

        res.json(await wishlistServices.createWishlist(req.auth.id, name));
    } catch (err) {
        console.error(`Oopsie`);
        next(err);
    }
};

const getWishlists = async (req, res, next) => {
    try {
      res.json(await wishlistServices.getAll(req.auth.id));
    } catch (err) {
      console.error(`Error while getting users`);
      next(err);
    }
};

module.exports = { getWishlists, createWishlist };