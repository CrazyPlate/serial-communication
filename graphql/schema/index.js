const buildSchema = require("graphql").buildSchema;

module.exports = buildSchema(`
type ledData {
    pin: String!
    data: String!
}

type temperature {
    temperature: String!,
    ds18b20Id: [String!]!
}

type RootQuery {
    led(order: String!, pin: String!, data: String): ledData!
    temperature: temperature!
}

type RootMutation {
    led(order: String!, pin: String!, data: String): ledData!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
