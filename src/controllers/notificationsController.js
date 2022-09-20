const notificationsServices = require('../services/notificationsServices.js');
const nodeCron = require("node-cron");

const watcher = async () => {
    const job = nodeCron.schedule("* * 00 * * *", function jobYouNeedToExecute() {
        const dob = notificationsServices.checkDob();
    });
    
    job.start()
}

const getNotification = async (req, res, next) => {
    try {
        res.json(await notificationsServices.getNotification(req.auth.id))
    } catch (err) {
        res.status(500).send(err.message);
        return;
    }
}

module.exports = { watcher, getNotification };