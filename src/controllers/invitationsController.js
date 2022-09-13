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

const sendMail = async (req, res, next) => {
    
    try {
        const groupid = parseInt(req.params.groupid);
        
        const group = await groupServices.getGroup(groupid);
        console.log(group.name)
        const code = await invitationsServices.getInviteCode(req.auth.id, groupid);
        const link = 'http://localhost:3000/groups/' + req.params.groupid + '/join/' + code.code;

        var mailOptions = {
            from: process.env.EMAIL,
            to: 'ant.alex97@yahoo.com',
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
        res.send("mail sent");

    }
    catch (err){
        res.status(400).send(err.message);
        return;
    }
}

const createInvite = async (req, res, next) =>{
    try {
        const code = await invitationsServices.createInvite(req.auth.id, parseInt(req.params.groupid));
        const link = 'http://localhost:3000/groups/' + req.params.groupid + '/join/' + code.code;
        res.send(link);
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
}

module.exports = { sendMail, createInvite }