const serial = require("../../middleware/serialWrite");

module.exports = {
   led: async (args, req) => {

      //console.log(args.ledState.state)
      const sendFrame = await serial.serialWrite(
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
};
