const itemToWishlistServices = require('../services/itemToWishlistServices.js');
const itemsServices = require('../services/itemsServices.js');
const wishlistServices = require('../services/wishlistServices.js');

//add item to wishlist
const addItemToWishlist = async (req, res, next) => {
    try {
  
      if (!req?.body?.id) {
        res.status(400).send("No wishlist selected");
        return;
      }
  
      if (!req?.body?.itemId) {
        res.status(400).send("No item selected");
        return;
      }

      const wishlistId = req.body.id;
      const itemId = req.body.itemId;

      await itemsServices.getItem(itemId);

      const newItem = await itemToWishlistServices.addItemToWishlist(wishlistId, itemId);
  
      console.log("created");
  
      res.json(newItem);
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
};

//get item in wishlist

//get items in wishlist
const getItemsInWishlist = async (req, res, next) => {
    try {
        if (!req?.body?.id) {
            res.status(400).send("No wishlist selected");
            return;
        }

        const query = await itemToWishlistServices.getItemsInWishlist(req.body.id)

        res.json(query);
    } catch (err) {
      console.error(`Error while getting users`);
      next(err);
    }
};

//remove item from wishlist
const deleteItemFromWishlist = async (req, res, next) => {
    try {

        if (!req?.body?.id) {
            res.status(400).send("No wishlist selected");
            return;
          }
      
        if (!req?.body?.itemId) {
        res.status(400).send("No item selected");
        return;
        }

        const item = await itemToWishlistServices.deleteItemFromWishlist(req.body.id, req.body.itemId);
        res.send(item);

    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
};

//update item in wishlish
const updateItemFromWishlist = async (req, res, next) => {
    try {

        if (!req?.body?.id) {
            res.status(400).send("No wishlist selected");
            return;
          }
      
        if (!req?.body?.itemId) {
        res.status(400).send("No item selected");
        return;
        }

        const item = await itemToWishlistServices.updateItemFromWishlist(req.body.id, req.body.itemId);
        res.send(item);

    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
};

module.exports = { addItemToWishlist, getItemsInWishlist, deleteItemFromWishlist, updateItemFromWishlist };