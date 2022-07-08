const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');
const handlebars = require('handlebars');
const config = require('../config/config');
const logger = require('../config/logger');

// eslint-disable-next-line security/detect-non-literal-fs-filename
const readFile = promisify(fs.readFile);

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, htmlFile) => {
  const msg = { from: config.email.from, to, subject, text, html: htmlFile };
  await transport.sendMail(msg);
};

const sendNewTokenSaleEmail = async (to, name) => {
  const subject = 'Successful market sale creation';
  const text = `Dear user,
  You have successfuly created this sale: "${name}"
  CONGRATS!`;
  await sendEmail(to, subject, text);
};

const sendNewCloseTokenSaleEmail = async (to, name) => {
  const subject = 'Successfuly closed market sale';
  const text = `Dear user,
  You have successfuly closed this sale: "${name}"
  CONGRATS!`;
  const html = await readFile('./mailsTemplate/newSale/newSale.html', 'utf8');
  const template = handlebars.compile(html);
  const replacements = {
    sale: name,
  };
  const htmlToSend = template(replacements);
  await sendEmail(to, subject, text, htmlToSend);
};

const sendNewUserProfileEmail = async (to, name) => {
  const subject = 'Successfuly created your profile';
  const text = `Dear user,
  You have successfuly created this usser: "${name}"
  CONGRATS!`;

  const html = await readFile('./mailsTemplate/newUser/newUser.html', 'utf8');
  const template = handlebars.compile(html);
  const replacements = {
    username: name,
  };
  const htmlToSend = template(replacements);
  await sendEmail(to, subject, text, htmlToSend);
};

// `Dear user,
//   You have successfuly created this usser: "${name}"
//   CONGRATS!
//   <h1>hello ${name}</h1>`

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */

//
// const sendVerificationEmail = async (to, token) => {
//   const subject = 'Email Verification';
//   // replace this url with the link to the email verification page of your front-end app
//   const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
//   const text = `Dear user,
// To verify your email, click on this link: ${verificationEmailUrl}
// If you did not create an account, then ignore this email.`;
//   await sendEmail(to, subject, text);
// };
//
// Testing email service
const sendVerificationEmail = async (to) => {
  const subject = 'Email Verification';
  const text = `Dear user,
  To verify your email, click on this link: NO LINK
  If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendNewTokenSaleEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendNewCloseTokenSaleEmail,
  sendNewUserProfileEmail,
};
