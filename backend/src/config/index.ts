import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'developement';

const stage = process.env.STAGE || 'local';
let envConfig;

if (stage === 'production') {
  envConfig = require('./stages/prod').default;
} else if (stage === 'testing') {
  envConfig = require('./stages/testing').default;
} else {
  envConfig = require('./stages/local').default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secret: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
