//  :0W03155&,   :0R031F&
//  : - start char
//  0 - index of arduino
//  W - write, R - read, N - error
//  03 - number of pin in Arduino (02-13 & A0-A5)
//  1 - data, if READ A1023 or D1
//  55 - CRC
//  & - end char

const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyUSB1');

const startChar = ':';
const endChar = '&';
const arduinoIndexSend = '0';
let orderSend = 'w';
let pinNumberSend = '3';
let dataSend = 'd1';
let frameSend;

const receivedErrors = {
    "code11": 0,
    "code22": 0,
    "code33": 0,
    "codeUndefinied": 0
};

export function sendDataToArduino() {
    frameSend = frameGenerator(startChar, arduinoIndexSend, orderSend, pinNumberSend, dataSend, endChar);
    port.write(frameSend.frame);
}

port.on("open", function () {
    let receivedFrame = "";

    port.on('data', function (data) {
        receivedFrame += data.toString();
        if (receivedFrame.indexOf(':') >= 0 && receivedFrame.indexOf('&') >= 0) {
            const receivedFrameLength = receivedFrame.length;
            const receivedOrder = receivedFrame.substring(2, 3);
            const receivedCrc = receivedFrame.substring(receivedFrameLength - 3, receivedFrameLength - 1);
            let tmpCrc = 0;

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

                if (receivedCrc != tmpCrc) {
                    console.error("Receiverd crc incorrect!!!");
                }
            }
            receivedFrame = "";
        }
    })
})

port.on('error', function (err) {
    console.error('Serial error: ', err.message);
})

const frameGenerator = (start, index, order, pin, data, end) => {
    let tmpCrc = 0;
    let frame;

    start = start.toString();
    index = index.toString();
    order = order.toString().toUpperCase();
    pin = pin.toString().toUpperCase();
    if (pin.length == 1) {
        pin = '0' + pin;
    }
    data = data.toString().toUpperCase();
    if (data.length < 2) {
        console.error("incorrect data");
    }
    end = end.toString();

    frame = start + index + order;

    for (let i = 0; i < pin.length; i++) {
        frame += pin.substring(i, i + 1);
    }

    if (order == 'W') {
        for (let i = 0; i < data.length; i++) {
            frame += data.substring(i, i + 1);
        }
    }

    for (let i = 0; i < frame.length; i++) {
        tmpCrc += frame.charCodeAt(i);
        //console.log('Crc[' + i + '] = ' + tmpCrc);
    }
    tmpCrc %= 256;
    tmpCrc = tmpCrc.toString(16).toUpperCase();

    frame += tmpCrc + end;

    return {
        frame: frame
    }
}

