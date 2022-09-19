const profileServices = require('../services/profileServices.js')
const { check } = require('express-validator');

const getProfile = async (req, res, next) => {
    try {
        //verific daca are userDetails completat
        res.json(await profileServices.getProfile(req.auth.id));
        //res.json({message : "bines"});
    } catch (err) {
      res.status(500).send(err.message);
      return;
    }
};

const createProfile = async (req, res, next) => {
  try {

    if(!req?.body?.firstName){
      res.status(400).send("No name provided");
      return;
    }
    if(!req?.body?.lastName){
      res.status(400).send("No name provided");
      return;
    }
    if(!req?.body?.phone){
      res.status(400).send("No phone number provided");
      return;
    }
    if(!req?.body?.dob){
      res.status(400).send("No date of birth provided");
      return;
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const date = req.body.dob;
    
    if(isNaN(new Date(date))){
      res.status(400).send("Invalid date format")
      return;
    }

    try {
      if(await profileServices.getProfile(req.auth.id)){
        res.status(400).send("User already has a profile set up")
        return;
      }
    } catch (error) {
      
    }

    await profileServices.createProfile(req.auth.id, firstName, lastName, phone, new Date(date).toISOString());

    res.json("Profile created")
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
}

const updateProfile = async (req, res, next) => {
  try {

    if(!req?.body?.firstName || !req?.body?.lastName || !req?.body?.phone){
      res.status(400).send("No changes made");
      return;
    }

    if(!await profileServices.getProfile(req.auth.id)){
      res.status(400).send("User has no profile set up")
      return;
    }

    await profileServices.updateProfile(req.auth.id, req.body.firstName, req.bodylastName, req.body.phone,);

    res.json("Profile updated")
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
}

module.exports = { getProfile, createProfile, updateProfile};