const notificationsServices = require('../services/notificationsServices.js');
const nodeCron = require("node-cron");

const watcher = () => {
    const job = nodeCron.schedule("* * 00 * * *", function jobYouNeedToExecute() {
        const dob = notificationsServices.checkDob();
    });
    
    job.start()
}

module.exports = { watcher };