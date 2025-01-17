// utilities/validationMessages.js
// const createValidationMessage = (messageKey, field) => {
//     return (req) => {
//         console.log('In createValidationMessage');
//         // if (!req.__) {
//         //     throw new Error('i18n middleware is not initialized.');
//         // }
//         console.log('Message Key:', messageKey);
//         console.log('Field:', field);
//         const message = req.__(`validation.${messageKey}`);
//         return message.replace('{field}', field);
//     };
// };

const getValidationMessage = (req, messageKey, field) => {
  const message = req.__(`validation.${messageKey}`);
  return message.replace('{field}', field);
};

module.exports = getValidationMessage;
