const nodemailer = require('nodemailer');
const invitationsServices = require('../services/invitationsServices.js');
const groupServices = require ('../services/groupServices.js');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
});

const sendInvite = async (req, res, next) => {
    
    try {

        if(!req?.params?.groupid){
            res.status(400).send("No group selected");
            return;
        }

        if(!req?.body?.toinvite){
            res.status(400).send("No person invited");
            return;
        }

        const groupid = parseInt(req.params.groupid);
        
        if(!await groupServices.getGroup(groupid)){
            res.status(400).send("No group found");
            return;
        }

        const group = await groupServices.getGroup(groupid);
        const code = await invitationsServices.getInviteCode(req.auth.id, groupid);
        
        if(!code){
            res.status(400).send("Group has no invite link!");
            return;
        }

        const link = 'http://localhost:3000/groups/' + req.params.groupid + '/join/' + code.code;

        var mailOptions = {
            from: process.env.EMAIL,
            to: req.body.toinvite,
            subject: 'Join the "' + group.name + '" group',
            text: 'You have been invited to join ' + group.name + '.\nPlease use the following link:\n' + link
        };
      
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        console.log("mail sent");
        res.send(link);

    }
    catch (err){
        res.status(400).send(err.message);
        return;
    }
}

const createInvite = async (req, res, next) => {
    try {
        if(!req?.params?.groupid){
            res.status(400).send("No group selected");
            return;
        }

        const code = await invitationsServices.createInvite(req.auth.id, parseInt(req.params.groupid));

        if(!code){
            res.status(500);
            return;
        }

        const link = 'http://localhost:3000/groups/' + req.params.groupid + '/join/' + code.code;
        res.send(link);
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
}

const acceptInvite = async (req, res, next) => {
    try {

        if(!req?.params?.invitationcode){
            res.status(400).send("No invitation code provided");
            return;
        }

        const accepted = await invitationsServices.acceptInvite(req.auth.id, req.params.invitationcode);
        console.log(accepted);
        res.send(accepted);
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
}

const deleteInvite = async (req, res, next) => {
    try {
        if(!req?.params?.groupid){
            res.status(400).send("No group selected");
            return;
        }

        const deleted = await invitationsServices.deleteInvite(req.auth.id, parseInt(req.params.groupid))
        res.send(deleted)
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
}

module.exports = { sendInvite, createInvite, acceptInvite, deleteInvite }