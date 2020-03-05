const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyUSB0');

exports.serialRead = (startChar, arduinoIndexSend, orderSend, pinNumberSend, endChar) => {
    port.on('data', function (data) {
        console.log("ABC", data);
    })
    /* port.on("open", function () {
        let receivedFrame = "";
        const receivedErrors = {
            "code11": 0,
            "code22": 0,
            "code33": 0,
            "codeUndefinied": 0
        };
        console.log(1)

        port.on('data', function (data) {
            receivedFrame += data.toString();
            if (receivedFrame.indexOf(':') >= 0 && receivedFrame.indexOf('&') >= 0) {
                const receivedFrameLength = receivedFrame.length;
                const receivedOrder = receivedFrame.substring(2, 3);
                const receivedCrc = receivedFrame.substring(receivedFrameLength - 3, receivedFrameLength - 1);
                let tmpCrc = 0;

                console.log(receivedFrame)

                if (receivedOrder == 'N') {
                    const receivedCode = receivedFrame.substring(3, 5);

                    if (receivedCode == '11') {
                        console.log("incorrect CRC - send frame again");
                        receivedErrors.code11++;
                    } else if (receivedCode == '22') {
                        console.log("order error - send frame again");
                        receivedErrors.code22++;
                    } else if (receivedCode == '33') {
                        console.log("pin error - send frame again");
                        receivedErrors.code33++;
                    } else {
                        console.log("undefinied error - send frame again");
                        receivedErrors.codeUndefinied++;
                    }
                } else if (receivedOrder == 'R' || receivedOrder == 'W') {
                    for (let i = 0; i < receivedFrameLength - 3; i++) {
                        tmpCrc += receivedFrame.charCodeAt(i);
                    }
                    tmpCrc %= 256;
                    tmpCrc = tmpCrc.toString(16).toUpperCase();

                    crc = tmpCrc;
                    frame = receivedFrame;

                    if (receivedCrc != tmpCrc) {
                        console.error("Receiverd crc incorrect!!!");
                    }
                    if (receivedOrder == 'R') {
                        received.pin = receivedFrame.substring(3, 5);
                        received.data = receivedFrame.substring(5, receivedFrameLength - 3);

                    }
                }
                receivedFrame = "";
            }
        })
    }) */
    return {
        pin: "pin",
        data: "data"
    }
}