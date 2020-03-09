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
    console.log(frame);
    port.write(frame);

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