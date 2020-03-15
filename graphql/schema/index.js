const buildSchema = require("graphql").buildSchema;

module.exports = buildSchema(`
type LedData {
    pin: String!
    data: String!
}

type RgbColor {
    r: String!
    g: String!
    b: String!
}

type Temperature {
    temperature: String!,
    ds18b20Id: String!,
    date: String!
}

input TemperatureInput {
    temperature: String!,
    ds18b20Id: [String!]!,
    date: String!
}

type RootQuery {
    ledRead(order: String!, pin: String!): LedData!
    currentTemperature: Temperature!
    trendTemps: [Temperature!]!
}

type RootMutation {
    ledWrite(order: String!, pin: String!, data: String): LedData!
    rgbWrite(RgbColor: String!): RgbColor!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
