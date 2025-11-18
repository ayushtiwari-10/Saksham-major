const sendEmail = async (to, subject, text) => {
  // Placeholder for email service integration (e.g., Nodemailer)
  console.log(`Email sent to ${to}: ${subject} - ${text}`);
  return { success: true };
};

module.exports = {
  sendEmail,
};
