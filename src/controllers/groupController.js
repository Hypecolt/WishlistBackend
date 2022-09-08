const groupServices = require('../services/groupServices.js')

const createGroup = async (req, res, next) => {
    try {
      if (!req?.body?.groupname) {
        res.status(400).send("No name provided");
        return;
      }

      const name = req.body.groupname;

      const response = await groupServices.createGroup(req.auth.id, name);

      res.send("Group created successfully!");
    } catch (err) {
      res.status(500);
        next(err);
    }
};

const getGroups = async (req, res, next) => {
  try {

    const groups = await groupServices.getUserGroups(req.auth.id);

    if(groups.length == 0){
      res.json("User has no groups");
    } else {
      res.json(groups);
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    next(err);
  }
};

const deleteGroup = async (req, res, next) => {
  try {

      if (!req?.params?.id) {
        res.status(400).send("No group selected");
        return;
      }

      const id = parseInt(req.params.id);

      await groupServices.deleteUserGroup(id, req.auth.id);
      
      res.send("Group deleted successfully!");
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
};

//update group
const updateGroup = async (req, res, next) => {
  try {

    if (!req?.body?.groupname) {
      res.status(400).send("No changes made");
      return;
    }

    if (!req?.params?.id) {
        res.status(400).send("No group selected");
        return;
    }

    const id = parseInt(req.params.id);

    const group = await groupServices.getGroup(id);

    if (!group) {
      res.status(400).send("No group found");
      return;
    }

    await groupServices.updateGroup(id, req.auth.id, req.body.groupname);

    res.send("Group updated successfully!");
  } catch (err) {
    res.status(500);
      next(err);
  }
};

const getGroup = async (req, res, next) => {
  try {
    if (!req?.params?.id) {
      throw { message: "No parameter provided" };
    }

    const response = await groupServices.getGroup(parseInt(req.params.id));

    if (!response) {
      throw { message: "No group found" };
    }

    res.json(response);
  } catch (err) {
    res.status(500);
    next(err);
  }
};

module.exports = {createGroup, getGroups, getGroup, deleteGroup, updateGroup};