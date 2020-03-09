const buildSchema = require("graphql").buildSchema;

module.exports = buildSchema(`
type ledData {
    pin: String!
    data: String!
}

type rgbColor {
    r: String!
    g: String!
    b: String!
}

type temperature {
    temperature: String!,
    ds18b20Id: [String!]!
}

type RootQuery {
    ledRead(order: String!, pin: String!): ledData!
    temperature: temperature!
}

type RootMutation {
    ledWrite(order: String!, pin: String!, data: String): ledData!
    rgbWrite(rgbColor: String!): rgbColor!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
