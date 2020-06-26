const nodemailer = require('nodemailer');
const config = require("../config/mail.config.js");
const ejs = require('ejs');
const fs = require('fs');
var path = require('path');

var transporter = nodemailer.createTransport({
    service: config.service,
    auth: {
        user: config.username,
        pass: config.password
    }
});

successMail = (user) => {
    if (config.stub) {
        console.log("Email sent successfully", config.stub);
        return;
    }
    var filePath = path.join(__dirname, '..', 'config', 'templates', 'email-template.html');
    var imagePath = path.join(__dirname, '..', 'config', 'templates', 'images', 'download.jpeg');
    var template = fs.readFileSync(filePath, { encoding: 'utf-8' });
    var subject = ejs.render('Registration Sucess.');
    var text = ejs.render(template, { banner: imagePath });
    var mailOptions = {
        from: config.hostEmail,
        to: user.email,
        subject: subject,
        html: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


const sendEmail = {
    successMail: successMail
};

module.exports = sendEmail;
