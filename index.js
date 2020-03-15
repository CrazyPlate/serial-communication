const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const sensor = require('ds18b20-raspi');

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolver = require("./graphql/resolvers/index");

const Temperature = require("./graphql/models/Temperature")

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
}

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
