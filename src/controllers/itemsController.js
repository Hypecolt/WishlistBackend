const itemsServices = require('../services/itemsServices.js');

const addItem = async (req, res, next) => {
    try {
  
      if (!req?.body?.name) {
        res.status(400).send("No name provided");
        return;
      }
  
      if (!req?.body?.details) {
        res.status(400).send("No details provided");
        return;
      }
  
      let size

      if(req?.body?.size){
        size = req.body.size;
      }

      const name = req.body.name;
      const details = req.body.details;

      const newItem = await itemsServices.addItem(name, details, size, req.auth.id);
  
      console.log("created");
  
      res.json("created");
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to add item");
        return;
    }
};

const updateItem = async (req, res, next) => {
    try {

      if(!req?.params?.id){
        res.status(400).send("No item selected");
        return;
      }
      const id = parseInt(req.params.id)
      const itemFound = await itemsServices.getItem(id);
  
      let name, details, size;
  
      if (!req?.body?.name && !req?.body?.details && !req?.body?.size) {
        res.status(400).send("No changes made");
        return;
      }
  
      if (!itemFound) {
          res.status(400).send("No item found");
          return;
      }
  
      name = req.body.name;
      details = req.body.details;
      size = req.body.size;

      const item = await itemsServices.updateItem(id, name, details, size);
      
      res.send(item);
    } catch (err) {
        next(err);
    }
};

const getItem = async (req, res, next) => {
    try {
      if (!req?.params?.id) {
        throw { message: "No item selected" };
      }
  
      const response = await itemsServices.getItem(parseInt(req.params.id));
  
      if (!response) {
        throw { message: "No item found" };
      }
  
      res.json(response);
    } catch (err) {
      console.error(`Error while getting items`);
      next(err);
    }
};
  
const getItems = async (req, res, next) => {
    try {
      res.json(await itemsServices.getAll(req.auth.id));
    } catch (err) {
      console.error(`Error while getting users`);
      next(err);
    }
};

const deleteItem = async (req, res, next) => {
    try {

        if(!req?.params?.id){
            res.status(400).send("No item found");
            return;
        }

        const item = await itemsServices.deleteItem(parseInt(req.params.id));
        res.send(item);

    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
};

module.exports = { addItem, updateItem, getItem, getItems, deleteItem };