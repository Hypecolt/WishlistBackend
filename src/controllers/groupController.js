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

module.exports = {createGroup};