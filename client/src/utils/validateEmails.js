//regex from emailregex.com to validate email
const emailRegEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emailList => {
  const invalidEmails = emailList
    .split(",")
    .map(email => email.trim())
    .filter(email => emailRegEx.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
