const groupServices = require('../services/groupServices.js')

const createGroup = async (req, res, next) => {
    try {
      if (!req?.body?.groupname) {
        throw { message: "No name provided" };
      }

      const name = req.body.groupname;

      const response = await groupServices.createGroup(req.auth.id, name);

      res.json(response);
    } catch (err) {
      next(err);
    }
  };

module.exports = {createGroup};