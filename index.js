const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const sensor = require('ds18b20-raspi');
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolver = require("./graphql/resolvers/index");

const Temperature = require("./graphql/models/Temperature")
const Modbus = require("./graphql/models/Modbus")

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

saveTemp = () => {
    const tempC = sensor.readSimpleC(2);
    const list = sensor.list();

    const temperature = new Temperature({
        temperature: tempC,
        ds18b20Id: list[0],
        date: new Date().toISOString()
    });

    temperature.save();

    setTimeout(saveTemp, 600000);
};

const saveModbus = async (req, res) => {
    try {
        await client.connectRTUBuffered(process.env.MODBUS_PATH, { baudRate: 19200 });

        await client.setID(Number(req.params.address));

        let val = await client.readHoldingRegisters(Number(req.params.register), 1);

        const modbus = new Modbus({
            register: String(req.params.register),
            data: String(val.data[0]),
            date: new Date().toISOString()
        })

        res.send({
            register: modbus.register,
            data: modbus.data,
            status: 'OK'
        });

        await modbus.save();
    } catch (err) {
        res.send({
            status: 'error'
        });
        console.log(err);
    }

    await client.close();
};

app.get("/modbus/adr:address/reg:register", saveModbus);
app.get("/temp", saveTemp);

app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolver,
        graphiql: true,
    })
);

mongoose
    .connect(
        `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster-api-shard-00-00-fuszk.mongodb.net:27017,cluster-api-shard-00-01-fuszk.mongodb.net:27017,cluster-api-shard-00-02-fuszk.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=cluster-api-shard-0&authSource=admin&retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        app.listen(process.env.PORT || 8000);
        console.info(
            `Running a GraphQL API server at http://${process.env.RASPBERRY_IP}:${process.env.PORT}/graphql`
            //`Running a GraphQL API server at http://localhost:${process.env.PORT}/graphql`
        );
    })
    .catch(err => {
        console.error(err);
    });
