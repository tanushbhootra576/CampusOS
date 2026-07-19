/* eslint-disable @typescript-eslint/no-require-imports */
const nodemailer = require("nodemailer");

async function generateTestAccount() {
  try {
    const account = await nodemailer.createTestAccount();
    console.log("ETHEREAL_USER=" + account.user);
    console.log("ETHEREAL_PASS=" + account.pass);
    console.log("ETHEREAL_HOST=" + account.smtp.host);
    console.log("ETHEREAL_PORT=" + account.smtp.port);
  } catch (error) {
    console.error("Error generating test account:", error);
  }
}

generateTestAccount();
