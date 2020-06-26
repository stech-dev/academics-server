const config = require('../config/sms.config.js');
const send = require('node-sms-horizon')(config.api);
const ejs = require('ejs');

registrationSucess = (user) => {
    if (config.stub) {
        console.log("SMS sent successfully", config.stub);
        return;
    }
    const template = "Hi <%= name %>, \nWelcome to Keshav Smruti Higher Secondary School." +
        "\nYour account has been registered. " +
        "\nUse your mobile number and password to access the student portal: https://www.kshs.com/login" +
        "\nThanks";

    var text = ejs.render(template, { name: user.firstName + ' ' + user.lastName });
    send(user.mobile, text).then(response => {
        console.log(response)
    }).catch(error => {
        console.error(error)
    })

};


const sendSms = {
    registrationSucess: registrationSucess
};

module.exports = sendSms;