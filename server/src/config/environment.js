const { config } = require('dotenv');

config();

const environment = {
  databaseUrl: process.env.DATABASE_URL,
  apolloKey: process.env.APOLLO_KEY,
  apolloGraphId: process.env.APOLLO_GRAPH_ID,
  apolloGraphVariant: process.env.APOLLO_GRAPH_VARIANT,
  apolloSchemaReporting: process.env.APOLLO_SCHEMA_REPORTING,
};

module.exports = environment;
