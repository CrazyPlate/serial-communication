const serialWrite = require("../../middleware/serialWrite");

module.exports = {
    rgbWrite: async (args, req) => {

        const sendFrame = await serialWrite.serialWrite(
            process.env.START_CHAR,
            process.env.ARDUINO_ID,
            'W',
            '20',
            args.rgbColor,
            process.env.END_CHAR
        );

        const red = sendFrame.data.substring(0, 3);
        const green = sendFrame.data.substring(3, 6);
        const blue = sendFrame.data.substring(6, 9);

        return {
            r: red,
            g: green,
            b: blue
        }
    }
};


//  :0W20ffffff CR&