const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyUSB0');

exports.serialWrite = (startChar, arduinoIndexSend, orderSend, pinNumberSend, dataSend, endChar) => {
    let tmpCrc = 0;
    let frame;

    startChar = startChar.toString();
    arduinoIndexSend = arduinoIndexSend.toString();
    orderSend = orderSend.toString().toUpperCase();
    pinNumberSend = pinNumberSend.toString().toUpperCase();
    if (pinNumberSend.length == 1) {
        pinNumberSend = '0' + pinNumberSend;
    }
    dataSend = dataSend.toString().toUpperCase();
    if (dataSend.length < 2) {
        console.error("incorrect data");
    }
    endChar = endChar.toString();

    frame = startChar + arduinoIndexSend + orderSend;

    for (let i = 0; i < pinNumberSend.length; i++) {
        frame += pinNumberSend.substring(i, i + 1);
    }

    if (orderSend == 'W') {
        for (let i = 0; i < dataSend.length; i++) {
            frame += dataSend.substring(i, i + 1);
        }
    }

    for (let i = 0; i < frame.length; i++) {
        tmpCrc += frame.charCodeAt(i);
        //console.log('Crc[' + i + '] = ' + tmpCrc);
    }
    tmpCrc %= 256;
    tmpCrc = tmpCrc.toString(16).toUpperCase();

    frame += tmpCrc + endChar;

    port.write(frame);

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
        pin: pinNumberSend,
        data: dataSend
    }
}

//  :0W03155&,   :0R031F&
//  : - start char
//  0 - index of arduino
//  W - write, R - read, N - error
//  03 - number of pin in Arduino (02-13 & A0-A5)
//  1 - data, if READ A1023 or D1
//  55 - CRC
//  & - end char