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

type Energy {
    energy: String!,
    power: String!,
    date: String!,
}

type Humidity {
    humidity: String!
    date: String!
}

type Modbus {
    register: Int!
    data: String
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
    currentHumidity: Humidity!
    trendTemps: [Temperature!]!
    trendEnergy: [Energy!]!
    modbus: Modbus!
}

type RootMutation {
    ledWrite(order: String!, pin: String!, data: String): LedData!
    rgbWrite(RGB: String!): RgbColor!
    saveEnergy(energy: String!, power: String!, date: String!): Energy!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
