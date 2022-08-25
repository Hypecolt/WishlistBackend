const profileServices = require('../services/profileServices.js')

const getProfile = async (req, res, next) => {
    try {
        //verific daca are userDetails completat
        res.json(await profileServices.getProfile(req.auth.id));
        //res.json({message : "bines"});
    } catch (err) {
      console.error(`Error while getting users`);
      next(err);
    }
  };

module.exports = {getProfile};