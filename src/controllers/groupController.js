const groupServices = require('../services/groupServices.js')

const createGroup = async (req, res, next) => {
    try {
      if (!req?.body?.groupname) {
        res.status(400).send("No name provided");
        return;
      }

      const name = req.body.groupname;

      const response = await groupServices.createGroup(req.auth.id, name);

      res.json(response);
    } catch (err) {
      next(err);
    }
};

const getGroups = async (req, res, next) => {
  try {
    res.json(await groupServices.getUserGroups(req.auth.id));
  } catch (err) {
    console.error(`Error while getting users`);
    next(err);
  }
};

const deleteGroup = async (req, res, next) => {
  try {

      if (!req?.body?.groupid) {
        res.status(400).send("No group selected");
        return;
      }

      const group = await groupServices.deleteUserGroup(req.body.groupid, req.auth.id);
      
      res.send(group);
  } catch (err) {
    console.log(err);
    res.status(400).send("No changes made");
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

    if (!req?.body?.groupid) {
        res.status(400).send("No group selected");
        return;
    }

    const group = await groupServices.getGroup(req.body.groupid);

    if (!group) {
      res.status(400).send("No group found");
      return;
    }

    await groupServices.updateGroup(req.body.groupid, req.auth.id, req.body.groupname);
    
    res.send("Group updated");
  } catch (err) {
      next(err);
  }
};

module.exports = {createGroup, getGroups, deleteGroup, updateGroup};