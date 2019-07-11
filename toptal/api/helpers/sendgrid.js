const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.sendSimpleEmail = async (emailTo, subject, message) => {
  const msg = {
    to: [emailTo],
    from: {
      name: 'Yelpy',
      email: process.env.SENDGRID_EMAIL,
    },
    subject,
    html: message,
  };

  await sgMail.send(msg);
};
