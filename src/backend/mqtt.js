const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use the email service of your choice
  auth: {
    user: "mangogarden1402@gmail.com", // Your email address
    pass: "rxoluyzgjgnhbwju", // Your email password
  },
});

const mailOptionsWater = {
  from: "mangogarden1402@gmail.com", // Sender email address
  to: "danggiathinhgocong@gmail.com", // Recipient email address
  subject: "Cảnh báo sử dụng điện nước", // Subject of the email
  text: "Chỉ số nước đang vượt quá mức cho phép!", // Plain text body of the email
};

const mailOptionsElectric = {
  from: "mangogarden1402@gmail.com", // Sender email address
  to: "danggiathinhgocong@gmail.com", // Recipient email address
  subject: "Cảnh báo sử dụng điện nước", // Subject of the email
  text: "Chỉ số điện đang vượt quá mức cho phép!", // Plain text body of the email
};

const mailWarning = (message) => {
  if (parseFloat(message.toString().split(",")[0]?.split(":")[1]) > 100) {
    transporter.sendMail(mailOptionsWater, (error, info) => {
      if (error) {
        console.error("Could not send email", error);
      } else {
        console.log("Email sent successfully", info);
        // Remove the event listener after sending the email
        // client.removeListener('message', messageListener);
      }
    });
  }
  if (parseFloat(message.toString().split(",")[1]?.split(":")[1]) > 3) {
    transporter.sendMail(mailOptionsElectric, (error, info) => {
      if (error) {
        console.error("Could not send email", error);
      } else {
        console.log("Email sent successfully", info);
        // Remove the event listener after sending the email
        // client.removeListener('message', messageListener);
      }
    });
  }
};

module.exports = { mailWarning }
