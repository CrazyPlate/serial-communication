const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

module.exports = {
    modbus: async (args, req) => {
        const adress = args.adress;
        const order = args.order;
        const register = args.register;
        const value = args.data;

        const odebraneDane = {
            dane: null
        }

        try {
            client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 19200 }, myFunction);

            function myFunction() {
                client.setID(adress);
                console.log(0)
                if (order === 6) {
                    client.writeRegister(register, value)
                        .then(read)

                    console.log(1)
                } else if (order === 3) {
                    read();
                }

                async function read() {
                    await client.readHoldingRegisters(register, 1)
                        .then(data => {
                            odebraneDane.dane = data.data[0]
                        })
                        .finally(() => {
                            console.log(7)
                            return {
                                register: register,
                                data: odebraneDane.dane
                            }
                        })
                    console.log(3)
                    console.log(odebraneDane)
                    await client.close();
                }
            }
            console.log(4)

        } catch (err) {
            console.log(err);
        }
        console.log(5)

    }
};
