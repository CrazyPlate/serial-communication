const serialWrite = require("../../middleware/serialWrite");
const serialRead = require("../../middleware/serialRead");

module.exports = {
   ledWrite: async (args, req) => {

      const sendFrame = await serialWrite.serialWrite(
         process.env.START_CHAR,
         process.env.ARDUINO_ID,
         args.order,
         args.pin,
         args.data,
         process.env.END_CHAR
      );

      return {
         pin: sendFrame.pin,
         data: sendFrame.data
      }
   },
   ledRead: async (args, req) => {
      const sendFrame = await serialRead.serialRead(
         process.env.START_CHAR,
         process.env.ARDUINO_ID,
         args.order,
         args.pin,
         process.env.END_CHAR
      );

      return {
         pin: sendFrame.pin,
         data: sendFrame.data
      }
   }
};
